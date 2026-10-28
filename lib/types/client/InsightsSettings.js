import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// @ts-ignore TS7016: no declarations for the local .mjs module
import { scanSessions } from '../insights/presentation.mjs';
// @ts-ignore TS7016: no declarations for the local .mjs module
import { estimateDisclaimer, formatEstimate, formatEstimateNote } from '../insights/pricing.mjs';
// @ts-ignore TS7016: no declarations for the local .mjs module
import { costCopy } from '../insights/i18n.mjs';
import { Button, SegmentedControl } from '@deepseek-ai/dsh-client-ui-primitives';
import css from './Insights.module.css';
import tokensCss from './ui/tokens.module.css';
import { SegmentedToggle } from "./ui/SegmentedToggle.js";
import { analyticsOf } from "./insights-analytics.js";
import { fmtCompact, usePricingTable, useUiLocale } from "./insights-shared.js";
import { RoastCards } from "./insights-sections/RoastCards.js";
import { DrilldownPanel } from "./insights-sections/DrilldownPanel.js";
import { UsageCharts } from "./insights-sections/UsageCharts.js";
import { ActivityHeatmap } from "./insights-sections/ActivityHeatmap.js";
import { SessionLedger } from "./insights-sections/SessionLedger.js";
import { SettingsPrefs } from "./insights-sections/SettingsPrefs.js";
/** Settings-page surface: usage scan, headline metrics and the section stack. */
export function InsightsSettings(props) {
    const locale = useUiLocale();
    const pricing = usePricingTable();
    const copy = costCopy(locale);
    const userPickedRange = useRef(false);
    const [tab, setTab] = useState('overview');
    const [range, setRange] = useState('7');
    const [customViewMode, setCustomViewMode] = useState(null);
    const [sessionSort, setSessionSort] = useState('tokens');
    const [loading, setLoading] = useState(false);
    const [sessions, setSessions] = useState(null);
    const [scanError, setScanError] = useState(null);
    const [activeDrilldown, setActiveDrilldown] = useState(null);
    const drilldownRef = useRef(null);
    const restoreFocusRef = useRef(null);
    const mountedRef = useRef(true);
    /** A scan reads every session row: leaving the tab must not keep it running. */
    const scanAbort = useRef(null);
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
            scanAbort.current?.abort();
            scanAbort.current = null;
        };
    }, []);
    useEffect(() => {
        if (!props.remote)
            return;
        let active = true;
        scanAbort.current?.abort();
        const controller = new AbortController();
        scanAbort.current = controller;
        setLoading(true);
        setScanError(null);
        scanSessions(props.remote, { limit: 500, signal: controller.signal })
            .then((res) => {
            if (active) {
                setSessions(res);
                // 智能感知：如果历史跨度确实超过 7 天，自动提档到 30 天；否则保持清爽的 7 天
                if (!userPickedRange.current) {
                    const times = (res?.rows ?? [])
                        .map((r) => r.updatedAt)
                        .filter((t) => typeof t === 'number' && t > 0);
                    if (times.length >= 2) {
                        const span = Math.max(...times) - Math.min(...times);
                        if (span > 7 * 86400000) {
                            setRange('30');
                        }
                    }
                }
            }
        })
            .catch((error) => {
            if (active)
                setScanError(error instanceof Error ? error.message : String(error));
        })
            .finally(() => { if (active)
            setLoading(false); });
        return () => { active = false; controller.abort(); };
    }, [props.remote]);
    const refresh = () => {
        if (!props.remote || loading)
            return;
        scanAbort.current?.abort();
        const controller = new AbortController();
        scanAbort.current = controller;
        setLoading(true);
        setScanError(null);
        scanSessions(props.remote, { limit: 500, signal: controller.signal })
            .then((res) => { if (mountedRef.current)
            setSessions(res); })
            .catch((error) => {
            if (mountedRef.current)
                setScanError(error instanceof Error ? error.message : String(error));
        })
            .finally(() => { if (mountedRef.current)
            setLoading(false); });
    };
    const analytics = useMemo(() => analyticsOf(sessions, range, sessionSort, pricing), [sessions, range, sessionSort, pricing]);
    // Drill-downs used to be inserted inline, pushing everything below them down.
    // They now open as a layer over the page and hand focus back on close.
    const closeDrilldown = useCallback(() => {
        setActiveDrilldown(null);
        const target = restoreFocusRef.current;
        restoreFocusRef.current = null;
        if (target !== null && target.isConnected)
            target.focus();
    }, []);
    const openDrilldown = useCallback((next) => {
        if (next === null) {
            closeDrilldown();
            return;
        }
        if (restoreFocusRef.current === null) {
            restoreFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        }
        setActiveDrilldown(next);
    }, [closeDrilldown]);
    useEffect(() => {
        if (activeDrilldown === null)
            return;
        drilldownRef.current?.focus();
        const onKeyDown = (event) => {
            if (event.key !== 'Escape')
                return;
            event.preventDefault();
            closeDrilldown();
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [activeDrilldown, closeDrilldown]);
    // A scan skips sessions for concrete reasons (no cached projection yet, or a
    // subagent whose inherited prefix would double-count). Those reasons already
    // travel with the rows; folding them into one line explains the gap between
    // "scanned" and "counted" instead of leaving it a mystery.
    const skipped = useMemo(() => {
        const reasons = new Map();
        for (const row of (sessions?.rows ?? [])) {
            if (row.value)
                continue;
            const reason = typeof row.error === 'string' && row.error ? row.error : '未知原因';
            reasons.set(reason, (reasons.get(reason) ?? 0) + 1);
        }
        return [...reasons.entries()].sort((a, b) => b[1] - a[1]);
    }, [sessions]);
    const activeViewMode = customViewMode ?? (range === '30' || range === '180' ? 'line' : 'bar');
    const cacheNote = !analytics
        ? ''
        : analytics.cacheHitPct >= 70 ? '命中较高'
            : analytics.cacheHitPct >= 40 ? '一般'
                : '命中偏低';
    const heroCostText = analytics ? formatEstimate(analytics.estimatedCost, locale) : '-';
    const heroCostNote = analytics ? formatEstimateNote(analytics.estimatedCost, locale) : '';
    const heroCostTitle = [estimateDisclaimer(locale), heroCostNote].filter(Boolean).join(' · ');
    return (_jsxs("div", { className: `${tokensCss.tokens} ${tokensCss.series} ${css.settingsContainer}`, "data-wi-ui": "v2", children: [_jsxs("div", { className: css.cockpitHeader, children: [_jsxs("div", { className: css.cockpitTitleArea, children: [_jsx("h2", { className: css.cockpitMainTitle, children: "\u7528\u91CF\u7EDF\u8BA1\u4E0E\u6A21\u578B\u6D1E\u5BDF" }), _jsx("p", { className: css.cockpitSubTitle, children: "\u53EA\u8BFB\u6C47\u603B\u672C\u5730\u5DF2\u7F13\u5B58\u7684\u5BF9\u8BDD\u3002\u6309\u6D3B\u52A8\u65E5\u671F\u5F52\u7EC4\uFF0C\u65E0\u989D\u5916\u540E\u53F0\u5F00\u9500\u3002" })] }), _jsxs("div", { className: css.headerRightControls, children: [tab === 'prefs' ? null : (_jsx(SegmentedToggle, { label: "\u7EDF\u8BA1\u65F6\u95F4\u8303\u56F4", value: range, onChange: next => { userPickedRange.current = true; setRange(next); setCustomViewMode(null); }, options: [
                                    { value: '7', label: '近 7 天' },
                                    { value: '30', label: '近 30 天' },
                                    { value: '180', label: '近 6 个月' },
                                ] })), _jsx(Button, { variant: "outline", size: "sm", onClick: refresh, disabled: loading || !props.remote, title: !props.remote ? '会话服务不可用，暂时无法刷新' : '重新扫描本地会话统计', children: loading ? '正在刷新' : '刷新' })] })] }), _jsxs("div", { className: css.settingsTabsRow, children: [_jsx(SegmentedControl, { id: "watcher-settings", label: "\u8BBE\u7F6E\u5206\u533A", value: tab, onChange: setTab, options: [
                            { value: 'overview', label: '概览' },
                            { value: 'trends', label: '趋势' },
                            { value: 'sessions', label: '会话' },
                            { value: 'prefs', label: '偏好' },
                        ] }), _jsxs("p", { className: css.heroScanNote, children: ["\u6709\u7EDF\u8BA1\u7684\u5BF9\u8BDD ", _jsx("strong", { children: analytics ? `${analytics.validCount} / ${analytics.scannedCount}` : '-' }), analytics && analytics.scannedCount < analytics.listed
                                ? `（会话较多，仅统计最近 ${analytics.scannedCount} / 共 ${analytics.listed} 个）`
                                : ''] })] }), scanError
                ? (_jsxs("p", { className: css.scanError, role: "alert", children: ["\u4F1A\u8BDD\u7EDF\u8BA1\u8BFB\u53D6\u5931\u8D25\uFF1A", scanError] }))
                : null, _jsx("div", { id: "watcher-settings-overview-panel", role: "tabpanel", "aria-labelledby": "watcher-settings-overview", className: css.settingsPanel, hidden: tab !== 'overview', children: tab === 'overview'
                    ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: css.heroStatsRow, children: [_jsxs("div", { className: css.heroMetric, children: [_jsx("span", { className: css.heroCaption, children: "Token \u603B\u6D88\u8017" }), _jsx("strong", { className: css.heroValue, children: analytics ? fmtCompact(analytics.totalTokens) : '-' })] }), _jsxs("div", { className: css.heroMetric, title: heroCostTitle, "aria-label": `${copy.estimatedCost}: ${heroCostText}`, children: [_jsx("span", { className: css.heroCaption, children: copy.estimatedCost }), _jsx("strong", { className: css.heroValue, children: heroCostText }), heroCostNote ? _jsx("span", { className: css.heroFootnote, children: heroCostNote }) : null] }), _jsxs("div", { className: css.heroMetric, children: [_jsx("span", { className: css.heroCaption, children: "\u7D2F\u8BA1\u8017\u65F6" }), _jsx("strong", { className: css.heroValue, children: analytics ? `${analytics.totalTimeHours} 小时` : '-' })] }), _jsxs("div", { className: css.heroMetric, children: [_jsx("span", { className: css.heroCaption, children: "\u7F13\u5B58\u547D\u4E2D" }), _jsx("strong", { className: css.heroValue, children: analytics ? `${analytics.cacheHitPct}%` : '-' }), _jsx("span", { className: css.heroFootnote, children: analytics ? `${cacheNote} · 复用 ${fmtCompact(analytics.totalCacheRead)} Token` : '' })] })] }), skipped.length > 0
                                ? (_jsxs("p", { className: css.heroScanNote, children: ["\u672A\u7EB3\u5165\u7EDF\u8BA1 ", skipped.reduce((sum, [, count]) => sum + count, 0), " \u4E2A\uFF1A", skipped.map(([reason, count], index) => (_jsxs("span", { children: [index > 0 ? ' · ' : '', _jsxs("span", { title: reason, children: [reason.replace(/[；;].*$/, ''), "\uFF08", count, "\uFF09"] })] }, reason)))] }))
                                : null, _jsx(RoastCards, { analytics: analytics, activeDrilldown: activeDrilldown, setActiveDrilldown: openDrilldown })] }))
                    : null }), _jsx("div", { id: "watcher-settings-trends-panel", role: "tabpanel", "aria-labelledby": "watcher-settings-trends", className: css.settingsPanel, hidden: tab !== 'trends', children: tab === 'trends'
                    ? (_jsxs(_Fragment, { children: [_jsx(UsageCharts, { analytics: analytics, range: range, viewMode: activeViewMode, setCustomViewMode: next => setCustomViewMode(next) }), analytics ? _jsx(ActivityHeatmap, { analytics: analytics }) : null] }))
                    : null }), _jsx("div", { id: "watcher-settings-sessions-panel", role: "tabpanel", "aria-labelledby": "watcher-settings-sessions", className: css.settingsPanel, hidden: tab !== 'sessions', children: tab === 'sessions'
                    ? (_jsx(SessionLedger, { analytics: analytics, sessions: sessions, sessionSort: sessionSort, setSessionSort: next => setSessionSort(next) }))
                    : null }), _jsx("div", { id: "watcher-settings-prefs-panel", role: "tabpanel", "aria-labelledby": "watcher-settings-prefs", className: css.settingsPanel, hidden: tab !== 'prefs', children: tab === 'prefs' ? _jsx(SettingsPrefs, { copy: copy }) : null }), activeDrilldown && analytics
                ? (_jsxs("div", { className: css.drilldownOverlay, children: [_jsx("button", { type: "button", className: css.drilldownBackdrop, "aria-label": "\u5173\u95ED\u4E0B\u94BB\u8BE6\u60C5", tabIndex: -1, onClick: closeDrilldown }), _jsx("div", { ref: drilldownRef, className: css.drilldownDialog, role: "dialog", "aria-modal": "true", "aria-label": "\u6307\u6807\u4E0B\u94BB\u8BE6\u60C5", tabIndex: -1, children: _jsx(DrilldownPanel, { analytics: analytics, activeDrilldown: activeDrilldown, setActiveDrilldown: openDrilldown }) })] }))
                : null] }));
}
//# sourceMappingURL=InsightsSettings.js.map
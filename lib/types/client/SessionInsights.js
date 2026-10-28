import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
// @ts-ignore TS7016: no declarations for the local .mjs module
import { alertsOf } from '../insights/presentation.mjs';
// @ts-ignore TS7016: no declarations for the local .mjs module
import { estimateFromInsights, formatEstimate, formatEstimateNote } from '../insights/pricing.mjs';
// @ts-ignore TS7016: no declarations for the local .mjs module
import { costCopy } from '../insights/i18n.mjs';
import css from './Insights.module.css';
import tokensCss from './ui/tokens.module.css';
import { TimingPanel } from "./TimingPanel.js";
import { SegmentedToggle } from "./ui/SegmentedToggle.js";
import { effortLabel, fmt, modelKeyOf, routeLabel, useLimits, usePricingTable, useUiLocale, } from "./insights-shared.js";
export function SessionInsights({ value, now, running, waiting, onEvidence, tokensPerSecond, flat = false, onClose }) {
    const limits = useLimits();
    const pricing = usePricingTable();
    const locale = useUiLocale();
    const copy = costCopy(locale);
    const [scope, setScope] = useState('turn');
    const [modelFilter, setModelFilter] = useState('all');
    const [storedCollapsed, setCollapsed] = useState(() => {
        try {
            return globalThis.localStorage?.getItem('dsh-watcher:hud-collapsed') === '1';
        }
        catch {
            return false;
        }
    });
    // A popover is always expanded: the collapsed state belongs to the inline
    // readout, and a stale stored value must not collapse an overlay.
    const collapsed = flat ? false : storedCollapsed;
    const toggleCollapsed = () => {
        const next = !collapsed;
        try {
            globalThis.localStorage?.setItem('dsh-watcher:hud-collapsed', next ? '1' : '0');
        }
        catch { }
        setCollapsed(next);
    };
    // Hooks stay above the early return so hook order never depends on load state.
    const selectedModel = scope === 'session' && modelFilter !== 'all' && value
        ? value.models.find(m => modelKeyOf(m) === modelFilter)
        : undefined;
    const stats = value && scope === 'turn' && value.turn
        ? value.turn.stats
        : (selectedModel ?? value?.totals);
    // "本轮" must never label whole-session totals: before the first turn the
    // fallback below is session-wide, and the heading has to say so.
    const turnMissing = scope === 'turn' && !value?.turn;
    const alerts = useMemo(() => alertsOf(value ?? null, now, { running, waiting, limits }), [value, now, running, waiting, limits]);
    const currentRoute = value?.turn?.route ?? (value?.models && value.models.length > 0 ? value.models[0] : undefined);
    const estimate = useMemo(() => (value && stats ? estimateFromInsights(value, stats, scope, selectedModel, currentRoute, pricing) : null), [value, stats, scope, selectedModel, currentRoute, pricing]);
    if (!value || !stats || !estimate)
        return null;
    const isMultiModel = (value.models?.length ?? 0) > 1;
    const totalIn = (stats.input ?? 0) + (stats.cacheRead ?? 0);
    const cachePct = totalIn > 0 ? Math.round(((stats.cacheRead ?? 0) / totalIn) * 100) : 0;
    const costText = formatEstimate(estimate, locale);
    const costNote = formatEstimateNote(estimate, locale);
    const costTitle = costNote ? `${copy.estimatedCost}: ${costText} · ${costNote}` : `${copy.estimatedCost}: ${costText}`;
    const boxClass = flat ? `${css.hudBox} ${css.hudBoxFlat}` : css.hudBox;
    // The model itself is the value; provider and thinking level are context, so a
    // long route label never truncates the number that matters.
    const routeTitle = currentRoute ? routeLabel(currentRoute) : '';
    const modelName = currentRoute?.model || routeTitle;
    const modelNote = [currentRoute?.provider, currentRoute?.effort ? `思考 ${effortLabel(currentRoute.effort)}` : null]
        .filter(Boolean)
        .join(' · ');
    return (_jsxs("section", { className: `${tokensCss.tokens} ${tokensCss.series} ${boxClass}`, "aria-label": flat ? '用量与耗时' : '耗时分布与运行健康度', "data-collapsed": collapsed ? '' : undefined, "data-flat": flat ? '' : undefined, children: [_jsxs("div", { className: css.hudTop, children: [_jsxs("div", { className: css.hudHeadRow, children: [_jsxs("div", { className: css.hudTopLeft, children: [_jsx("span", { className: css.hudHeading, children: flat
                                            ? '用量与耗时'
                                            : scope === 'turn'
                                                ? (turnMissing ? '全会话' : '本轮')
                                                : selectedModel
                                                    ? `模型: ${routeLabel(selectedModel)}`
                                                    : '全会话' }), turnMissing
                                        ? _jsx("span", { className: css.hudHeadingNote, title: "\u672C\u8F6E\u5C1A\u672A\u5F00\u59CB\uFF0C\u4EE5\u4E0B\u4E3A\u5168\u4F1A\u8BDD\u7D2F\u8BA1\u6570\u636E", children: "\u672C\u8F6E\u672A\u5F00\u59CB \u00B7 \u5DF2\u663E\u793A\u5168\u4F1A\u8BDD" })
                                        : null] }), _jsxs("div", { className: css.hudTopRight, children: [_jsx(SegmentedToggle, { label: "\u7EDF\u8BA1\u8303\u56F4\u5207\u6362", value: scope, onChange: next => {
                                            setScope(next);
                                            if (next === 'turn')
                                                setModelFilter('all');
                                        }, options: [
                                            { value: 'turn', label: '本轮' },
                                            { value: 'session', label: '全会话' },
                                        ] }), flat
                                        ? null
                                        : (_jsx("button", { type: "button", className: css.collapseBtn, "aria-expanded": !collapsed, "aria-label": collapsed ? '展开耗时统计' : '收起耗时统计', title: collapsed ? '展开耗时统计' : '收起耗时统计', onClick: toggleCollapsed, children: _jsx("span", { className: css.collapseChevron, "aria-hidden": "true", children: "\u25BE" }) })), onClose === undefined
                                        ? null
                                        : (_jsx("button", { type: "button", className: css.popoverClose, "aria-label": "\u5173\u95ED\u7528\u91CF\u7EDF\u8BA1", title: "\u5173\u95ED", onClick: onClose, children: _jsx("span", { "aria-hidden": "true", children: "\u00D7" }) }))] })] }), _jsxs("div", { className: css.statGrid, children: [scope === 'turn' && currentRoute?.model ? (_jsxs("div", { className: css.statCell, "data-metric": "model", children: [_jsx("span", { className: css.statLabel, children: "\u6A21\u578B" }), _jsx("span", { className: css.statValue, title: routeTitle, children: modelName }), modelNote ? _jsx("span", { className: css.statNote, children: modelNote }) : null] })) : null, _jsxs("div", { className: css.statCell, "data-metric": "context", children: [_jsx("span", { className: css.statLabel, children: scope === 'turn' ? '上下文' : '累计输入' }), _jsxs("span", { className: css.statValue, children: [fmt(stats.input ?? 0), _jsx("span", { className: css.statUnit, children: " Token" })] })] }), _jsxs("div", { className: css.statCell, "data-metric": "tokens", children: [_jsx("span", { className: css.statLabel, children: "Token" }), _jsx("span", { className: css.statValue, children: fmt(stats.tokens ?? 0) }), _jsxs("span", { className: css.statNote, children: [cachePct, "% \u547D\u4E2D"] })] }), _jsxs("div", { className: css.statCell, "data-metric": "cost", children: [_jsx("span", { className: css.statLabel, children: copy.estimatedCost }), _jsx("span", { className: css.statValue, title: costTitle, "aria-label": `${copy.estimatedCost}: ${costText}`, children: costText })] })] })] }), !collapsed && scope === 'session' && isMultiModel ? (_jsx(SegmentedToggle, { label: "\u591A\u6A21\u578B\u5207\u6362", className: css.modelTabBar, value: modelFilter, onChange: setModelFilter, options: [
                    { value: 'all', label: `全部模型汇总 (${value.models.length})` },
                    ...value.models.map((m) => ({
                        value: modelKeyOf(m),
                        label: `${routeLabel(m)} (${m.calls}次)`,
                        title: routeLabel(m),
                    })),
                ] })) : null, collapsed ? null : (_jsxs("div", { className: css.hudBody, children: [_jsx(TimingPanel, { stats: stats, scope: scope, tokensPerSecond: scope === 'turn' ? tokensPerSecond : undefined, compact: flat }), alerts.length > 0 ? (_jsx("div", { className: css.alertSection, "aria-live": "polite", children: alerts.map((a) => {
                            const isRepeat = a.kind === 'repeated-failure' || a.id.startsWith('repeat');
                            return (_jsxs("div", { className: css.alertRow, "data-danger": isRepeat ? '' : undefined, children: [_jsx("span", { className: css.alertDot, "aria-hidden": "true" }), _jsxs("div", { className: css.alertTexts, children: [_jsx("strong", { className: css.alertMainText, children: a.title }), _jsx("span", { className: css.alertSubText, children: a.detail })] }), _jsx("button", { type: "button", className: css.alertAction, onClick: () => onEvidence(a), children: "\u5B9A\u4F4D\u73B0\u573A" })] }, a.id));
                        }) })) : null] }))] }));
}
//# sourceMappingURL=SessionInsights.js.map
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { IconSearchOutlineRegular, Input } from '@deepseek-ai/dsh-client-ui-primitives';
import css from '../Insights.module.css';
import { SegmentedToggle } from "../ui/SegmentedToggle.js";
import { fmtCompact, routeLabel } from "../insights-shared.js";
const LEDGER_PAGE = 10;
/** Top conversations ranked by the selected dimension, expandable in place. */
export function SessionLedger({ analytics, sessions, sessionSort, setSessionSort }) {
    const [openSessionId, setOpenSessionId] = useState(null);
    const [query, setQuery] = useState('');
    const [limit, setLimit] = useState(LEDGER_PAGE);
    const rows = useMemo(() => {
        const all = (analytics?.sortedSessions ?? []);
        const needle = query.trim().toLowerCase();
        if (needle === '')
            return all;
        return all.filter((row) => {
            const model = String(routeLabel(row.value?.models?.[0]) ?? '');
            return row.sessionId.toLowerCase().includes(needle) || model.toLowerCase().includes(needle);
        });
    }, [analytics, query]);
    const shown = rows.slice(0, limit);
    const maxTokens = Math.max(1, analytics?.maxSessionTokens ?? 1);
    return (_jsx(_Fragment, { children: _jsxs("div", { className: css.vizPanel, children: [_jsxs("div", { className: css.vizHead, children: [_jsxs("div", { className: css.tableTitleGroup, children: [_jsx("span", { className: css.vizTitle, children: "\u91CD\u70B9\u5BF9\u8BDD\u8D26\u5355" }), _jsxs("span", { className: css.vizSub, children: [sessionSort === 'tokens' && '按 Token 消耗由高到低严格排序', sessionSort === 'time' && '按执行总耗时由长到短严格排序', sessionSort === 'errors' && '按报错与重试次数降序排查', rows.length > 0 ? ` · 共 ${rows.length} 个会话` : ''] })] }), _jsxs("div", { className: css.ledgerControls, children: [_jsx(Input, { className: css.ledgerSearch, icon: _jsx(IconSearchOutlineRegular, { size: 14 }), value: query, onChange: event => { setQuery(event.target.value); setLimit(LEDGER_PAGE); }, placeholder: "\u641C\u7D22\u4F1A\u8BDD ID \u6216\u6A21\u578B", "aria-label": "\u641C\u7D22\u4F1A\u8BDD" }), _jsx(SegmentedToggle, { label: "\u5BF9\u8BDD\u8D26\u5355\u6392\u5E8F\u5207\u6362", value: sessionSort, onChange: setSessionSort, options: [
                                        { value: 'tokens', label: 'Token 消耗 ↓' },
                                        { value: 'time', label: '总耗时 ↓' },
                                        { value: 'errors', label: '故障数 ↓' },
                                    ] })] })] }), sessions && sessions.rows.length > 0 ? (rows.length === 0 ? (_jsxs("div", { className: css.emptyScan, children: ["\u6CA1\u6709\u5339\u914D\u300C", query.trim(), "\u300D\u7684\u4F1A\u8BDD\u3002"] })) : (_jsxs("div", { className: css.sessionTableBox, children: [_jsxs("div", { className: css.sessionTableHeader, children: [_jsx("span", { children: "\u6392\u540D \u00B7 \u4F1A\u8BDDID" }), _jsx("span", { children: "\u4E3B\u7528\u6A21\u578B" }), _jsx("span", { className: css.cellEnd, children: "Token \u6D88\u8017" }), _jsx("span", { className: css.cellEnd, children: "\u603B\u8017\u65F6" }), _jsx("span", { className: css.cellCenter, children: "\u8FD0\u884C\u72B6\u6001" }), _jsx("span", {})] }), shown.map((row, idx) => {
                            const val = row.value;
                            const isOpen = openSessionId === row.sessionId;
                            const errCount = val.totals.toolErrors ?? 0;
                            const retryCount = val.totals.retries ?? 0;
                            const modelMs = val.totals.modelMs ?? 0;
                            const toolMs = val.totals.toolMs ?? 0;
                            const totalMs = modelMs + toolMs;
                            const modelPct = totalMs > 0 ? Math.round((modelMs / totalMs) * 100) : 50;
                            const status = errCount > 0
                                ? `${errCount} 次报错`
                                : retryCount > 0 ? `${retryCount} 次重试` : '顺畅';
                            const tokenBarPct = Math.max(4, Math.round(((val.totals.tokens ?? 0) / maxTokens) * 100));
                            return (_jsxs("div", { className: `${css.sessionItemRow} ${isOpen ? css.sessionItemOpen : ''}`, children: [_jsxs("button", { type: "button", className: css.sessionItemHead, "aria-expanded": isOpen, onClick: () => setOpenSessionId(isOpen ? null : row.sessionId), children: [_jsxs("span", { className: css.sessionIdTag, title: row.sessionId, children: [_jsxs("strong", { className: css.tableRankNum, children: ["#", idx + 1] }), " ", row.sessionId.length > 12 ? `${row.sessionId.slice(0, 6)}…${row.sessionId.slice(-3)}` : row.sessionId] }), _jsx("span", { className: css.sessionModelCell, title: routeLabel(val.models?.[0]), children: routeLabel(val.models?.[0]) }), _jsxs("div", { className: css.sessionTokenCell, children: [_jsx("span", { children: fmtCompact(val.totals.tokens) }), _jsx("div", { className: css.sessionTokenBar, style: { width: `${tokenBarPct}%` } })] }), _jsxs("span", { className: css.cellEnd, children: [Math.round(totalMs / 1000), " \u79D2"] }), _jsx("span", { className: `${css.cellCenter} ${errCount > 0 ? css.statusBad : retryCount > 0 ? css.statusWarn : css.statusOk}`, children: status }), _jsx("span", { className: css.arrowIcon, children: "\u203A" })] }), isOpen ? (_jsxs("div", { className: css.sessionItemDrawer, children: [_jsx("div", { className: css.drawerTitle, children: "\u8017\u65F6\u6784\u6210\u4E0B\u94BB\uFF1A\u6A21\u578B\u54CD\u5E94 vs \u672C\u5730\u5DE5\u5177" }), _jsxs("div", { className: css.drawerBarTrack, children: [_jsx("div", { className: css.drawerSliceModel, style: { width: `${modelPct}%` } }), _jsx("div", { className: css.drawerSliceTool, style: { width: `${100 - modelPct}%` } })] }), _jsxs("div", { className: css.drawerMetaRow, children: [_jsxs("span", { children: ["\u6A21\u578B ", Math.round(modelMs / 1000), " \u79D2 (\u9996\u54CD\u5E94\u5747\u503C ", val.totals.firstSamples ? (val.totals.firstMs / val.totals.firstSamples / 1000).toFixed(1) : 0, "s)"] }), _jsxs("span", { children: ["\u5DE5\u5177 ", Math.round(toolMs / 1000), " \u79D2 \u00B7 ", val.totals.tools, " \u6B21\u6267\u884C"] }), _jsxs("span", { children: ["\u7F13\u5B58\u547D\u4E2D\u7387 ", val.totals.input + val.totals.cacheRead > 0 ? Math.round((val.totals.cacheRead / (val.totals.input + val.totals.cacheRead)) * 100) : 0, "%"] })] })] })) : null] }, row.sessionId));
                        }), rows.length > shown.length
                            ? (_jsxs("button", { type: "button", className: css.ledgerMore, onClick: () => setLimit(current => current + LEDGER_PAGE), children: ["\u663E\u793A\u66F4\u591A\u4F1A\u8BDD\uFF08\u8FD8\u6709 ", rows.length - shown.length, " \u4E2A\uFF09"] }))
                            : null] }))) : sessions === null ? (_jsx("div", { className: css.emptyScan, children: "\u6B63\u5728\u8BFB\u53D6\u672C\u5730\u4F1A\u8BDD\u2026" })) : (_jsx("div", { className: css.emptyScan, children: "\u6682\u65E0\u5DF2\u7F13\u5B58\u7684\u5BF9\u8BDD\u7EDF\u8BA1\u3002" }))] }) }));
}
//# sourceMappingURL=SessionLedger.js.map
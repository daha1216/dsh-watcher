import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SegmentedToggle } from "../ui/SegmentedToggle.js";
import css from './panel.module.css';
/**
 * The overflow menu keeps the view switches and the history actions out of the
 * persistent chrome. It is one small surface, opened on demand, so the default
 * panel is only a status bar and a path.
 */
export function ViewMenu({ mode, depth, hasMore, olderLoading, historyKind, historyMessage, following, top, onMode, onDepth, onLoadOlder, onLoadAll, onBackToLatest, }) {
    const historyBusy = historyKind === 'loading' || olderLoading;
    return (_jsx("div", { id: "watcher-view-menu", className: css.popover, "data-watcher-overlay": "menu", style: { top }, role: "dialog", "aria-label": "\u89C6\u56FE\u4E0E\u5386\u53F2", children: _jsxs("div", { className: css.viewMenu, children: [_jsxs("div", { className: css.menuRow, children: [_jsx("span", { className: css.menuRowLabel, children: "\u7EC4\u7EC7" }), _jsx(SegmentedToggle, { label: "\u8DEF\u5F84\u7EC4\u7EC7\u65B9\u5F0F", value: mode, onChange: onMode, options: [
                                { value: 'itemized', label: '逐项', title: '按时间顺序展示每个步骤和每次执行' },
                                { value: 'grouped', label: '归类', title: '按同一目标或完全相同的指令归类，展开仍可查看原始执行' },
                            ] })] }), _jsxs("div", { className: css.menuRow, children: [_jsx("span", { className: css.menuRowLabel, children: "\u5C55\u5F00" }), _jsx(SegmentedToggle, { label: "\u8DEF\u5F84\u5C55\u5F00\u6DF1\u5EA6", value: depth, onChange: onDepth, options: [
                                { value: 'overview', label: '概览', title: '展开当前轮次，展示阶段概览；阶段内部保持收起' },
                                { value: 'detail', label: '详情', title: '展开所有轮次、阶段、步骤、模型与推理记录' },
                            ] })] }), _jsx("div", { className: css.menuDivider, "aria-hidden": "true" }), _jsxs("button", { type: "button", className: css.menuItem, disabled: !hasMore || historyBusy, onClick: onLoadOlder, children: [_jsx("span", { children: olderLoading ? '正在载入更早的记录…' : '载入更早的记录' }), _jsx("span", { className: css.menuItemHint, children: hasMore ? '逐页' : '已到最早' })] }), _jsxs("button", { type: "button", className: css.menuItem, disabled: historyKind === 'loading', onClick: onLoadAll, children: [_jsx("span", { children: historyKind === 'loading' ? '正在补齐历史…' : historyKind === 'error' ? '重试载入全部历史' : '载入全部历史' }), _jsx("span", { className: css.menuItemHint, children: historyKind === 'error' ? '重试' : '→' })] }), _jsxs("button", { type: "button", className: css.menuItem, disabled: following, onClick: onBackToLatest, children: [_jsx("span", { children: "\u8DF3\u5230\u6700\u65B0\u8FDB\u5C55" }), _jsx("span", { className: css.menuItemHint, children: following ? '已跟随' : '↓' })] }), historyMessage === null ? null : _jsx("p", { className: css.menuStatus, role: "status", children: historyMessage })] }) }));
}
//# sourceMappingURL=ViewMenu.js.map
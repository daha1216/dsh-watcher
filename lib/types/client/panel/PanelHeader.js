import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconEllipsisOutlineRegular, IconSearchOutlineRegular } from '@deepseek-ai/dsh-client-ui-primitives';
import css from './panel.module.css';
/**
 * The one persistent row of the panel, and a plain read-out: what the agent is
 * doing right now. Opening the work path is a separate control under the usage
 * readout, so this bar never moves when the path folds or unfolds.
 */
export function PanelHeader({ status, nowLabel, running, alert, searchActive, tool, onToggleSearch, onToggleMenu, }) {
    return (_jsxs("header", { className: css.statusBar, children: [_jsxs("div", { className: css.statusLeft, children: [_jsx("span", { className: css.statusDot, "data-state": running ? 'running' : alert ? 'alert' : 'idle', "aria-hidden": "true" }), _jsx("span", { className: css.statusText, "aria-live": "polite", "data-alert": alert ? '' : undefined, children: status }), running ? _jsx("span", { className: css.statusNow, "aria-hidden": "true", title: nowLabel, children: nowLabel }) : null] }), _jsxs("div", { className: css.iconBar, children: [_jsx("button", { type: "button", className: css.iconButton, "data-active": searchActive ? '' : undefined, "aria-expanded": searchActive, "aria-controls": searchActive ? 'watcher-search-row' : undefined, "data-watcher-tool": "search", "aria-label": searchActive ? '收起路径搜索' : '搜索工作路径', title: searchActive ? '收起搜索' : '搜索工作路径', onClick: onToggleSearch, children: _jsx(IconSearchOutlineRegular, { size: 14 }) }), _jsx("button", { type: "button", className: css.iconButton, "data-active": tool === 'menu' ? '' : undefined, "aria-expanded": tool === 'menu', "aria-controls": tool === 'menu' ? 'watcher-view-menu' : undefined, "data-watcher-tool": "menu", "aria-label": "\u89C6\u56FE\u4E0E\u5386\u53F2", title: "\u89C6\u56FE\u4E0E\u5386\u53F2", onClick: onToggleMenu, children: _jsx(IconEllipsisOutlineRegular, { size: 14 }) })] })] }));
}
//# sourceMappingURL=PanelHeader.js.map
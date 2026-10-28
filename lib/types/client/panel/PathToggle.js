import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconChevronDownOutlineRegular } from '@deepseek-ai/dsh-client-ui-primitives';
import css from './panel.module.css';
/**
 * The one control for the secondary window: a quiet row under the usage
 * readout that unfolds the path. It starts folded, so the card reads as a
 * status board first and a path viewer only on demand.
 */
export function PathToggle({ open, counts, hint, onToggle, }) {
    return (_jsxs("button", { type: "button", className: css.pathToggle, "data-open": open ? '' : undefined, "data-watcher-tool": "timeline", "aria-expanded": open, "aria-controls": "watcher-timeline-body", title: open ? '收起执行路径' : '展开执行路径', onClick: onToggle, children: [_jsx("span", { className: css.pathLabel, children: "\u6267\u884C\u8DEF\u5F84" }), _jsx("span", { className: css.pathCounts, title: hint, children: counts }), _jsx(IconChevronDownOutlineRegular, { size: 13, className: css.pathChevron })] }));
}
//# sourceMappingURL=PathToggle.js.map
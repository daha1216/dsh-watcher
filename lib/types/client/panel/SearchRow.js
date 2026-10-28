import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconSearchOutlineRegular, Input } from '@deepseek-ai/dsh-client-ui-primitives';
import { SegmentedToggle } from "../ui/SegmentedToggle.js";
import { pathFilterActive } from "../path-filter.js";
import css from './panel.module.css';
/**
 * The search and status filter live on their own row, opened from the status
 * bar. The row stays visible while a filter is active so the narrowed path can
 * always be widened again without hunting for a hidden control.
 */
export function SearchRow({ filter, onChange, onClear, }) {
    return (_jsxs("div", { id: "watcher-search-row", className: css.searchRow, "data-watcher-overlay": "search", role: "search", "aria-label": "\u641C\u7D22\u5DE5\u4F5C\u8DEF\u5F84", children: [_jsx(Input, { className: css.searchInput, icon: _jsx(IconSearchOutlineRegular, { size: 14 }), value: filter.query, onChange: event => onChange({ ...filter, query: event.target.value }), placeholder: "\u641C\u7D22\u6807\u9898\u3001\u5DE5\u5177\u6216\u9636\u6BB5", "aria-label": "\u641C\u7D22\u6807\u9898\u3001\u5DE5\u5177\u6216\u9636\u6BB5", autoFocus: true }), _jsx(SegmentedToggle, { label: "\u8DEF\u5F84\u7B5B\u9009", value: filter.status, onChange: (status) => onChange({ ...filter, status }), options: [
                    { value: 'all', label: '全部', title: '显示全部记录' },
                    { value: 'issues', label: '异常', title: '只显示失败与中断的记录' },
                    { value: 'waiting', label: '等待', title: '只显示等待确认的记录' },
                ] }), pathFilterActive(filter)
                ? _jsx("button", { type: "button", className: css.clearButton, onClick: onClear, children: "\u6E05\u9664" })
                : _jsx("span", { className: css.searchHint, children: "\u8F93\u5165\u4EE5\u7B5B\u9009\u8DEF\u5F84 \u00B7 Esc \u6536\u8D77" })] }));
}
//# sourceMappingURL=SearchRow.js.map
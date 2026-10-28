import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconChevronRightOutlineRegular } from '@deepseek-ai/dsh-client-ui-primitives';
import { itemElapsedMs } from "../../observation/performance.js";
import { formatDuration } from "../display.js";
import { STATUS_LABEL } from "../labels.js";
import { StatusMark } from "../StatusMark.js";
import { itemMetaText } from "./panel-model.js";
import css from './panel.module.css';
/**
 * One record of the path, on a single line. The index is the record's position
 * in its phase and stays stable while the path is filtered; the meta line
 * carries step, tool, branch and retry context that used to need extra rows.
 */
export function OccurrenceRow({ item, index, branch, stepNumber, live, selected, now, indent, onSelect, }) {
    const duration = formatDuration(itemElapsedMs(item, live, now));
    const meta = itemMetaText(item, { branch, stepNumber });
    return (_jsxs("button", { type: "button", className: css.itemRow, "data-phase": item.phase, "data-status": item.status, "data-selected": selected ? '' : undefined, "data-current": live ? '' : undefined, "data-indent": indent ? '' : undefined, "data-ud-motion": "watcher-live-append", "aria-current": live ? 'step' : undefined, "aria-pressed": selected, "aria-label": `记录 ${index}，${item.title}，${meta}${duration === null ? '' : `，耗时 ${duration}`}，${STATUS_LABEL[item.status]}`, onClick: onSelect, children: [_jsx("span", { className: css.itemIndex, "aria-hidden": "true", children: String(index).padStart(2, '0') }), _jsx("span", { className: css.itemDot, "aria-hidden": "true", children: _jsx(StatusMark, { status: item.status }) }), _jsxs("span", { className: css.itemCopy, children: [_jsx("span", { className: css.itemTitle, children: item.title }), meta === '' ? null : _jsx("span", { className: css.itemMeta, children: meta })] }), duration === null ? null : _jsx("span", { className: css.itemDuration, children: duration }), _jsx(IconChevronRightOutlineRegular, { size: 12, className: css.itemChevron })] }));
}
//# sourceMappingURL=OccurrenceRow.js.map
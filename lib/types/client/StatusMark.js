import { jsx as _jsx } from "react/jsx-runtime";
import { StateDot } from '@deepseek-ai/dsh-client-ui-primitives';
import css from './Watcher.module.css';
function dotState(status) {
    if (status === 'running')
        return 'ongoing';
    if (status === 'waiting')
        return 'warning';
    if (status === 'failure' || status === 'interrupted')
        return 'error';
    if (status === 'success')
        return 'done';
    return null;
}
export function StatusMark({ status, className }) {
    const state = dotState(status);
    return state === null
        ? _jsx("span", { className: `${css.neutralDot}${className === undefined ? '' : ` ${className}`}`, "data-status": status, "aria-hidden": "true" })
        : _jsx(StateDot, { state: state, size: 10, className: className });
}
//# sourceMappingURL=StatusMark.js.map
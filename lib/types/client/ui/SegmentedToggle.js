import { jsx as _jsx } from "react/jsx-runtime";
import css from './SegmentedToggle.module.css';
/**
 * A row of mutually exclusive view toggles.
 *
 * This is deliberately not the primitives' `SegmentedControl`: that component
 * renders `role="tab"` and an `aria-controls` pointing at `<id>-<value>-panel`,
 * which only holds when each option owns a panel element. The switches here
 * change how the same content is rendered (or which range is counted), so the
 * correct semantics are toggle buttons in a group. The visual recipe is copied
 * from the primitives so the two look identical: a track filled with the
 * interactive hover token, a raised indicator over the selected option, and the
 * host's focus ring.
 */
export function SegmentedToggle({ label, value, options, onChange, className, }) {
    return (_jsx("div", { className: className === undefined ? css.group : `${css.group} ${className}`, role: "group", "aria-label": label, children: options.map(option => {
            const active = option.value === value;
            return (_jsx("button", { type: "button", className: css.option, "data-active": active ? '' : undefined, "aria-pressed": active, disabled: option.disabled, title: option.title, onClick: () => {
                    if (!active)
                        onChange(option.value);
                }, children: option.label }, option.value));
        }) }));
}
//# sourceMappingURL=SegmentedToggle.js.map
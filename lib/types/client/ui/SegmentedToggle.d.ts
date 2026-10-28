import type { ReactNode } from 'react';
export type SegmentedToggleOption<Value extends string> = {
    value: Value;
    label: ReactNode;
    disabled?: boolean;
    title?: string;
};
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
export declare function SegmentedToggle<Value extends string>({ label, value, options, onChange, className, }: {
    label: string;
    value: Value;
    options: readonly SegmentedToggleOption<Value>[];
    onChange: (value: Value) => void;
    className?: string;
}): import("react").JSX.Element;
//# sourceMappingURL=SegmentedToggle.d.ts.map
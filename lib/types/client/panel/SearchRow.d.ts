import { type PathFilter } from '../path-filter.ts';
/**
 * The search and status filter live on their own row, opened from the status
 * bar. The row stays visible while a filter is active so the narrowed path can
 * always be widened again without hunting for a hidden control.
 */
export declare function SearchRow({ filter, onChange, onClear, }: {
    filter: PathFilter;
    onChange: (filter: PathFilter) => void;
    onClear: () => void;
}): import("react").JSX.Element;
//# sourceMappingURL=SearchRow.d.ts.map
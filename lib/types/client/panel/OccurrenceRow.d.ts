import type { WorkItem } from '../../observation/fold.ts';
/**
 * One record of the path, on a single line. The index is the record's position
 * in its phase and stays stable while the path is filtered; the meta line
 * carries step, tool, branch and retry context that used to need extra rows.
 */
export declare function OccurrenceRow({ item, index, branch, stepNumber, live, selected, now, indent, onSelect, }: {
    item: WorkItem;
    index: number;
    branch: number | null;
    stepNumber: number | null;
    live: boolean;
    selected: boolean;
    now: number;
    indent: boolean;
    onSelect: () => void;
}): import("react").JSX.Element;
//# sourceMappingURL=OccurrenceRow.d.ts.map
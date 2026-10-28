import type { WorkGroup, WorkItem } from '../../observation/fold.ts';
import { type DisclosureLayer, type DisclosureState } from '../disclosure-depth.ts';
import type { PathFilter } from '../path-filter.ts';
import type { ObservationMode } from '../view-mode.ts';
/**
 * One phase of the path. In itemized mode a step that owns a single record is
 * drawn as that record (the step number folds into the meta line); everything
 * else keeps a quiet step header with the records indented under it. In grouped
 * mode records are clustered by the aggregation projection and model stages get
 * one collapsed summary per phase.
 *
 * Memoized with a comparator that ignores `now` and the callbacks: the phase
 * owns its live clock, and only the running phase subscribes to it.
 */
export declare const PhaseSection: import("react").MemoExoticComponent<({ group, isNow, running, lastItemId, selectedGroup, selectedItemId, mode, open, disclosure, filter, onToggle, onToggleLayer, onToggleReasoning, onSelectItem, }: {
    group: WorkGroup;
    isNow: boolean;
    running: boolean;
    lastItemId: string | null;
    selectedGroup: boolean;
    selectedItemId: string | null;
    mode: ObservationMode;
    open: boolean;
    disclosure: DisclosureState;
    filter: PathFilter;
    onToggle: () => void;
    onToggleLayer: (layer: DisclosureLayer, key: string) => void;
    onToggleReasoning: (key: string, modelKey: string) => void;
    onSelectItem: (item: WorkItem) => void;
}) => import("react").JSX.Element | null>;
//# sourceMappingURL=PhaseSection.d.ts.map
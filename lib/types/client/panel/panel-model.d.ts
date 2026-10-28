import { type WorkCluster } from '../../hub/aggregation.ts';
import type { OverviewState } from '../../hub/overview.ts';
import type { WorkGroup, WorkItem, WorkStep } from '../../observation/fold.ts';
import { type PathFilter } from '../path-filter.ts';
import { type StepTimelineEntry } from '../step-timeline.ts';
/**
 * The reading projection of one phase under the current path filter.
 *
 * Occurrence numbers are assigned by the phase component from the whole phase,
 * so a record keeps its identity no matter how the path is narrowed.
 */
export interface PhaseFilterView {
    readonly active: boolean;
    readonly titleMatch: boolean;
    /** Item ids the query keeps. `null` means no filter is active. */
    readonly visibleItemIds: ReadonlySet<string> | null;
    readonly matchesNothing: boolean;
}
export declare function phaseFilterView(group: WorkGroup, filter: PathFilter): PhaseFilterView;
/** One authoritative step, narrowed to the rows the panel should draw. */
export interface PhaseStepRow {
    readonly step: WorkStep;
    readonly entries: readonly StepTimelineEntry[];
    /**
     * A step that owns exactly one record needs no header of its own: the record
     * row carries the step number in its meta line and becomes one flat path row.
     */
    readonly flat: boolean;
}
export declare function phaseStepRows(group: WorkGroup, visibleItemIds: ReadonlySet<string> | null): readonly PhaseStepRow[];
export declare function branchNumberOf(step: WorkStep, item: WorkItem): number | null;
export declare function itemMetaText(item: WorkItem, options?: {
    branch?: number | null;
    stepNumber?: number | null;
}): string;
export interface GroupSignal {
    readonly kind: 'parallel' | 'retry' | 'iteration';
    readonly label: string;
}
export declare function groupSignals(group: WorkGroup): readonly GroupSignal[];
export declare function phaseMetaText(group: WorkGroup, duration: string | null): string;
export declare function clusterBasisLabel(cluster: WorkCluster): string | null;
export declare function clusterMetaText(cluster: WorkCluster): string;
/** Overview states that should surface as a text tag, not only as a colour. */
export declare function showStateTag(state: OverviewState): boolean;
//# sourceMappingURL=panel-model.d.ts.map
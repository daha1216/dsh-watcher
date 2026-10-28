import type { WorkGroup, WorkItem } from '../observation/fold.ts';
/** Which rows the path keeps: everything, only problems, or only waiting work. */
export type PathStatusFilter = 'all' | 'issues' | 'waiting';
export interface PathFilter {
    readonly query: string;
    readonly status: PathStatusFilter;
}
export declare const EMPTY_PATH_FILTER: PathFilter;
export declare function pathFilterActive(filter: PathFilter): boolean;
/**
 * Model stages carry no title of their own, so they are only kept by an
 * unfiltered path; a narrowed path shows the records the query actually names.
 */
export declare function itemMatchesFilter(item: WorkItem, filter: PathFilter): boolean;
/** A phase title is itself a match, so a phase named by the query keeps its rows. */
export declare function groupTitleMatches(group: WorkGroup, filter: PathFilter): boolean;
export declare function groupMatchesFilter(group: WorkGroup, filter: PathFilter): boolean;
//# sourceMappingURL=path-filter.d.ts.map
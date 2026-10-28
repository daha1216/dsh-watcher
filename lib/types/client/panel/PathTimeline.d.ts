import type { RefObject } from 'react';
import type { WorkGroup, WorkItem, WorkTurn } from '../../observation/fold.ts';
import type { TurnPerformance } from '../../observation/performance.ts';
import type { DisclosureLayer, DisclosureState } from '../disclosure-depth.ts';
import type { PathFilter } from '../path-filter.ts';
import type { ObservationMode } from '../view-mode.ts';
import type { HistoryKind } from './ViewMenu.tsx';
/**
 * The scrollable path: a dashed "load older" row at the top of the loaded
 * window, then one section per turn. The viewport itself is owned here so the
 * follow behaviour in the panel can keep reading and writing its scrollTop.
 */
export declare function PathTimeline({ turns, viewportRef, onScroll, performanceByTurn, latestTurnNumber, running, filterActive, filter, mode, disclosure, lastGroupId, lastItemId, selectedGroupId, selectedItemId, hasMore, olderLoading, historyKind, historyMessage, onLoadOlder, onToggleTurn, onTogglePhase, onToggleLayer, onToggleReasoning, onSelectItem, }: {
    turns: readonly WorkTurn[];
    viewportRef: RefObject<HTMLDivElement>;
    onScroll: () => void;
    performanceByTurn: ReadonlyMap<number, TurnPerformance>;
    latestTurnNumber: number | null;
    running: boolean;
    filterActive: boolean;
    filter: PathFilter;
    mode: ObservationMode;
    disclosure: DisclosureState;
    lastGroupId: string | null;
    lastItemId: string | null;
    selectedGroupId: string | null;
    selectedItemId: string | null;
    hasMore: boolean;
    olderLoading: boolean;
    historyKind: HistoryKind;
    historyMessage: string | null;
    onLoadOlder: () => void;
    onToggleTurn: (turn: number, automaticDefaultOpen: boolean) => void;
    onTogglePhase: (groupId: string) => void;
    onToggleLayer: (layer: DisclosureLayer, key: string) => void;
    onToggleReasoning: (key: string, modelKey: string) => void;
    onSelectItem: (group: WorkGroup, item: WorkItem) => void;
}): import("react").JSX.Element;
//# sourceMappingURL=PathTimeline.d.ts.map
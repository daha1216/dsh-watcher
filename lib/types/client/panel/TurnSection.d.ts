import type { WorkGroup, WorkItem, WorkTurn } from '../../observation/fold.ts';
import { type TurnPerformance } from '../../observation/performance.ts';
import { type DisclosureLayer, type DisclosureState } from '../disclosure-depth.ts';
import type { PathFilter } from '../path-filter.ts';
import type { ObservationMode } from '../view-mode.ts';
/**
 * One conversation turn: a single sticky header row and its phases. The header
 * is the only row that shows aggregate timing; each phase owns its own clock so
 * an idle panel never re-renders on the tick.
 */
export declare const TurnSection: import("react").MemoExoticComponent<({ turn, performance, isLatest, running, filterActive, mode, disclosure, filter, lastGroupId, lastItemId, selectedGroupId, selectedItemId, onToggle, onTogglePhase, onToggleLayer, onToggleReasoning, onSelectItem, }: {
    turn: WorkTurn;
    performance: TurnPerformance | undefined;
    isLatest: boolean;
    running: boolean;
    filterActive: boolean;
    mode: ObservationMode;
    disclosure: DisclosureState;
    filter: PathFilter;
    lastGroupId: string | null;
    lastItemId: string | null;
    selectedGroupId: string | null;
    selectedItemId: string | null;
    onToggle: () => void;
    onTogglePhase: (groupId: string) => void;
    onToggleLayer: (layer: DisclosureLayer, key: string) => void;
    onToggleReasoning: (key: string, modelKey: string) => void;
    onSelectItem: (group: WorkGroup, item: WorkItem) => void;
}) => import("react").JSX.Element>;
//# sourceMappingURL=TurnSection.d.ts.map
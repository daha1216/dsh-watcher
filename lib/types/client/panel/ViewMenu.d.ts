import type { ObservationMode } from '../view-mode.ts';
import type { DisclosureDepth } from '../disclosure-depth.ts';
export type HistoryKind = 'idle' | 'loading' | 'complete' | 'error';
/**
 * The overflow menu keeps the view switches and the history actions out of the
 * persistent chrome. It is one small surface, opened on demand, so the default
 * panel is only a status bar and a path.
 */
export declare function ViewMenu({ mode, depth, hasMore, olderLoading, historyKind, historyMessage, following, top, onMode, onDepth, onLoadOlder, onLoadAll, onBackToLatest, }: {
    mode: ObservationMode;
    depth: DisclosureDepth;
    hasMore: boolean;
    olderLoading: boolean;
    historyKind: HistoryKind;
    historyMessage: string | null;
    following: boolean;
    top: number;
    onMode: (mode: ObservationMode) => void;
    onDepth: (depth: DisclosureDepth) => void;
    onLoadOlder: () => void;
    onLoadAll: () => void;
    onBackToLatest: () => void;
}): import("react").JSX.Element;
//# sourceMappingURL=ViewMenu.d.ts.map
import type { WorkItem, WorkTurn } from '../observation/fold.ts';
export declare function formatDuration(durationMs: number | null): string | null;
export type TurnDurationDisplay = {
    kind: 'exact' | 'partial';
    value: string;
};
export declare function turnDuration(turn: WorkTurn, live: boolean, now: number): TurnDurationDisplay | null;
export declare function useLiveClock(enabled: boolean): number;
/**
 * Markdown that is safe to render inside the panel.
 *
 * Recorded output is untrusted text: a model or a fetched file can contain
 * `![x](https://…)`, which a markdown renderer resolves immediately. That would
 * turn opening a record into a request to somebody else's server, so a remote
 * image becomes a plain link the reader can choose to open.
 */
export declare function safeMarkdown(text: string): string;
/** How an item relates to an earlier attempt at the same work. */
export declare function itemPattern(item: WorkItem): string | null;
/** The raw payload as text, falling back to JSON when the fold kept no text. */
export declare function rawOf(item: WorkItem): string;
export declare function isJsonValue(value: unknown): value is object | unknown[];
//# sourceMappingURL=display.d.ts.map
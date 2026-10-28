import type { InsightsView } from '../insights/projection.ts';
/** The in-panel session readout: cost, timing, per-turn evidence. */
export type Evidence = {
    turn: number;
    steps: number[];
    seqs: number[];
};
export declare function SessionInsights({ value, now, running, waiting, onEvidence, tokensPerSecond, flat, onClose }: {
    value: InsightsView | undefined;
    now: number;
    running: boolean;
    waiting: boolean;
    onEvidence: (e: Evidence) => void;
    tokensPerSecond?: number | null;
    flat?: boolean;
    onClose?: () => void;
}): import("react").JSX.Element | null;
//# sourceMappingURL=SessionInsights.d.ts.map
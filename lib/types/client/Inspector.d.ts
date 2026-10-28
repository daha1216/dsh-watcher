import type { WorkGroup } from '../observation/fold.ts';
/** Which payload view the docked inspector is showing. */
export type DetailTab = 'result' | 'input' | 'raw';
export declare function ExecutionInspector({ group, selectedItemId, live, now, closing, position, onStep, onBack, onExited, }: {
    group: WorkGroup;
    selectedItemId: string | null;
    live: boolean;
    now: number;
    closing: boolean;
    position: {
        index: number;
        total: number;
    };
    onStep: (direction: -1 | 1) => void;
    onBack: () => void;
    onExited: () => void;
}): import("react").JSX.Element | null;
//# sourceMappingURL=Inspector.d.ts.map
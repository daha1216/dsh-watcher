import { type ModelStepTrace } from '../observation/model-trace.ts';
import { type DisclosureState } from './disclosure-depth.ts';
export declare function ModelStage({ trace, stepId, now, open, disclosure, onToggle, onToggleReasoning, }: {
    trace: ModelStepTrace;
    stepId: string;
    now: number;
    open: boolean;
    disclosure: DisclosureState;
    onToggle: () => void;
    onToggleReasoning: (key: string) => void;
}): import("react").JSX.Element;
//# sourceMappingURL=ModelStage.d.ts.map
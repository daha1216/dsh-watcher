import type { DiffBlockLabels, JsonTreeLabels, MarkdownLabels, ReadBlockLabels, TerminalBlockLabels } from '@deepseek-ai/dsh-client-ui-primitives';
import type { WorkStatus } from '../observation/fold.ts';
export declare const CODE_TOOLBAR_LABELS: Readonly<{
    codeLabel: "代码块";
    wrapLabel: "自动换行";
    unwrapLabel: "取消自动换行";
}>;
export declare const MARKDOWN_LABELS: MarkdownLabels;
export declare const TERMINAL_LABELS: TerminalBlockLabels;
export declare const READ_LABELS: ReadBlockLabels;
export declare const DIFF_LABELS: DiffBlockLabels;
export declare const JSON_LABELS: JsonTreeLabels;
export declare const STATUS_LABEL: Record<WorkStatus, string>;
//# sourceMappingURL=labels.d.ts.map
import type { PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import type { CompleteHistoryResult } from '../hub/history.ts';
export interface WatcherInjected {
    /** Pull a single older page; the caller decides how far back to walk. */
    loadOlderPage: () => Promise<void>;
    loadAllHistory: (signal: AbortSignal) => Promise<CompleteHistoryResult>;
}
export type WatcherProps = PropsRuntime<'conversation.session.header.utilities'> & WatcherInjected;
/** Native session-header utility: exact work picture, typed evidence, no steering. */
export declare function Watcher(props: WatcherProps): import("react").JSX.Element;
//# sourceMappingURL=Watcher.d.ts.map
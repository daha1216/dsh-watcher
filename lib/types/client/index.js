import { loadCompleteHistory } from "../hub/history.js";
import { Watcher } from "./Watcher.js";
import { registerModelTraceDefinition } from "./model-trace-definition.js";
import { InsightsSettings } from "./InsightsSettings.js";
export const name = 'dsh-watcher-client';
export const inject = ['slots', 'sessions', 'uiConversation'];
/**
 * Native session-header utility. Order 50 sits after Session log (0)
 * and before the files-panel toggle (110). No overlay glyph.
 */
export function apply(ctx) {
    registerModelTraceDefinition(ctx);
    ctx.inject(['remote', 'remote.session'], c => {
        c.slots.inject('settings.section', () => c.slots.register({
            name: 'settings.section', id: 'watcher-insights', order: 85,
            label: 'Watcher', inject: () => ({ remote: c.remote }),
        }, InsightsSettings));
    });
    ctx.slots.inject('conversation.session.header.utilities', () => ctx.slots.register({
        name: 'conversation.session.header.utilities',
        id: 'dsh-watcher',
        order: 50,
        label: 'Watcher',
        inject: (sessionId) => {
            // Workspace Host provides ISessions.binding(); keep runtime behavior.
            const session = ctx.sessions.binding?.(sessionId)?.session;
            if (session === undefined) {
                // A header can render before its session binding exists (restore, cold
                // start, closing window). Throwing here would escape into React's render
                // path, so degrade to a read-only placeholder instead.
                return {
                    loadOlderPage: () => Promise.resolve(),
                    loadAllHistory: async () => ({ kind: 'blocked', pages: 0, reason: 'busy' }),
                };
            }
            return {
                // One page at a time, so a long session can be walked backwards
                // without committing to the whole history (or hitting its page limit).
                loadOlderPage: () => session.loadOlder(),
                loadAllHistory: signal => loadCompleteHistory({
                    signal,
                    loadOlder: () => session.loadOlder(),
                    read: () => {
                        const sessionSnapshot = session.getSnapshot();
                        const conversation = ctx.uiConversation.binding(sessionId).snapshot.getSnapshot();
                        const chat = conversation.views.get('chat');
                        if (chat === undefined)
                            throw new Error('dsh-watcher: Chat conversation target is unavailable');
                        const firstNode = chat.legacy.nodes[0];
                        const firstTurn = chat.timeline.turnOrder[0];
                        return {
                            hasMore: sessionSnapshot.hasMore,
                            loadingOlder: sessionSnapshot.loadingOlder,
                            headKey: `${firstTurn ?? 'none'}:${firstNode?.seq ?? 'none'}:${chat.legacy.nodes.length}`,
                        };
                    },
                }),
            };
        },
    }, Watcher));
}
//# sourceMappingURL=index.js.map
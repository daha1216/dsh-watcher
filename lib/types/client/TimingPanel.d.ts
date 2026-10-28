import type { InsightsView } from '../insights/projection.ts';
export declare function TimingPanel({ stats, scope, tokensPerSecond, compact, }: {
    stats: InsightsView['totals'];
    scope: 'turn' | 'session';
    tokensPerSecond?: number | null;
    compact?: boolean;
}): import("react").JSX.Element;
//# sourceMappingURL=TimingPanel.d.ts.map
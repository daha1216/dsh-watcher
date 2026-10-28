import type { InsightsAnalytics } from '../insights-analytics.ts';
type Drilldown = 'speed' | 'latency' | 'thinking' | 'cache' | 'tool' | 'reliability';
/** Detail body behind the headline cards: one ranked list per dimension. */
export declare function DrilldownPanel({ analytics, activeDrilldown, setActiveDrilldown }: {
    analytics: InsightsAnalytics;
    activeDrilldown: Drilldown;
    setActiveDrilldown: (next: Drilldown | null) => void;
}): import("react").JSX.Element;
export {};
//# sourceMappingURL=DrilldownPanel.d.ts.map
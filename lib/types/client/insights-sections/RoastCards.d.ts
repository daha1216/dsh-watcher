import type { InsightsAnalytics } from '../insights-analytics.ts';
type Drilldown = 'speed' | 'latency' | 'thinking' | 'cache' | 'tool' | 'reliability';
/** Six headline cards; each one opens the matching drill-down panel. */
export declare function RoastCards({ analytics, activeDrilldown, setActiveDrilldown }: {
    analytics: InsightsAnalytics | null;
    activeDrilldown: Drilldown | null;
    setActiveDrilldown: (next: Drilldown | null) => void;
}): import("react").JSX.Element;
export {};
//# sourceMappingURL=RoastCards.d.ts.map
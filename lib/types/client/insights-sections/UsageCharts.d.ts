import type { InsightsAnalytics, AnalyticsRange } from '../insights-analytics.ts';
export type ChartViewMode = 'bar' | 'line';
/** Donut split plus the daily activity chart with its two hover readouts. */
export declare function UsageCharts({ analytics, range, viewMode, setCustomViewMode }: {
    analytics: InsightsAnalytics | null;
    range: AnalyticsRange;
    viewMode: ChartViewMode;
    setCustomViewMode: (next: ChartViewMode | null) => void;
}): import("react").JSX.Element;
//# sourceMappingURL=UsageCharts.d.ts.map
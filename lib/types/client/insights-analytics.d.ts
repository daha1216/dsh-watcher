export type SessionsScan = {
    total: number;
    selected: number;
    rows: any[];
};
export type AnalyticsRange = '7' | '30' | '180';
export type SessionSort = 'tokens' | 'time' | 'errors';
/**
 * Everything the settings dashboard plots, derived in one pass over a scan.
 * Pure: the caller owns scanning, storage and hover state.
 */
export declare function analyticsOf(sessions: SessionsScan | null, range: AnalyticsRange, sessionSort: SessionSort, pricing: any): {
    validCount: number;
    listed: number;
    scannedCount: number;
    totalTokens: number;
    estimatedCost: any;
    totalTimeHours: string;
    cacheHitPct: number;
    totalCacheRead: number;
    totalToolMs: number;
    totalBashMs: number;
    totalFileMs: number;
    bashPct: number;
    filePct: number;
    topToolSessions: any[];
    errorSessions: any[];
    sortedSessions: any[];
    maxSessionTokens: number;
    totalTools: number;
    toolTimePct: number;
    totalErrors: number;
    totalRetries: number;
    speedList: any[];
    latencyList: any[];
    thinkList: any[];
    cacheList: any[];
    donutModels: any[];
    donutTotal: any;
    donutSegments: {
        model: any;
        tokens: any;
        pct: number;
        color: string;
        dasharray: string;
        dashoffset: number;
    }[];
    thinkKing: any;
    fastKing: any;
    slowKing: any;
    bestCacheModel: any;
    daySeries: {
        key: string;
        label: string;
        weekday: string;
        isToday: boolean;
        isYesterday: boolean;
        total: number;
        sessions: number;
        segments: {
            pct: number;
            model: any;
            tokens: any;
            color: string;
        }[];
    }[];
    dayMax: number;
    activeRangeModels: {
        model: string;
        tokens: number;
        color: string;
        pct: number;
    }[];
    heatmapWeeks: {
        weekIndex: number;
        days: Array<{
            date: string;
            dayOfWeek: number;
            weekday: string;
            month: number;
            isFuture: boolean;
            isToday: boolean;
            tokens: number;
            sessions: number;
            models: Array<{
                model: string;
                tokens: number;
                color: string;
                pct: number;
            }>;
            level: 0 | 1 | 2 | 3 | 4;
        }>;
    }[];
    heatmapMonthLabels: {
        colIndex: number;
        label: string;
    }[];
    heatmapStats: {
        activeDays: number;
        totalHeatmapTokens: number;
        totalHeatmapSessions: number;
        maxHeatmapDayTokens: number;
    };
} | null;
export type InsightsAnalytics = NonNullable<ReturnType<typeof analyticsOf>>;
//# sourceMappingURL=insights-analytics.d.ts.map
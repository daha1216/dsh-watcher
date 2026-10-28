import type { InsightsAnalytics, SessionSort, SessionsScan } from '../insights-analytics.ts';
/** Top conversations ranked by the selected dimension, expandable in place. */
export declare function SessionLedger({ analytics, sessions, sessionSort, setSessionSort }: {
    analytics: InsightsAnalytics | null;
    sessions: SessionsScan | null;
    sessionSort: SessionSort;
    setSessionSort: (next: SessionSort) => void;
}): import("react").JSX.Element;
//# sourceMappingURL=SessionLedger.d.ts.map
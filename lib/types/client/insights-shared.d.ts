import type { ReactNode } from 'react';
/** Shared formatting, storage and chart plumbing for both Insights surfaces. */
export type Limits = {
    silenceSeconds: number;
    reasoningSeconds: number;
};
export declare const STORAGE = "dsh-watcher:insights-display:v1";
export declare function routeLabel(route?: {
    provider?: string;
    model?: string;
}): string;
export declare function modelKeyOf(m: any): string;
export declare function readLimits(): Limits;
export declare function useLimits(): Limits;
export declare function useUiLocale(): any;
export declare function usePricingTable(): any;
export declare const numberFormat: Intl.NumberFormat;
export declare const fmt: (n: number) => string;
export declare const fmtCompact: (n: number) => string;
export { dayKey } from '../insights/day-axis.mjs';
export declare const dayLabel: (key: string) => string;
export declare const PALETTE: string[];
export declare const WEEKDAYS: string[];
export declare function computeStackedLineChart(daySeries: Array<{
    key: string;
    label: string;
    total: number;
    weekday: string;
    sessions: number;
    segments: any[];
    isToday?: boolean;
    isYesterday?: boolean;
}>, modelsList: Array<{
    model: string;
    color: string;
    tokens: number;
    pct: number;
}>, width?: number, height?: number): {
    layers: {
        model: string;
        color: string;
        lineD: string;
        areaD: string;
        topPts: {
            x: number;
            y: number;
        }[];
    }[];
    stackLevels: {
        index: number;
        x: number;
        total: number;
        data: {
            key: string;
            label: string;
            total: number;
            weekday: string;
            sessions: number;
            segments: any[];
            isToday?: boolean;
            isYesterday?: boolean;
        };
        modelStacks: {
            model: string;
            color: string;
            tokens: any;
            bottomY: number;
            topY: number;
        }[];
    }[];
    yMax: number;
    bottomY: number;
    padding: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    plotW: number;
    plotH: number;
};
/**
 * Viewport-space anchor for a chart hover card: a live element plus the
 * relative point inside it the card should point at. The rectangle is re-read
 * on every placement, so the card keeps following its bar/cell while a nested
 * settings pane scrolls.
 */
export type ChartAnchor = {
    el: Element;
    ratioX: number;
    ratioY: number;
    /** Preferred side of the anchor point; placement flips it when that side does not fit. */
    side: 'above' | 'below';
};
export declare const TOOLTIP_MARGIN = 8;
export declare const TOOLTIP_GAP = 12;
/**
 * Hover card for the charts. The panels clip their content, and a card centred
 * on a late bar is wider than the space left of the panel edge, so the card is
 * portalled to the document body and placed in viewport coordinates — the same
 * approach as the UI primitives' HoverCard. Placement is written straight to
 * the node: it runs before paint and again on scroll/resize, and it clamps to
 * the viewport so no side of the card is ever cut off.
 */
export declare function ChartTooltip({ anchor, children }: {
    anchor: ChartAnchor | null;
    children: ReactNode;
}): import("react").ReactPortal | null;
export declare function effortLabel(effort: string | null | undefined): string;
//# sourceMappingURL=insights-shared.d.ts.map
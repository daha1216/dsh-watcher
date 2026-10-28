import type { CSSProperties, RefObject } from 'react';
/** Distance kept between the trigger and the panel it opens. */
export declare const PANEL_GAP = 8;
/** Distance kept between the panel and every viewport edge. */
export declare const PANEL_MARGIN = 12;
export interface PanelGeometry {
    /** Inline style for the portaled panel: position, size and the sized flag. */
    style: CSSProperties;
    /** True once the user has resized the panel away from its auto layout. */
    sized: boolean;
    resizing: boolean;
    /** The panel's own frame, exposed so disclosure changes can pin it. */
    panelRef: RefObject<HTMLDivElement>;
    /** Freeze the measured frame so a width change cannot re-clamp mid-animation. */
    pinFrame: () => void;
    /** Drop a pin and release the frozen coordinates. */
    clearPin: () => void;
    startResize: (event: React.PointerEvent<HTMLElement>, axes: 'both' | 'x' | 'y') => void;
    resetSize: () => void;
}
/**
 * Owns everything about where the floating panel sits and how big it is: the
 * anchored default frame, the frozen frame used while the inspector opens and
 * closes, the user's persisted size, and edge dragging. None of it depends on
 * the work-picture data, so the panel component does not have to carry it.
 *
 * `fallbackExitMs` is how long a frozen frame may outlive the transition that
 * needed it; past that the anchor takes over again even if no animation ran.
 */
export declare function usePanelGeometry({ open, anchorRef, fallbackExitMs }: {
    open: boolean;
    anchorRef: RefObject<HTMLElement>;
    fallbackExitMs: number;
}): PanelGeometry;
//# sourceMappingURL=panel-geometry.d.ts.map
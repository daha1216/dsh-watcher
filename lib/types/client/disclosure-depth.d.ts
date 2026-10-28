export type DisclosureDepth = 'overview' | 'detail';
export type DisclosureLayer = 'phase' | 'step' | 'cluster' | 'model' | 'reasoning';
type LayerOverrides = Readonly<Record<DisclosureLayer, Readonly<Record<string, boolean>>>>;
export interface DisclosureState {
    readonly depth: DisclosureDepth;
    readonly turns: Readonly<Record<number, boolean>>;
    readonly layers: LayerOverrides;
}
export declare function createDisclosureState(depth?: DisclosureDepth): DisclosureState;
/** Overview keeps the automatic Turn policy; detail opens every Turn by default. */
export declare function turnDisclosureOpen(state: DisclosureState, turn: number, overviewDefaultOpen: boolean): boolean;
/** Overview stops at phase headers; detail opens every nested level by default. */
export declare function layerDisclosureOpen(state: DisclosureState, layer: DisclosureLayer, key: string): boolean;
/**
 * The reader's own toggle for one key, or `undefined` while the depth policy is
 * still deciding. A surface that overrides the default for a reason (a search
 * filter unfolding every match) uses this to let an explicit click win instead
 * of pinning the surface open after the click appears to do nothing.
 */
export declare function layerDisclosureOverride(state: DisclosureState, layer: DisclosureLayer, key: string): boolean | undefined;
export declare function setLayerDisclosure(state: DisclosureState, layer: DisclosureLayer, key: string, open: boolean): DisclosureState;
export declare function toggleTurnDisclosure(state: DisclosureState, turn: number, overviewDefaultOpen: boolean): DisclosureState;
export declare function toggleLayerDisclosure(state: DisclosureState, layer: DisclosureLayer, key: string): DisclosureState;
/** Choosing a depth applies it immediately instead of inheriting stale manual folds. */
export declare function chooseDisclosureDepth(depth: DisclosureDepth): DisclosureState;
/** Session-specific ids may change, while the user's chosen depth remains useful. */
export declare function resetDisclosureOverrides(state: DisclosureState): DisclosureState;
export {};
//# sourceMappingURL=disclosure-depth.d.ts.map
/** Which tools the status bar currently has open; only one at a time. */
export type PanelTool = 'none' | 'search' | 'menu';
/**
 * The one persistent row of the panel, and a plain read-out: what the agent is
 * doing right now. Opening the work path is a separate control under the usage
 * readout, so this bar never moves when the path folds or unfolds.
 */
export declare function PanelHeader({ status, nowLabel, running, alert, searchActive, tool, onToggleSearch, onToggleMenu, }: {
    status: string;
    nowLabel: string;
    running: boolean;
    alert: boolean;
    searchActive: boolean;
    tool: PanelTool;
    onToggleSearch: () => void;
    onToggleMenu: () => void;
}): import("react").JSX.Element;
//# sourceMappingURL=PanelHeader.d.ts.map
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconChevronRightOutlineRegular } from '@deepseek-ai/dsh-client-ui-primitives';
import { overviewStateOf, turnNeedsDefaultDisclosure } from "../../hub/overview.js";
import { TurnSection } from "./TurnSection.js";
import css from './panel.module.css';
/**
 * The scrollable path: a dashed "load older" row at the top of the loaded
 * window, then one section per turn. The viewport itself is owned here so the
 * follow behaviour in the panel can keep reading and writing its scrollTop.
 */
export function PathTimeline({ turns, viewportRef, onScroll, performanceByTurn, latestTurnNumber, running, filterActive, filter, mode, disclosure, lastGroupId, lastItemId, selectedGroupId, selectedItemId, hasMore, olderLoading, historyKind, historyMessage, onLoadOlder, onToggleTurn, onTogglePhase, onToggleLayer, onToggleReasoning, onSelectItem, }) {
    return (_jsx("div", { className: css.railViewport, ref: viewportRef, onScroll: onScroll, children: _jsxs("div", { className: css.turns, children: [hasMore ? (_jsxs("div", { className: css.moreRow, children: [_jsxs("button", { type: "button", className: css.moreButton, onClick: onLoadOlder, disabled: olderLoading, title: "\u53EA\u5F80\u56DE\u8F7D\u5165\u4E00\u9875\u5386\u53F2\uFF1B\u7EE7\u7EED\u70B9\u51FB\u53EF\u9010\u9875\u7FFB\u5230\u4F1A\u8BDD\u5F00\u5934", children: [_jsx(IconChevronRightOutlineRegular, { size: 11, className: css.moreChevron }), olderLoading ? '正在载入更早的记录…' : '载入更早的记录'] }), historyKind === 'error' && historyMessage !== null
                            ? _jsx("span", { className: css.moreStatus, role: "status", children: historyMessage })
                            : null] })) : null, turns.map(turn => {
                    const isLatest = turn.turn === latestTurnNumber;
                    const state = overviewStateOf(turn.status, isLatest);
                    const automaticDefaultOpen = turnNeedsDefaultDisclosure(state, isLatest);
                    return (_jsx(TurnSection, { turn: turn, performance: performanceByTurn.get(turn.turn), isLatest: isLatest, running: running, filterActive: filterActive, mode: mode, disclosure: disclosure, filter: filter, lastGroupId: lastGroupId, lastItemId: lastItemId, selectedGroupId: selectedGroupId, selectedItemId: selectedItemId, onToggle: () => onToggleTurn(turn.turn, automaticDefaultOpen), onTogglePhase: onTogglePhase, onToggleLayer: onToggleLayer, onToggleReasoning: onToggleReasoning, onSelectItem: onSelectItem }, turn.turn));
                })] }) }));
}
//# sourceMappingURL=PathTimeline.js.map
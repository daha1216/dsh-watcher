import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import { IconChevronRightOutlineRegular } from '@deepseek-ai/dsh-client-ui-primitives';
import { OVERVIEW_STATE_LABEL, overviewStateOf, turnNeedsDefaultDisclosure, turnOverviewSummary } from "../../hub/overview.js";
import { formatTokensPerSecond } from "../../observation/performance.js";
import { turnDuration, useLiveClock } from "../display.js";
import { layerDisclosureOpen, turnDisclosureOpen, } from "../disclosure-depth.js";
import { PhaseSection } from "./PhaseSection.js";
import { showStateTag } from "./panel-model.js";
import css from './panel.module.css';
/**
 * One conversation turn: a single sticky header row and its phases. The header
 * is the only row that shows aggregate timing; each phase owns its own clock so
 * an idle panel never re-renders on the tick.
 */
export const TurnSection = memo(function TurnSection({ turn, performance, isLatest, running, filterActive, mode, disclosure, filter, lastGroupId, lastItemId, selectedGroupId, selectedItemId, onToggle, onTogglePhase, onToggleLayer, onToggleReasoning, onSelectItem, }) {
    const isLive = isLatest && running;
    const now = useLiveClock(isLive);
    const state = overviewStateOf(turn.status, isLatest);
    const automaticDefaultOpen = turnNeedsDefaultDisclosure(state, isLatest);
    const turnOpen = filterActive || turnDisclosureOpen(disclosure, turn.turn, automaticDefaultOpen);
    const duration = turnDuration(turn, isLive, now);
    const tokenSpeed = performance?.throughput.kind === 'measured'
        ? `${formatTokensPerSecond(performance.throughput.tokensPerSecond)} tok/s`
        : null;
    const durationText = duration === null
        ? OVERVIEW_STATE_LABEL[state]
        : duration.kind === 'exact'
            ? `总 ${duration.value}`
            : `已记录 ${duration.value}`;
    const secondary = [
        duration?.kind === 'partial' ? '开头未载入' : null,
        tokenSpeed,
    ].filter((part) => part !== null).join(' · ');
    const durationAria = duration === null
        ? ''
        : duration.kind === 'exact'
            ? `，总耗时 ${duration.value}`
            : `，已记录 ${duration.value}，开头未载入`;
    const title = turn.turn === 0 ? '会话准备' : `对话轮次 ${turn.turn}`;
    const label = turn.turn === 0 ? '准备' : `轮次 ${turn.turn}`;
    const summary = turnOverviewSummary(turn);
    return (_jsxs("section", { className: css.turn, "data-state": state, "aria-labelledby": `watcher-turn-${turn.turn}`, children: [_jsx("header", { className: css.turnHeader, children: _jsx("h2", { id: `watcher-turn-${turn.turn}`, className: css.turnHeading, children: _jsxs("button", { type: "button", className: css.turnToggle, "aria-expanded": turnOpen, "aria-controls": `watcher-turn-body-${turn.turn}`, "aria-label": `${title}，${OVERVIEW_STATE_LABEL[state]}，${summary}${durationAria}${tokenSpeed === null ? '' : `，生成速度 ${tokenSpeed}`}，${turnOpen ? '收起轮次' : '展开轮次'}`, title: turnOpen ? '收起此轮次；新进展仍会继续更新' : '展开此轮次', onClick: onToggle, children: [_jsx(IconChevronRightOutlineRegular, { size: 13, className: css.turnChevron }), _jsx("span", { className: css.turnLabel, children: label }), showStateTag(state) ? _jsx("span", { className: css.stateTag, "data-state": state, children: OVERVIEW_STATE_LABEL[state] }) : null, _jsx("span", { className: css.turnSummary, children: summary }), _jsxs("span", { className: css.turnPerf, children: [_jsx("span", { children: durationText }), secondary === '' ? null : _jsx("span", { className: css.turnSpeed, children: secondary })] })] }) }) }), turnOpen ? (_jsx("div", { id: `watcher-turn-body-${turn.turn}`, className: css.turnBody, children: turn.groups.map(group => (_jsx(PhaseSection, { group: group, isNow: group.id === lastGroupId, running: running, lastItemId: lastItemId, selectedGroup: selectedGroupId === group.id, selectedItemId: selectedItemId, mode: mode, open: layerDisclosureOpen(disclosure, 'phase', group.id), disclosure: disclosure, filter: filter, onToggle: () => onTogglePhase(group.id), onToggleLayer: onToggleLayer, onToggleReasoning: onToggleReasoning, onSelectItem: item => onSelectItem(group, item) }, group.id))) })) : null] }));
}, (prev, next) => prev.turn === next.turn
    && prev.performance === next.performance
    && prev.isLatest === next.isLatest
    && prev.running === next.running
    && prev.filterActive === next.filterActive
    && prev.mode === next.mode
    && prev.disclosure === next.disclosure
    && prev.filter === next.filter
    && prev.lastGroupId === next.lastGroupId
    && prev.lastItemId === next.lastItemId
    && prev.selectedGroupId === next.selectedGroupId
    && prev.selectedItemId === next.selectedItemId);
//# sourceMappingURL=TurnSection.js.map
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useMemo } from 'react';
import { IconChevronRightOutlineRegular } from '@deepseek-ai/dsh-client-ui-primitives';
import { clusterWorkItems } from "../../hub/aggregation.js";
import { OVERVIEW_STATE_LABEL, overviewStateOf } from "../../hub/overview.js";
import { groupElapsedMs, stepElapsedMs } from "../../observation/performance.js";
import { formatDuration, useLiveClock } from "../display.js";
import { layerDisclosureOpen, layerDisclosureOverride } from "../disclosure-depth.js";
import { ModelStage } from "../ModelStage.js";
import { StatusMark } from "../StatusMark.js";
import { OccurrenceRow } from "./OccurrenceRow.js";
import { branchNumberOf, clusterMetaText, groupSignals, phaseFilterView, phaseMetaText, phaseStepRows, } from "./panel-model.js";
import css from './panel.module.css';
/**
 * One phase of the path. In itemized mode a step that owns a single record is
 * drawn as that record (the step number folds into the meta line); everything
 * else keeps a quiet step header with the records indented under it. In grouped
 * mode records are clustered by the aggregation projection and model stages get
 * one collapsed summary per phase.
 *
 * Memoized with a comparator that ignores `now` and the callbacks: the phase
 * owns its live clock, and only the running phase subscribes to it.
 */
export const PhaseSection = memo(function PhaseSection({ group, isNow, running, lastItemId, selectedGroup, selectedItemId, mode, open, disclosure, filter, onToggle, onToggleLayer, onToggleReasoning, onSelectItem, }) {
    const now = useLiveClock(isNow && running);
    const state = overviewStateOf(group.status, isNow);
    const duration = formatDuration(groupElapsedMs(group, isNow && running, now));
    const filterView = useMemo(() => phaseFilterView(group, filter), [group, filter]);
    const filterActive = filterView.visibleItemIds !== null;
    const rows = useMemo(() => phaseStepRows(group, filterView.visibleItemIds), [group, filterView.visibleItemIds]);
    // Grouped mode is the only reader of these two projections. Itemized mode
    // used to compute both and throw them away on every live tick, which is real
    // work: clustering walks every item of the phase and the model filter walks
    // every step.
    const grouped = mode === 'grouped';
    const clusters = useMemo(() => {
        if (!grouped)
            return [];
        const sourceItems = group.items.filter(item => item.source !== 'model');
        const visible = filterView.visibleItemIds;
        return clusterWorkItems(visible === null ? sourceItems : sourceItems.filter(item => visible.has(item.id)));
    }, [grouped, group, filterView.visibleItemIds]);
    const modelSteps = useMemo(() => (grouped && filterView.visibleItemIds === null
        ? group.steps.filter((step) => step.model !== null)
        : []), [grouped, group, filterView.visibleItemIds]);
    const occurrenceNumbers = useMemo(() => new Map(group.items.map((item, index) => [item.id, index + 1])), [group]);
    const sourceSteps = useMemo(() => {
        const map = new Map();
        for (const step of group.steps)
            for (const item of step.items)
                if (!map.has(item.id))
                    map.set(item.id, step);
        return map;
    }, [group]);
    const groupedModelsKey = `${group.id}:model-list`;
    const groupedModelsOpen = layerDisclosureOpen(disclosure, 'model', groupedModelsKey);
    const phaseMeta = phaseMetaText(group, duration);
    // A filter is a reading intent: matching rows must be on screen without
    // another click, so the phase opens itself while the path is narrowed. An
    // explicit toggle still wins in both directions, otherwise the header's
    // chevron would look broken for as long as the filter stays on.
    const effectiveOpen = layerDisclosureOverride(disclosure, 'phase', group.id)
        ?? (open || (filterActive && !filterView.matchesNothing));
    if (filterView.matchesNothing)
        return null;
    return (_jsxs("section", { className: css.phase, "data-phase": group.phase, "data-selected": selectedGroup ? '' : undefined, "data-now": isNow ? '' : undefined, "data-overview-state": state, "aria-label": `${group.title}，${phaseMeta}，${OVERVIEW_STATE_LABEL[state]}`, children: [_jsx("header", { className: css.phaseHeader, children: _jsxs("button", { type: "button", className: css.phaseToggle, "aria-expanded": effectiveOpen, "aria-controls": `watcher-phase-body-${group.id}`, "aria-label": `${group.title}，${phaseMeta}，${effectiveOpen ? '收起阶段' : '展开阶段'}`, onClick: onToggle, children: [_jsx(IconChevronRightOutlineRegular, { size: 12, className: css.phaseChevron }), _jsx("span", { className: css.phaseMarker, "data-state": state, "aria-hidden": "true" }), _jsx("span", { className: css.phaseTitle, "data-watcher-group-title": "", children: group.title }), groupSignals(group).map(signal => (_jsx("span", { className: css.phaseSignal, children: signal.label }, signal.kind))), state === 'waiting' || state === 'interrupted' || state === 'partial'
                            ? _jsx("span", { className: css.stateTag, "data-state": state, children: OVERVIEW_STATE_LABEL[state] })
                            : null, _jsx("span", { className: css.phaseMeta, children: phaseMeta })] }) }), effectiveOpen ? (_jsx("div", { id: `watcher-phase-body-${group.id}`, className: css.phaseBody, children: mode === 'itemized' ? (_jsx("div", { className: css.stepList, "data-observation-mode": "itemized", children: rows.map(({ step, entries, flat }) => {
                        if (flat) {
                            const entry = entries[0];
                            if (entry === undefined || entry.kind !== 'occurrence')
                                return null;
                            const item = entry.item;
                            const live = isNow && running && item.id === lastItemId && item.status === 'running';
                            return (_jsx(OccurrenceRow, { item: item, index: occurrenceNumbers.get(item.id) ?? 0, branch: null, stepNumber: step.step, live: live, selected: selectedGroup && selectedItemId === item.id, now: now, indent: false, onSelect: () => onSelectItem(item) }, step.id));
                        }
                        const stepLive = isNow && running
                            && step.items.some(item => item.id === lastItemId && item.status === 'running');
                        const stepDuration = formatDuration(stepElapsedMs(step, stepLive, now));
                        const stepOpen = layerDisclosureOpen(disclosure, 'step', step.id);
                        const modelOpen = layerDisclosureOpen(disclosure, 'model', step.id);
                        return (_jsxs("section", { className: css.step, "data-current": stepLive ? '' : undefined, "data-parallel": step.parallel ? '' : undefined, children: [_jsxs("button", { type: "button", className: css.stepToggle, "aria-expanded": stepOpen, "aria-controls": `watcher-step-body-${step.id}`, "aria-label": `步骤 ${step.step || '—'}，${step.executionCount} 次执行${stepDuration === null ? '' : `，耗时 ${stepDuration}`}，${stepOpen ? '收起步骤' : '展开步骤'}`, onClick: () => onToggleLayer('step', step.id), children: [_jsx(IconChevronRightOutlineRegular, { size: 11, className: css.stepChevron }), _jsxs("span", { className: css.stepLabel, children: ["\u6B65\u9AA4 ", step.step || '—'] }), _jsxs("span", { className: css.stepSignals, children: [_jsxs("span", { children: [step.executionCount, " \u6B21"] }), step.parallel ? _jsxs("span", { children: [step.executionCount, " \u9879\u5E76\u884C"] }) : null, stepDuration === null ? null : _jsx("span", { children: stepDuration })] })] }), stepOpen ? (_jsx("div", { id: `watcher-step-body-${step.id}`, className: css.stepBody, children: entries.map(entry => (entry.kind === 'model'
                                        ? (_jsx(ModelStage, { trace: entry.trace, stepId: step.id, now: now, open: modelOpen, disclosure: disclosure, onToggle: () => onToggleLayer('model', step.id), onToggleReasoning: key => onToggleReasoning(key, step.id) }, `model:${step.id}`))
                                        : (_jsx(OccurrenceRow, { item: entry.item, index: occurrenceNumbers.get(entry.item.id) ?? 0, branch: step.parallel ? entry.occurrenceIndex + 1 : null, stepNumber: null, live: stepLive && entry.item.id === lastItemId && entry.item.status === 'running', selected: selectedGroup && selectedItemId === entry.item.id, now: now, indent: true, onSelect: () => onSelectItem(entry.item) }, entry.item.id)))) })) : null] }, step.id));
                    }) })) : (_jsxs("div", { className: css.clusterList, "data-observation-mode": "grouped", children: [modelSteps.length === 0
                            ? null
                            : (_jsxs("section", { className: css.modelSummary, "data-open": groupedModelsOpen ? '' : undefined, children: [_jsxs("button", { type: "button", className: css.modelSummaryToggle, "aria-expanded": groupedModelsOpen, "aria-controls": `watcher-grouped-models-${group.id}`, onClick: () => onToggleLayer('model', groupedModelsKey), children: [_jsx(IconChevronRightOutlineRegular, { size: 11, className: css.modelSummaryChevron }), _jsx("span", { children: "\u6A21\u578B\u9636\u6BB5\u6C47\u603B" }), _jsxs("span", { className: css.modelSummaryMeta, children: [modelSteps.length, " \u4E2A Step \u00B7 \u6309 Step \u4FDD\u7559\uFF0C\u4E0D\u5408\u5E76\u63A8\u7406"] })] }), groupedModelsOpen ? (_jsx("div", { id: `watcher-grouped-models-${group.id}`, className: css.modelSummaryList, children: modelSteps.map(step => {
                                            const modelOpen = layerDisclosureOpen(disclosure, 'model', step.id);
                                            return (_jsxs("div", { className: css.modelSummaryStep, children: [_jsxs("span", { className: css.modelSummaryStepLabel, children: ["\u6B65\u9AA4 ", step.step || '—'] }), _jsx(ModelStage, { trace: step.model, stepId: `${step.id}:grouped`, now: now, open: modelOpen, disclosure: disclosure, onToggle: () => onToggleLayer('model', step.id), onToggleReasoning: key => onToggleReasoning(key, step.id) })] }, step.id));
                                        }) })) : null] })), clusters.map(cluster => {
                            if (cluster.executionCount === 1) {
                                const item = cluster.items[0];
                                const sourceStep = sourceSteps.get(item.id);
                                const live = isNow && running && item.id === lastItemId && item.status === 'running';
                                return (_jsx(OccurrenceRow, { item: item, index: occurrenceNumbers.get(item.id) ?? 0, branch: sourceStep === undefined ? null : branchNumberOf(sourceStep, item), stepNumber: item.step, live: live, selected: selectedGroup && selectedItemId === item.id, now: now, indent: false, onSelect: () => onSelectItem(item) }, cluster.id));
                            }
                            const clusterOpen = layerDisclosureOpen(disclosure, 'cluster', cluster.id);
                            const clusterMeta = clusterMetaText(cluster);
                            return (_jsxs("section", { className: css.cluster, "data-open": clusterOpen ? '' : undefined, children: [_jsxs("button", { type: "button", className: css.clusterToggle, "aria-expanded": clusterOpen, "aria-controls": `watcher-cluster-body-${cluster.id}`, "aria-label": `${cluster.title}，${clusterMeta}，${clusterOpen ? '收起同类执行' : '展开同类执行'}`, onClick: () => onToggleLayer('cluster', cluster.id), children: [_jsx(IconChevronRightOutlineRegular, { size: 11, className: css.clusterChevron }), _jsx("span", { className: css.clusterDot, "aria-hidden": "true", children: _jsx(StatusMark, { status: cluster.latestStatus }) }), _jsx("span", { className: css.clusterTitle, children: cluster.title }), _jsx("span", { className: css.clusterMeta, children: clusterMeta }), _jsxs("span", { className: css.clusterCount, children: ["\u00D7", cluster.executionCount] })] }), clusterOpen ? (_jsx("div", { id: `watcher-cluster-body-${cluster.id}`, className: css.clusterBody, children: cluster.items.map(item => {
                                            const sourceStep = sourceSteps.get(item.id);
                                            return (_jsx(OccurrenceRow, { item: item, index: occurrenceNumbers.get(item.id) ?? 0, branch: sourceStep === undefined ? null : branchNumberOf(sourceStep, item), stepNumber: item.step, live: isNow && running && item.id === lastItemId && item.status === 'running', selected: selectedGroup && selectedItemId === item.id, now: now, indent: true, onSelect: () => onSelectItem(item) }, item.id));
                                        }) })) : null] }, cluster.id));
                        })] })) })) : null] }));
}, (prev, next) => prev.group === next.group
    && prev.isNow === next.isNow
    && prev.running === next.running
    && prev.lastItemId === next.lastItemId
    && prev.selectedGroup === next.selectedGroup
    && prev.selectedItemId === next.selectedItemId
    && prev.mode === next.mode
    && prev.open === next.open
    && prev.disclosure === next.disclosure
    && prev.filter === next.filter);
//# sourceMappingURL=PhaseSection.js.map
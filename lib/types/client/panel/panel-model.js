import { clusterOutcomeSummary } from "../../hub/aggregation.js";
import { itemPattern } from "../display.js";
import { groupTitleMatches, itemMatchesFilter, pathFilterActive } from "../path-filter.js";
import { stepTimelineEntries } from "../step-timeline.js";
const UNFILTERED = {
    active: false,
    titleMatch: false,
    visibleItemIds: null,
    matchesNothing: false,
};
export function phaseFilterView(group, filter) {
    if (!pathFilterActive(filter))
        return UNFILTERED;
    const titleMatch = groupTitleMatches(group, filter);
    const visibleItemIds = new Set();
    for (const item of group.items) {
        // Model stages carry no title a query could name; they leave the path while
        // a filter is active instead of pretending to be a match.
        if (item.source === 'model')
            continue;
        if (titleMatch || itemMatchesFilter(item, filter))
            visibleItemIds.add(item.id);
    }
    return { active: true, titleMatch, visibleItemIds, matchesNothing: !titleMatch && visibleItemIds.size === 0 };
}
export function phaseStepRows(group, visibleItemIds) {
    const rows = [];
    for (const step of group.steps) {
        const base = stepTimelineEntries(step);
        const entries = visibleItemIds === null
            ? base
            : base.filter(entry => entry.kind === 'occurrence' && visibleItemIds.has(entry.item.id));
        if (entries.length === 0)
            continue;
        const only = entries[0];
        rows.push({ step, entries, flat: entries.length === 1 && only !== undefined && only.kind === 'occurrence' });
    }
    return rows;
}
export function branchNumberOf(step, item) {
    if (!step.parallel)
        return null;
    const index = step.items.findIndex(candidate => candidate.id === item.id);
    return index < 0 ? null : index + 1;
}
export function itemMetaText(item, options = {}) {
    const { branch = null, stepNumber = null } = options;
    return [
        stepNumber === null ? null : `步骤 ${stepNumber || '—'}`,
        item.toolName ?? item.source,
        branch === null ? null : `分支 ${branch}`,
        itemPattern(item),
    ].filter((part) => part !== null && part !== '').join(' · ');
}
export function groupSignals(group) {
    const signals = [];
    if (group.parallelStepCount > 0) {
        signals.push({ kind: 'parallel', label: group.parallelStepCount === 1 ? '并行' : `并行 ${group.parallelStepCount} 组` });
    }
    if (group.retryCount > 0)
        signals.push({ kind: 'retry', label: `重试 ${group.retryCount}` });
    if (group.iterationCount > 0)
        signals.push({ kind: 'iteration', label: `迭代 ${group.iterationCount}` });
    return signals;
}
export function phaseMetaText(group, duration) {
    return [`${group.steps.length} 步`, `${group.executionCount} 次`, duration]
        .filter((part) => part !== null && part !== '')
        .join(' · ');
}
export function clusterBasisLabel(cluster) {
    if (cluster.executionCount < 2)
        return null;
    if (cluster.basis === 'mutable-target' || cluster.basis === 'shared-target')
        return '同一目标';
    if (cluster.basis === 'exact-call')
        return '同一指令';
    return null;
}
export function clusterMetaText(cluster) {
    return [
        clusterBasisLabel(cluster),
        `${cluster.executionCount} 次执行`,
        `${cluster.stepCount} 个步骤`,
        clusterOutcomeSummary(cluster),
    ].filter((part) => part !== null && part !== '').join(' · ');
}
/** Overview states that should surface as a text tag, not only as a colour. */
export function showStateTag(state) {
    return state === 'waiting' || state === 'failure' || state === 'interrupted' || state === 'partial';
}
//# sourceMappingURL=panel-model.js.map
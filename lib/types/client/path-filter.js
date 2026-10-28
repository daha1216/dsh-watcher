export const EMPTY_PATH_FILTER = { query: '', status: 'all' };
export function pathFilterActive(filter) {
    return filter.query.trim() !== '' || filter.status !== 'all';
}
function statusMatches(status, item) {
    if (status === 'all')
        return true;
    if (status === 'issues')
        return item.status === 'failure' || item.status === 'interrupted';
    return item.status === 'waiting';
}
/**
 * Model stages carry no title of their own, so they are only kept by an
 * unfiltered path; a narrowed path shows the records the query actually names.
 */
export function itemMatchesFilter(item, filter) {
    if (item.source === 'model')
        return false;
    if (!statusMatches(filter.status, item))
        return false;
    const query = filter.query.trim().toLowerCase();
    if (query === '')
        return true;
    return [item.title, item.subtitle, item.toolName ?? '', item.source]
        .join('\n')
        .toLowerCase()
        .includes(query);
}
/** A phase title is itself a match, so a phase named by the query keeps its rows. */
export function groupTitleMatches(group, filter) {
    const query = filter.query.trim().toLowerCase();
    return query !== '' && filter.status === 'all' && group.title.toLowerCase().includes(query);
}
export function groupMatchesFilter(group, filter) {
    return groupTitleMatches(group, filter) || group.items.some(item => itemMatchesFilter(item, filter));
}
//# sourceMappingURL=path-filter.js.map
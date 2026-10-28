import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { DiffBlock, IconCheckOutlineRegular, IconChevronLeftOutlineRegular, IconChevronRightOutlineRegular, IconCopyOutlineRegular, JsonTree, MarkdownText, ReadBlock, TerminalBlock, writeClipboard, } from '@deepseek-ai/dsh-client-ui-primitives';
import { groupElapsedMs, itemElapsedMs } from "../observation/performance.js";
import css from './Watcher.module.css';
import { DIFF_LABELS, JSON_LABELS, MARKDOWN_LABELS, READ_LABELS, STATUS_LABEL, TERMINAL_LABELS, } from "./labels.js";
import { formatDuration, isJsonValue, itemPattern, rawOf, safeMarkdown } from "./display.js";
import { StatusMark } from "./StatusMark.js";
function CopyRawButton({ text }) {
    const [copied, setCopied] = useState(false);
    const timerRef = useRef(null);
    useEffect(() => () => {
        if (timerRef.current !== null)
            clearTimeout(timerRef.current);
    }, []);
    const copy = () => {
        void writeClipboard(text).then((ok) => {
            if (!ok)
                return;
            setCopied(true);
            if (timerRef.current !== null)
                clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => setCopied(false), 1500);
        });
    };
    return (_jsxs("button", { type: "button", className: css.copyRaw, onClick: copy, "aria-label": copied ? '原始数据已复制' : '复制原始数据', children: [copied ? _jsx(IconCheckOutlineRegular, { size: 14 }) : _jsx(IconCopyOutlineRegular, { size: 14 }), copied ? '已复制' : '复制'] }));
}
function ResultPresentation({ presentation }) {
    switch (presentation.kind) {
        case 'terminal':
            return (_jsx(TerminalBlock, { command: presentation.command, cwd: presentation.cwd ?? undefined, output: presentation.output, exitCode: presentation.exitCode ?? undefined, signal: presentation.signal ?? undefined, running: presentation.running, maxLines: 18, labels: TERMINAL_LABELS }));
        case 'read':
            return (_jsx(ReadBlock, { label: presentation.label, lang: presentation.lang ?? undefined, lines: presentation.lines, totalLines: presentation.totalLines, maxLines: 18, labels: READ_LABELS }));
        case 'diff':
            return _jsx(DiffBlock, { diffs: presentation.diffs, maxLines: 18, labels: DIFF_LABELS });
        case 'json':
            return _jsx("div", { className: css.jsonSurface, children: _jsx(JsonTree, { data: presentation.data, label: "\u7ED3\u6784\u5316\u7ED3\u679C", labels: JSON_LABELS }) });
        case 'text':
            return (_jsx("article", { className: css.documentResult, "data-watcher-document": "", children: _jsx(MarkdownText, { text: safeMarkdown(presentation.text), labels: MARKDOWN_LABELS }) }));
        case 'image':
            return (_jsxs("div", { className: css.artifactResult, children: [_jsx("div", { className: css.artifactGlyph, "aria-hidden": "true", children: "\u25A7" }), _jsx("strong", { children: "\u56FE\u7247\u9644\u4EF6" }), _jsx("span", { children: "\u9644\u4EF6\u5DF2\u4FDD\u7559\u5728\u672C\u6B21\u4F1A\u8BDD\u8BB0\u5F55\u4E2D" }), isJsonValue(presentation.attachment)
                        ? _jsx("div", { className: css.jsonSurface, children: _jsx(JsonTree, { data: presentation.attachment, label: "\u56FE\u7247\u9644\u4EF6\u4FE1\u606F", labels: JSON_LABELS }) })
                        : null] }));
        case 'empty':
            return _jsx("div", { className: css.detailEmpty, children: "\u8FD9\u6B21\u6267\u884C\u8FD8\u6CA1\u6709\u53EF\u663E\u793A\u7684\u7ED3\u679C" });
    }
}
function preferredItem(group) {
    return group.items.find(item => item.status === 'failure' && item.recoveredBy === null)
        ?? group.items.find(item => item.status === 'waiting' || item.status === 'running')
        ?? group.items.at(-1)
        ?? null;
}
function groupStatusLabel(group) {
    return group.status === 'failure' ? '含失败记录' : STATUS_LABEL[group.status];
}
export function ExecutionInspector({ group, selectedItemId, live, now, closing, position, onStep, onBack, onExited, }) {
    const [tab, setTab] = useState('result');
    const fallback = preferredItem(group);
    const selected = group.items.find(item => item.id === selectedItemId) ?? fallback;
    useEffect(() => setTab('result'), [group.id, selected?.id]);
    if (selected === null)
        return null;
    const duration = formatDuration(itemElapsedMs(selected, live && selected.status === 'running', now));
    const groupDuration = formatDuration(groupElapsedMs(group, live, now));
    const raw = tab === 'raw' ? rawOf(selected) : '';
    const hasInput = Object.keys(selected.args).length > 0;
    const pattern = itemPattern(selected);
    return (_jsxs("aside", { className: css.inspector, "aria-label": `${group.title} 的执行详情`, "data-ud-check": "watcher-inspector", "data-ud-role": "panel", "data-closing": closing ? '' : undefined, onAnimationEnd: closing
            ? event => {
                // Nested result animations bubble their own events; only the collapse
                // on this element finishes the exit.
                if (event.target === event.currentTarget)
                    onExited();
            }
            : undefined, children: [_jsxs("header", { className: css.inspectorHeader, children: [_jsxs("div", { className: css.inspectorLocator, children: [_jsxs("button", { type: "button", className: css.inspectorBack, onClick: onBack, "aria-label": "\u8FD4\u56DE\u5DE5\u4F5C\u8DEF\u5F84", title: "\u8FD4\u56DE\u5DE5\u4F5C\u8DEF\u5F84", children: [_jsx(IconChevronRightOutlineRegular, { size: 13, "aria-hidden": "true" }), "\u5DE5\u4F5C\u8DEF\u5F84"] }), _jsxs("div", { className: css.recordStepper, role: "group", "aria-label": "\u6267\u884C\u8BB0\u5F55\u5207\u6362", children: [_jsx("button", { type: "button", className: css.recordStepButton, onClick: () => onStep(-1), disabled: position.index <= 0, "aria-label": "\u4E0A\u4E00\u6761\u8BB0\u5F55", title: "\u4E0A\u4E00\u6761\u8BB0\u5F55", children: _jsx(IconChevronLeftOutlineRegular, { size: 14, "aria-hidden": "true" }) }), _jsxs("span", { className: css.recordPosition, "aria-live": "polite", children: ["\u8BB0\u5F55 ", position.index + 1, "/", position.total] }), _jsx("button", { type: "button", className: css.recordStepButton, onClick: () => onStep(1), disabled: position.index >= position.total - 1, "aria-label": "\u4E0B\u4E00\u6761\u8BB0\u5F55", title: "\u4E0B\u4E00\u6761\u8BB0\u5F55", children: _jsx(IconChevronRightOutlineRegular, { size: 14, "aria-hidden": "true" }) })] })] }), _jsxs("div", { className: css.statusLine, "data-status": group.status, children: [_jsx(StatusMark, { status: group.status }), _jsx("span", { children: groupStatusLabel(group) }), _jsxs("span", { className: css.location, children: ["\u5BF9\u8BDD\u8F6E\u6B21 ", group.turn || '—', " \u00B7 ", group.steps.length, " \u4E2A\u6B65\u9AA4", groupDuration === null ? '' : ` · ${groupDuration}`] })] }), _jsx("h2", { className: css.inspectorTitle, children: group.title }), _jsx("p", { className: css.inspectorSummary, children: group.subtitle }), _jsxs("div", { className: css.groupSignals, "aria-label": "\u5DE5\u4F5C\u6A21\u5F0F", children: [group.parallelStepCount > 0 ? _jsxs("span", { children: ["\u5E76\u884C ", group.parallelStepCount, " \u6B21"] }) : null, group.retryCount > 0 ? _jsxs("span", { "data-retry": "", children: ["\u91CD\u8BD5 ", group.retryCount, " \u6B21"] }) : null, group.iterationCount > 0 ? _jsxs("span", { children: ["\u6709 ", group.iterationCount, " \u6B21\u8FED\u4EE3"] }) : null, group.unconfirmedFailureCount > 0 ? _jsxs("span", { "data-error": "", children: [group.unconfirmedFailureCount, " \u6761\u5931\u8D25\u540E\u672A\u89C1\u6210\u529F\u8BC1\u636E"] }) : null] })] }), _jsx("div", { className: css.inspectorBody, children: _jsxs("section", { className: css.detailSection, "aria-labelledby": `detail-title-${selected.id}`, children: [_jsxs("div", { className: css.detailHeader, children: [_jsxs("div", { className: css.detailIdentity, children: [_jsxs("div", { className: css.detailStatus, "data-status": selected.status, children: [_jsx(StatusMark, { status: selected.status }), _jsx("span", { children: STATUS_LABEL[selected.status] }), pattern === null ? null : _jsx("span", { className: css.patternLabel, children: pattern })] }), _jsx("h3", { id: `detail-title-${selected.id}`, children: selected.title }), _jsx("p", { title: selected.subtitle, children: selected.subtitle || '没有补充说明' })] }), _jsxs("dl", { className: css.metrics, children: [duration === null ? null : _jsxs(_Fragment, { children: [_jsx("dt", { children: "\u8017\u65F6" }), _jsx("dd", { children: duration })] }), selected.exitCode === null ? null : _jsxs(_Fragment, { children: [_jsx("dt", { children: "\u9000\u51FA\u7801" }), _jsx("dd", { "data-error": selected.exitCode === 0 ? undefined : '', children: selected.exitCode })] }), selected.signal === null ? null : _jsxs(_Fragment, { children: [_jsx("dt", { children: "\u4FE1\u53F7" }), _jsx("dd", { "data-error": "", children: selected.signal })] })] })] }), _jsx("div", { className: css.tabs, role: "tablist", "aria-label": "\u6267\u884C\u6570\u636E", children: [
                                ['result', '结果'],
                                ['input', '输入'],
                                ['raw', '原始'],
                            ].map(([id, label]) => (_jsx("button", { id: `inspector-tab-${id}`, type: "button", role: "tab", "aria-selected": tab === id, "aria-controls": `inspector-tabpanel-${id}`, tabIndex: tab === id ? 0 : -1, className: css.tab, "data-active": tab === id ? '' : undefined, onClick: () => setTab(id), children: label }, id))) }), _jsxs("div", { id: `inspector-tabpanel-${tab}`, className: css.tabPanel, role: "tabpanel", "aria-labelledby": `inspector-tab-${tab}`, children: [tab === 'result' ? _jsx(ResultPresentation, { presentation: selected.presentation }) : null, tab === 'input'
                                    ? hasInput
                                        ? _jsx("div", { className: css.jsonSurface, children: _jsx(JsonTree, { data: selected.args, label: "\u6267\u884C\u8F93\u5165", labels: JSON_LABELS }) })
                                        : _jsx("div", { className: css.detailEmpty, children: "\u8FD9\u6761\u8BB0\u5F55\u6CA1\u6709\u5DE5\u5177\u8F93\u5165" })
                                    : null, tab === 'raw'
                                    ? (_jsxs("div", { className: css.rawPanel, children: [_jsxs("div", { className: css.rawToolbar, children: [_jsx("span", { children: "\u5B8C\u6574\u539F\u59CB\u6570\u636E \u00B7 \u4E0D\u622A\u65AD" }), _jsx(CopyRawButton, { text: raw })] }), _jsx("pre", { children: raw || '没有原始数据' })] }))
                                    : null] })] }) }), _jsx("footer", { className: css.inspectorFooter, children: "\u53EA\u8BFB\u89C2\u5BDF \u00B7 \u4E0D\u4F1A\u6539\u53D8 Agent" })] }));
}
//# sourceMappingURL=Inspector.js.map
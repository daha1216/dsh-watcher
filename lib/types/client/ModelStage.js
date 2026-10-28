import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconChevronRightOutlineRegular, MarkdownText } from '@deepseek-ai/dsh-client-ui-primitives';
import { hasReasoningEvidence, modelStageMetrics } from "../observation/model-trace.js";
import { layerDisclosureOpen } from "./disclosure-depth.js";
import css from './Watcher.module.css';
import { MARKDOWN_LABELS } from "./labels.js";
import { formatDuration, safeMarkdown } from "./display.js";
function reasoningAttemptDuration(attempt, now) {
    if (attempt.firstReasoningTime === null || attempt.lastReasoningTime === null)
        return null;
    const end = attempt.kind === 'running' && attempt.firstOutputTime === null
        ? now
        : attempt.lastReasoningTime;
    return Math.max(0, end - attempt.firstReasoningTime);
}
function reasoningAttemptState(attempt) {
    if (attempt.kind === 'running')
        return '生成中';
    if (attempt.kind === 'retried')
        return '已重试';
    if (attempt.kind === 'interrupted')
        return '已中断';
    return '已完成';
}
export function ModelStage({ trace, stepId, now, open, disclosure, onToggle, onToggleReasoning, }) {
    const metrics = modelStageMetrics(trace, now);
    const hasReasoning = hasReasoningEvidence(trace);
    const total = formatDuration(metrics.totalMs);
    const visibleReasoning = formatDuration(metrics.visibleReasoningMs);
    const reasoningAttempts = trace.attempts.filter(attempt => attempt.reasoningText.trim() !== '');
    const summary = [
        total === null ? '时间不完整' : `模型 ${total}`,
        hasReasoning
            ? visibleReasoning === null ? '可见推理已记录' : `可见推理 ${visibleReasoning}`
            : null,
        trace.reasoningTokens === null ? null : `${trace.reasoningTokens.toLocaleString('zh-CN')} 推理 token`,
        metrics.live ? '进行中' : null,
    ].filter((value) => value !== null).join(' · ');
    const segments = [
        {
            key: 'wait',
            label: '首响应等待',
            durationMs: metrics.firstResponseMs,
            unavailableLabel: '时间戳不可用',
        },
        {
            key: 'reasoning',
            label: '可见推理',
            durationMs: metrics.visibleReasoningMs,
            unavailableLabel: hasReasoning ? '分段耗时不可用' : '未记录',
        },
        {
            key: 'output',
            label: '输出 / 工具意图',
            durationMs: metrics.outputMs,
            unavailableLabel: '时间戳不可用',
        },
        ...metrics.unattributedMs !== null && metrics.unattributedMs > 0
            ? [{
                    key: 'unattributed',
                    label: '重试 / 未归因',
                    durationMs: metrics.unattributedMs,
                    unavailableLabel: '不可用',
                }]
            : [],
    ];
    const measuredSegments = segments.filter((segment) => (segment.durationMs !== null && segment.durationMs > 0));
    const bodyId = `watcher-model-stage-${stepId}`;
    return (_jsxs("section", { className: css.modelStage, "data-live": metrics.live ? '' : undefined, children: [_jsxs("button", { type: "button", className: css.modelStageToggle, "aria-expanded": open, "aria-controls": bodyId, title: "\u6A21\u578B\u9636\u6BB5\u53EA\u4F7F\u7528 DSH \u4F1A\u8BDD\u4E2D\u4F9B\u5E94\u5546\u516C\u5F00\u5199\u5165\u7684\u4E8B\u4EF6", onClick: onToggle, children: [_jsx(IconChevronRightOutlineRegular, { size: 11, className: css.modelStageChevron }), _jsx("span", { className: css.modelStageGlyph, "aria-hidden": "true" }), _jsxs("span", { className: css.modelStageCopy, children: [_jsx("span", { className: css.modelStageTitle, children: "\u6A21\u578B\u9636\u6BB5" }), _jsx("span", { className: css.modelStageSummary, children: summary })] })] }), open ? (_jsxs("div", { id: bodyId, className: css.modelStageBody, children: [measuredSegments.length === 0
                        ? null
                        : (_jsx("div", { className: css.modelStageBar, "aria-label": "\u6A21\u578B\u9636\u6BB5\u8017\u65F6\u6BD4\u4F8B", children: measuredSegments.map(segment => (_jsx("span", { "data-segment": segment.key, style: { flexGrow: Math.max(segment.durationMs, 1) }, title: `${segment.label} ${formatDuration(segment.durationMs) ?? ''}` }, segment.key))) })), _jsx("dl", { className: css.modelStageLedger, children: segments.map(segment => (_jsxs("div", { className: css.modelStageMetric, children: [_jsxs("dt", { children: [_jsx("span", { className: css.modelStageSwatch, "data-segment": segment.key, "aria-hidden": "true" }), segment.label] }), _jsx("dd", { children: formatDuration(segment.durationMs) ?? segment.unavailableLabel })] }, segment.key))) }), reasoningAttempts.length === 0
                        ? _jsx("p", { className: css.modelStageNote, children: "\u672C Step \u6CA1\u6709\u4F9B\u5E94\u5546\u53EF\u89C1\u63A8\u7406\u8BB0\u5F55" })
                        : (_jsxs("div", { className: css.reasoningAttempts, children: [_jsx("p", { className: css.modelStageNote, children: "\u4EC5\u5C55\u793A\u4F9B\u5E94\u5546\u5199\u5165 DSH \u4F1A\u8BDD\u7684\u53EF\u89C1 reasoning\uFF1B\u4E0D\u8865\u5199\u672A\u8BB0\u5F55\u5185\u5BB9\u3002" }), reasoningAttempts.map(attempt => {
                                    const key = `${stepId}:attempt:${attempt.attempt}`;
                                    const reasoningOpen = layerDisclosureOpen(disclosure, 'reasoning', key);
                                    const duration = formatDuration(reasoningAttemptDuration(attempt, now));
                                    const meta = [
                                        reasoningAttemptState(attempt),
                                        duration ?? '分段耗时不可用',
                                        `${attempt.fragments.length} 个流片段`,
                                        attempt.kind === 'retried' ? `等待重试 ${formatDuration(attempt.retryDelayMs) ?? '—'}` : null,
                                    ].filter((value) => value !== null).join(' · ');
                                    return (_jsxs("section", { className: css.reasoningDisclosure, "data-open": reasoningOpen ? '' : undefined, children: [_jsxs("button", { type: "button", className: css.reasoningToggle, "aria-expanded": reasoningOpen, "aria-controls": `watcher-reasoning-${key}`, onClick: () => onToggleReasoning(key), children: [_jsx(IconChevronRightOutlineRegular, { size: 11, className: css.reasoningChevron }), _jsx("span", { className: css.reasoningLabel, children: reasoningAttempts.length === 1 ? '推理记录' : `尝试 ${attempt.attempt}` }), _jsx("span", { className: css.reasoningMeta, children: meta })] }), reasoningOpen ? (_jsx("article", { id: `watcher-reasoning-${key}`, className: css.reasoningBody, children: _jsx(MarkdownText, { text: safeMarkdown(attempt.reasoningText), labels: MARKDOWN_LABELS }) })) : null] }, key));
                                })] }))] })) : null] }));
}
//# sourceMappingURL=ModelStage.js.map
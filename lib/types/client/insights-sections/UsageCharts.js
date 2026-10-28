import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import css from '../Insights.module.css';
import { SegmentedToggle } from "../ui/SegmentedToggle.js";
import { ChartTooltip, computeStackedLineChart, dayLabel, fmtCompact } from "../insights-shared.js";
/** Donut split plus the daily activity chart with its two hover readouts. */
export function UsageCharts({ analytics, range, viewMode, setCustomViewMode }) {
    const [hoveredModel, setHoveredModel] = useState(null);
    const [hoveredDayIdx, setHoveredDayIdx] = useState(null);
    const [hoveredDayAnchor, setHoveredDayAnchor] = useState(null);
    const [hoveredLineIdx, setHoveredLineIdx] = useState(null);
    const [hoveredLineAnchor, setHoveredLineAnchor] = useState(null);
    const activeSeg = hoveredModel !== null
        ? analytics?.donutSegments.find(seg => seg.model === hoveredModel) ?? null
        : null;
    const topModel = analytics?.donutSegments[0];
    // The stacked spline is stable per analytics; hover moves must not rebuild it.
    const lineData = useMemo(() => (analytics && analytics.daySeries.length > 0
        ? computeStackedLineChart(analytics.daySeries, analytics.activeRangeModels, 560, 160)
        : null), [analytics]);
    const activeViewMode = viewMode;
    return (_jsx(_Fragment, { children: _jsxs("div", { className: css.vizSplitGrid, children: [_jsxs("div", { className: css.vizPanel, children: [_jsxs("div", { className: css.vizHead, children: [_jsx("span", { className: css.vizTitle, children: "\u6A21\u578B\u652F\u51FA\u4EFD\u989D" }), _jsx("span", { className: css.vizSub, children: "\u6309\u6D88\u8017 Token \u964D\u5E8F\u6392\u5217" })] }), _jsxs("div", { className: css.donutWrap, children: [_jsxs("div", { className: css.donutSvgBox, children: [_jsxs("svg", { viewBox: "0 0 100 100", className: css.donutSvg, children: [_jsx("circle", { cx: "50", cy: "50", r: "38", fill: "none", stroke: "var(--ui-surface-raised)", strokeWidth: "12" }), _jsx("g", { transform: "rotate(-90 50 50)", children: (analytics?.donutSegments.length ?? 0) === 1 ? (_jsx("circle", { cx: "50", cy: "50", r: "38", fill: "none", stroke: analytics.donutSegments[0].color, strokeWidth: "12" })) : (analytics?.donutSegments.map((seg) => (_jsx("circle", { cx: "50", cy: "50", r: "38", fill: "none", stroke: seg.color, strokeWidth: "12", strokeDasharray: seg.dasharray, strokeDashoffset: seg.dashoffset }, seg.model)))) })] }), _jsxs("div", { className: css.donutCenterText, children: [_jsx("div", { className: css.donutCenterNum, children: activeSeg ? `${activeSeg.pct}%` : topModel ? `${topModel.pct}%` : `${analytics?.donutSegments.length ?? 0}款` }), _jsx("div", { className: css.donutCenterSub, children: activeSeg ? '选中占比' : '主力占比' })] })] }), _jsx("div", { className: css.donutLegendList, children: analytics?.donutSegments.map((seg) => (_jsxs("div", { className: `${css.donutLegendRow} ${hoveredModel === seg.model ? css.donutLegendRowActive : ''}`, onMouseEnter: () => setHoveredModel(seg.model), onMouseLeave: () => setHoveredModel(null), children: [_jsxs("span", { className: css.dlLeft, children: [_jsx("i", { className: css.dlDot, style: { background: seg.color } }), _jsx("span", { className: css.dlName, title: seg.model, children: seg.model })] }), _jsxs("span", { className: css.dlRight, children: [fmtCompact(seg.tokens), " \u00B7 ", seg.pct, "%"] })] }, seg.model))) })] }), (activeSeg || topModel) ? (_jsxs("div", { className: css.donutInspectBar, children: [_jsx("i", { className: css.dlDot, style: { background: (activeSeg || topModel)?.color } }), _jsx("span", { className: css.donutInspectName, title: (activeSeg || topModel)?.model, children: (activeSeg || topModel)?.model }), _jsx("span", { className: css.donutInspectTag, children: activeSeg ? '当前高亮' : '全场主力' }), _jsxs("span", { className: css.donutInspectVal, children: [fmtCompact((activeSeg || topModel)?.tokens ?? 0), " Token (", (activeSeg || topModel)?.pct, "%)"] })] })) : null] }), _jsxs("div", { className: css.vizPanel, children: [_jsxs("div", { className: css.vizHead, children: [_jsxs("div", { className: css.vizHeadTitles, children: [_jsx("span", { className: css.vizTitle, children: range === '7' ? '近 7 日活动分布' : range === '30' ? '近 30 日走势' : '近 6 个月趋势' }), _jsx("span", { className: css.vizSub, children: activeViewMode === 'bar' ? '柱状堆叠图 · 分色对应模型' : '平滑折线图 · 活动趋势' })] }), _jsx(SegmentedToggle, { label: "\u56FE\u8868\u7C7B\u578B\u5207\u6362", value: activeViewMode, onChange: setCustomViewMode, options: [
                                        { value: 'bar', label: '柱状图' },
                                        { value: 'line', label: '折线图' },
                                    ] })] }), analytics && analytics.activeRangeModels.length > 0 && (_jsx("div", { className: css.chartLegend, "aria-label": "\u56FE\u4F8B", children: analytics.activeRangeModels.map(m => (_jsxs("div", { className: css.chartLegendItem, title: `${m.model}: ${fmtCompact(m.tokens)} Token (${m.pct}%)`, children: [_jsx("i", { className: css.chartLegendDot, style: { background: m.color } }), _jsx("span", { className: css.chartLegendName, children: m.model }), _jsxs("span", { className: css.chartLegendVal, children: [fmtCompact(m.tokens), " (", m.pct, "%)"] })] }, m.model))) })), activeViewMode === 'bar' ? (_jsxs("div", { className: css.chartInteractiveWrap, onMouseLeave: () => { setHoveredDayIdx(null); setHoveredDayAnchor(null); }, children: [hoveredDayIdx !== null && analytics?.daySeries[hoveredDayIdx] && ((() => {
                                    const day = analytics.daySeries[hoveredDayIdx];
                                    return (_jsxs(ChartTooltip, { anchor: hoveredDayAnchor, children: [_jsxs("div", { className: css.chartTooltipDate, children: [_jsx("span", { children: day.key }), _jsxs("span", { className: css.chartTooltipDateBadge, children: [day.isToday ? '今天 · ' : day.isYesterday ? '昨天 · ' : '', day.weekday] })] }), _jsxs("div", { className: css.chartTooltipTotal, children: [fmtCompact(day.total), " ", _jsx("span", { className: css.chartTooltipUnit, children: "Token" }), _jsxs("span", { className: css.chartTooltipSessions, children: ["\u00B7 ", day.sessions, " \u4E2A\u4F1A\u8BDD"] })] }), day.segments.length > 0 && _jsx("div", { className: css.chartTooltipDivider }), _jsx("div", { className: css.chartTooltipModelList, children: day.segments.map(seg => (_jsxs("div", { className: css.chartTooltipModelRow, children: [_jsxs("div", { className: css.chartTooltipModelLeft, children: [_jsx("i", { className: css.chartTooltipModelDot, style: { background: seg.color } }), _jsx("span", { className: css.chartTooltipModelName, title: seg.model, children: seg.model })] }), _jsxs("span", { className: css.chartTooltipModelRight, children: [fmtCompact(seg.tokens), " (", seg.pct, "%)"] })] }, seg.model))) })] }));
                                })()), _jsx("div", { className: `${css.dayStack} ${range === '7' ? css.dayStackWeek : ''}`, "aria-label": "\u6309\u65E5\u6D3B\u8DC3\u67F1\u56FE", children: (analytics?.daySeries ?? []).map((day, idx) => (_jsxs("div", { className: css.dayCol, onMouseEnter: (e) => {
                                            setHoveredDayIdx(idx);
                                            setHoveredDayAnchor({ el: e.currentTarget, ratioX: 0.5, ratioY: 0, side: 'below' });
                                        }, children: [_jsx("div", { className: css.dayBarTopLabel, children: day.total > 0 ? fmtCompact(day.total) : '' }), _jsx("div", { className: `${css.dayColFill} ${hoveredDayIdx === idx ? css.dayColFillActive : ''}`, children: day.total > 0 ? (day.segments.map(seg => (_jsx("div", { className: css.daySeg, style: {
                                                        height: `${(seg.tokens / analytics.dayMax) * 100}%`,
                                                        background: seg.color,
                                                    } }, seg.model)))) : (_jsx("div", { className: css.dayEmptyDot })) }), _jsx("span", { className: `${css.dayLabel} ${day.isToday ? css.dayLabelToday : ''}`, children: day.label })] }, day.key))) })] })) : (_jsx("div", { className: css.chartInteractiveWrap, onMouseLeave: () => { setHoveredLineIdx(null); setHoveredLineAnchor(null); }, children: analytics && lineData && ((() => {
                                const hoveredPoint = hoveredLineIdx !== null && hoveredLineIdx < lineData.stackLevels.length
                                    ? lineData.stackLevels[hoveredLineIdx]
                                    : null;
                                return (_jsxs("div", { className: css.lineChartWrap, children: [hoveredPoint && (_jsxs(ChartTooltip, { anchor: hoveredLineAnchor, children: [_jsxs("div", { className: css.chartTooltipDate, children: [_jsx("span", { children: hoveredPoint.data.key }), _jsxs("span", { className: css.chartTooltipDateBadge, children: [hoveredPoint.data.isToday ? '今天 · ' : hoveredPoint.data.isYesterday ? '昨天 · ' : '', hoveredPoint.data.weekday] })] }), _jsxs("div", { className: css.chartTooltipTotal, children: [fmtCompact(hoveredPoint.data.total), " ", _jsx("span", { className: css.chartTooltipUnit, children: "Token" }), _jsxs("span", { className: css.chartTooltipSessions, children: ["\u00B7 ", hoveredPoint.data.sessions, " \u4E2A\u4F1A\u8BDD"] })] }), hoveredPoint.data.segments.length > 0 && _jsx("div", { className: css.chartTooltipDivider }), _jsx("div", { className: css.chartTooltipModelList, children: hoveredPoint.data.segments.map((seg) => (_jsxs("div", { className: css.chartTooltipModelRow, children: [_jsxs("div", { className: css.chartTooltipModelLeft, children: [_jsx("i", { className: css.chartTooltipModelDot, style: { background: seg.color } }), _jsx("span", { className: css.chartTooltipModelName, title: seg.model, children: seg.model })] }), _jsxs("span", { className: css.chartTooltipModelRight, children: [fmtCompact(seg.tokens), " (", seg.pct, "%)"] })] }, seg.model))) })] })), _jsxs("svg", { className: css.lineChartSvg, viewBox: "0 0 560 160", preserveAspectRatio: "none", onMouseMove: (e) => {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                const scaleX = 560 / rect.width;
                                                const svgX = (e.clientX - rect.left) * scaleX;
                                                let nearestIdx = 0;
                                                let minDiff = Infinity;
                                                lineData.stackLevels.forEach((sl, idx) => {
                                                    const diff = Math.abs(sl.x - svgX);
                                                    if (diff < minDiff) {
                                                        minDiff = diff;
                                                        nearestIdx = idx;
                                                    }
                                                });
                                                setHoveredLineIdx(nearestIdx);
                                                const level = lineData.stackLevels[nearestIdx];
                                                const stacks = level?.modelStacks ?? [];
                                                const topY = stacks[stacks.length - 1]?.topY ?? 60;
                                                setHoveredLineAnchor({
                                                    el: e.currentTarget,
                                                    ratioX: (level?.x ?? 0) / 560,
                                                    ratioY: topY / 160,
                                                    side: 'above',
                                                });
                                            }, children: [_jsx("defs", { children: lineData.layers.map((layer, mIdx) => (_jsxs("linearGradient", { id: `dshWatcherLayerGrad_${mIdx}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: layer.color, stopOpacity: "0.55" }), _jsx("stop", { offset: "100%", stopColor: layer.color, stopOpacity: "0.18" })] }, `dshWatcherLayerGrad_${mIdx}`))) }), _jsx("line", { x1: lineData.padding.left, y1: lineData.padding.top, x2: 560 - lineData.padding.right, y2: lineData.padding.top, className: css.lineGrid }), _jsx("text", { x: lineData.padding.left - 6, y: lineData.padding.top + 3, textAnchor: "end", className: css.lineAxisText, children: fmtCompact(lineData.yMax) }), _jsx("line", { x1: lineData.padding.left, y1: lineData.padding.top + lineData.plotH / 2, x2: 560 - lineData.padding.right, y2: lineData.padding.top + lineData.plotH / 2, className: css.lineGrid }), _jsx("text", { x: lineData.padding.left - 6, y: lineData.padding.top + lineData.plotH / 2 + 3, textAnchor: "end", className: css.lineAxisText, children: fmtCompact(Math.round(lineData.yMax / 2)) }), _jsx("line", { x1: lineData.padding.left, y1: lineData.bottomY, x2: 560 - lineData.padding.right, y2: lineData.bottomY, stroke: "var(--ui-line)", strokeWidth: "1" }), _jsx("text", { x: lineData.padding.left - 6, y: lineData.bottomY + 3, textAnchor: "end", className: css.lineAxisText, children: "0" }), lineData.stackLevels.map((sl, idx) => {
                                                    const isKeyDate = lineData.stackLevels.length <= 10
                                                        ? true
                                                        : idx === 0 || idx === lineData.stackLevels.length - 1 || idx % Math.max(1, Math.floor(lineData.stackLevels.length / 5)) === 0;
                                                    if (!isKeyDate)
                                                        return null;
                                                    const text = sl.data.isToday ? '今天' : sl.data.label || dayLabel(sl.data.key);
                                                    return (_jsx("text", { x: sl.x, y: lineData.bottomY + 16, textAnchor: "middle", className: css.lineAxisText, fill: sl.data.isToday ? 'var(--ui-accent)' : undefined, fontWeight: sl.data.isToday ? '700' : undefined, children: text }, sl.data.key));
                                                }), lineData.layers.map((layer, mIdx) => (_jsx("path", { d: layer.areaD, fill: `url(#dshWatcherLayerGrad_${mIdx})` }, `area_${layer.model}`))), lineData.layers.map((layer) => (_jsx("path", { d: layer.lineD, fill: "none", stroke: layer.color, strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round" }, `line_${layer.model}`))), lineData.stackLevels.map((sl) => {
                                                    return sl.modelStacks.map((ms) => {
                                                        if (ms.tokens <= 0)
                                                            return null;
                                                        return (_jsx("circle", { cx: sl.x, cy: ms.topY, r: "2", fill: ms.color }, `dot_${ms.model}_${sl.index}`));
                                                    });
                                                }), hoveredPoint && (_jsxs("g", { children: [_jsx("line", { x1: hoveredPoint.x, y1: lineData.padding.top, x2: hoveredPoint.x, y2: lineData.bottomY, className: css.lineCursor }), hoveredPoint.modelStacks.map((ms) => {
                                                            if (ms.tokens <= 0)
                                                                return null;
                                                            return (_jsxs("g", { children: [_jsx("circle", { cx: hoveredPoint.x, cy: ms.topY, r: "6", fill: ms.color, fillOpacity: "0.35" }), _jsx("circle", { cx: hoveredPoint.x, cy: ms.topY, r: "3.5", fill: ms.color, stroke: "var(--ui-surface)", strokeWidth: "1.5" })] }, `hover_dot_${ms.model}`));
                                                        })] }))] })] }));
                            })()) })), _jsx("div", { className: css.chartFoot, children: activeViewMode === 'bar'
                                ? '每日柱高代表当天最后活动的对话 Token 汇总，分色对应上方模型图例。'
                                : '折线展示编码活跃趋势，鼠标滑动可透视任意一天的 Token 消耗与调用明细。' })] })] }) }));
}
//# sourceMappingURL=UsageCharts.js.map
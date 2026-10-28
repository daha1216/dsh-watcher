export const CODE_TOOLBAR_LABELS = Object.freeze({
    codeLabel: '代码块',
    wrapLabel: '自动换行',
    unwrapLabel: '取消自动换行',
});
export const MARKDOWN_LABELS = Object.freeze({
    code: Object.freeze({
        copyLabel: '复制',
        copiedLabel: '已复制',
        toolbarLabels: CODE_TOOLBAR_LABELS,
    }),
    footnotes: '脚注',
});
export const TERMINAL_LABELS = Object.freeze({
    signal: (signal) => `信号 ${signal}`,
    exitCode: (exitCode) => `退出码 ${exitCode}`,
    noExitCode: '未正常退出',
    running: '运行中',
    failed: '失败',
    done: '完成',
    copy: '复制',
    copied: '已复制',
    noOutput: '没有输出',
    collapseAria: '收起终端输出',
    collapse: '收起',
    expandAria: (hidden) => `展开其余 ${hidden} 行终端输出`,
    expand: (hidden) => `展开 ${hidden} 行`,
});
export const READ_LABELS = Object.freeze({
    ...CODE_TOOLBAR_LABELS,
    window: (shown, total) => `显示 ${shown}/${total} 行`,
    copy: '复制',
    copied: '已复制',
    collapseAria: '收起文件内容',
    expandAria: (hidden) => `展开其余 ${hidden} 行文件内容`,
    collapse: '收起',
    expand: (hidden) => `展开 ${hidden} 行`,
});
export const DIFF_LABELS = Object.freeze({
    ...CODE_TOOLBAR_LABELS,
    copy: '复制',
    copied: '已复制',
    collapseAria: '收起变更内容',
    expandAria: (hidden) => `展开其余 ${hidden} 行变更`,
    collapse: '收起',
    expand: (hidden) => `展开 ${hidden} 行`,
});
export const JSON_LABELS = Object.freeze({
    copyValue: '复制值',
    copyJson: '复制 JSON',
    copyPath: '复制路径',
    copyPrettyJson: '复制格式化 JSON',
    copyCompactJson: '复制紧凑 JSON',
    copied: '已复制',
    copyFailed: '复制失败',
    collapseNode: '收起节点',
    expandNode: '展开节点',
    copyButtonTitle: (action) => action,
});
export const STATUS_LABEL = {
    running: '进行中',
    waiting: '等待你',
    success: '成功',
    failure: '失败',
    returned: '已返回',
    interrupted: '已中断',
    unknown: '未知',
};
//# sourceMappingURL=labels.js.map
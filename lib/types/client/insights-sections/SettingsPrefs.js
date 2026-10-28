import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
// @ts-ignore TS7016: no declarations for the local .mjs module
import { clearPricingEditor, effectivePricingText, persistPricingEditor } from '../../insights/pricing.mjs';
import { Button, Input } from '@deepseek-ai/dsh-client-ui-primitives';
import css from '../Insights.module.css';
import { STORAGE, useLimits } from "../insights-shared.js";
/** Alert thresholds and the local pricing override, both saved explicitly. */
export function SettingsPrefs({ copy }) {
    const limits = useLimits();
    const [silence, setSilence] = useState(limits.silenceSeconds);
    const [reasoning, setReasoning] = useState(limits.reasoningSeconds);
    const [saved, setSaved] = useState(false);
    const [overrideText, setOverrideText] = useState(() => {
        try {
            return effectivePricingText(globalThis.localStorage);
        }
        catch {
            return '';
        }
    });
    const [overrideError, setOverrideError] = useState('');
    const [overrideSaved, setOverrideSaved] = useState(false);
    // The confirmation flash outlives a fast tab switch unless it is cancelled.
    const savedTimer = useRef(null);
    const overrideTimer = useRef(null);
    useEffect(() => () => {
        if (savedTimer.current !== null)
            window.clearTimeout(savedTimer.current);
        if (overrideTimer.current !== null)
            window.clearTimeout(overrideTimer.current);
    }, []);
    const flash = (which) => {
        const [ref, set] = which === 'saved'
            ? [savedTimer, setSaved]
            : [overrideTimer, setOverrideSaved];
        if (ref.current !== null)
            window.clearTimeout(ref.current);
        set(true);
        ref.current = window.setTimeout(() => set(false), 2000);
    };
    const save = () => {
        // A cleared number input yields NaN; keep the stored thresholds inside the
        // range the alert reader accepts instead of persisting junk.
        const nextSilence = Number.isFinite(silence) ? Math.min(300, Math.max(5, Math.round(silence))) : limits.silenceSeconds;
        const nextReasoning = Number.isFinite(reasoning) ? Math.min(600, Math.max(10, Math.round(reasoning))) : limits.reasoningSeconds;
        setSilence(nextSilence);
        setReasoning(nextReasoning);
        try {
            localStorage.setItem(STORAGE, JSON.stringify({ silenceSeconds: nextSilence, reasoningSeconds: nextReasoning }));
        }
        catch {
            // Storage may be full or disabled; the in-memory thresholds still apply.
        }
        window.dispatchEvent(new CustomEvent('watcher-insights-settings'));
        flash('saved');
    };
    return (_jsxs(_Fragment, { children: [_jsxs("details", { className: css.settingsDrawer, children: [_jsx("summary", { className: css.settingsSummary, children: copy.priceOverrideTitle }), _jsxs("div", { className: css.settingsDrawerContent, children: [_jsx("p", { className: css.priceOverrideHelp, children: copy.priceOverrideHelp }), _jsx("textarea", { className: css.priceOverrideInput, rows: 8, spellCheck: false, placeholder: copy.priceOverridePlaceholder, value: overrideText, onChange: e => setOverrideText(e.target.value), "aria-label": copy.priceOverrideTitle }), overrideError ? _jsx("p", { className: css.priceOverrideError, children: overrideError }) : null, _jsxs("div", { className: css.priceOverrideActions, children: [_jsx(Button, { variant: "primary", size: "sm", onClick: () => {
                                            try {
                                                setOverrideText(persistPricingEditor(overrideText, globalThis.localStorage));
                                                window.dispatchEvent(new CustomEvent('watcher-pricing-settings'));
                                                setOverrideError('');
                                                flash('override');
                                            }
                                            catch {
                                                setOverrideError(copy.priceOverrideInvalid);
                                            }
                                        }, children: overrideSaved ? copy.priceOverrideSaved : copy.priceOverrideSave }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => {
                                            setOverrideText(clearPricingEditor(globalThis.localStorage));
                                            window.dispatchEvent(new CustomEvent('watcher-pricing-settings'));
                                            setOverrideError('');
                                        }, children: copy.priceOverrideReset })] })] })] }), _jsxs("details", { className: css.settingsDrawer, children: [_jsx("summary", { className: css.settingsSummary, children: "\u5F02\u5E38\u63D0\u9192\u9608\u503C" }), _jsxs("div", { className: css.settingsDrawerContent, children: [_jsxs("label", { className: css.settingInlineItem, children: [_jsx("span", { children: "\u7B49\u591A\u4E45\u6CA1\u5B57\u7B97\u5361\u987F:" }), _jsx(Input, { type: "number", min: 5, max: 300, value: silence, className: css.settingsMiniInput, onChange: e => setSilence(Number(e.target.value)) }), _jsx("span", { children: "\u79D2" })] }), _jsxs("label", { className: css.settingInlineItem, children: [_jsx("span", { children: "\u5355\u6B21\u63A8\u5BFC\u601D\u8003\u8D85\u65F6:" }), _jsx(Input, { type: "number", min: 10, max: 600, value: reasoning, className: css.settingsMiniInput, onChange: e => setReasoning(Number(e.target.value)) }), _jsx("span", { children: "\u79D2" })] }), _jsx(Button, { variant: "primary", size: "sm", onClick: save, children: saved ? '已保存 ✓' : '保存' })] })] })] }));
}
//# sourceMappingURL=SettingsPrefs.js.map
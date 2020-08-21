"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var _a = window, H = _a.H, R = _a.R, copee = _a.copee;
var timeout = -1;
var ImagePreview = function (_a) {
    var src = _a.src, onclick = _a.onclick, onload = _a.onload, onerror = _a.onerror, loading = _a.loading;
    var style = {
        filter: loading ? 'blur(5px)' : '',
        opacity: loading ? 0.1 : 1
    };
    var title = 'Click to copy image URL to clipboard';
    return H('a', { className: 'image-wrapper', href: src, onclick: onclick }, H('img', { src: src, onload: onload, onerror: onerror, style: style, title: title }));
};
var Dropdown = function (_a) {
    var options = _a.options, value = _a.value, onchange = _a.onchange, small = _a.small;
    var wrapper = small ? 'select-wrapper small' : 'select-wrapper';
    var arrow = small ? 'select-arrow small' : 'select-arrow';
    return H('div', { className: wrapper }, H('select', { onchange: function (e) { return onchange(e.target.value); } }, options.map(function (o) {
        return H('option', { value: o.value, selected: value === o.value }, o.text);
    })), H('div', { className: arrow }, '▼'));
};
var TextInput = function (_a) {
    var value = _a.value, oninput = _a.oninput;
    return H('div', { className: 'input-outer-wrapper' }, H('div', { className: 'input-inner-wrapper' }, H('input', { type: 'text', value: value, oninput: function (e) { return oninput(e.target.value); } })));
};
var Button = function (_a) {
    var label = _a.label, onclick = _a.onclick;
    return H('button', { onclick: onclick }, label);
};
var Field = function (_a) {
    var label = _a.label, input = _a.input;
    return H('div', { className: 'field' }, H('label', H('div', { className: 'field-label' }, label), H('div', { className: 'field-value' }, input)));
};
var Toast = function (_a) {
    var show = _a.show, message = _a.message;
    var style = { transform: show ? 'translate3d(0,-0px,-0px) scale(1)' : '' };
    return H('div', { className: 'toast-area' }, H('div', { className: 'toast-outer', style: style }, H('div', { className: 'toast-inner' }, H('div', { className: 'toast-message' }, message))));
};
var themeOptions = [
    { text: 'Light', value: 'light' },
    { text: 'Dark', value: 'dark' },
];
var fileTypeOptions = [
    { text: 'PNG', value: 'png' },
    { text: 'JPEG', value: 'jpeg' },
];
var fontSizeOptions = Array
    .from({ length: 10 })
    .map(function (_, i) { return i * 25; })
    .filter(function (n) { return n > 0; })
    .map(function (n) { return ({ text: n + 'px', value: n + 'px' }); });
var markdownOptions = [
    { text: 'Plain Text', value: '0' },
    { text: 'Markdown', value: '1' },
];
var imageLightOptions = [
    { text: 'Vercel', value: 'https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-black.svg' },
    { text: 'Next.js', value: 'https://assets.vercel.com/image/upload/front/assets/design/nextjs-black-logo.svg' },
    { text: 'Hyper', value: 'https://assets.vercel.com/image/upload/front/assets/design/hyper-color-logo.svg' }
];
var imageDarkOptions = [
    { text: 'Vercel', value: 'https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-white.svg' },
    { text: 'Next.js', value: 'https://assets.vercel.com/image/upload/front/assets/design/nextjs-white-logo.svg' },
    { text: 'Hyper', value: 'https://res.cloudinary.com/asross311/image/upload/v1598031627/portfolio/Vector_3_uclaxn.png' },
];
var widthOptions = [
    { text: 'width', value: 'auto' },
    { text: '50', value: '50' },
    { text: '100', value: '100' },
    { text: '150', value: '150' },
    { text: '200', value: '200' },
    { text: '250', value: '250' },
    { text: '300', value: '300' },
    { text: '350', value: '350' },
];
var heightOptions = [
    { text: 'height', value: 'auto' },
    { text: '50', value: '50' },
    { text: '100', value: '100' },
    { text: '150', value: '150' },
    { text: '200', value: '200' },
    { text: '250', value: '250' },
    { text: '300', value: '300' },
    { text: '350', value: '350' },
];
var App = function (_, state, setState) {
    var setLoadingState = function (newState) {
        window.clearTimeout(timeout);
        if (state.overrideUrl && state.overrideUrl !== newState.overrideUrl) {
            newState.overrideUrl = state.overrideUrl;
        }
        if (newState.overrideUrl) {
            timeout = window.setTimeout(function () { return setState({ overrideUrl: null }); }, 200);
        }
        setState(__assign(__assign({}, newState), { loading: true }));
    };
    var _a = state.fileType, fileType = _a === void 0 ? 'png' : _a, _b = state.fontSize, fontSize = _b === void 0 ? '100px' : _b, _c = state.theme, theme = _c === void 0 ? 'light' : _c, _d = state.md, md = _d === void 0 ? true : _d, _e = state.text, text = _e === void 0 ? '**Hello** World' : _e, _f = state.images, images = _f === void 0 ? [imageLightOptions[0].value] : _f, _g = state.widths, widths = _g === void 0 ? [] : _g, _h = state.heights, heights = _h === void 0 ? [] : _h, _j = state.showToast, showToast = _j === void 0 ? false : _j, _k = state.messageToast, messageToast = _k === void 0 ? '' : _k, _l = state.loading, loading = _l === void 0 ? true : _l, _m = state.selectedImageIndex, selectedImageIndex = _m === void 0 ? 0 : _m, _o = state.overrideUrl, overrideUrl = _o === void 0 ? null : _o;
    var mdValue = md ? '1' : '0';
    var imageOptions = theme === 'light' ? imageLightOptions : imageDarkOptions;
    var url = new URL(window.location.origin);
    url.pathname = encodeURIComponent(text) + "." + fileType;
    url.searchParams.append('theme', theme);
    url.searchParams.append('md', mdValue);
    url.searchParams.append('fontSize', fontSize);
    for (var _i = 0, images_1 = images; _i < images_1.length; _i++) {
        var image = images_1[_i];
        url.searchParams.append('images', image);
    }
    for (var _p = 0, widths_1 = widths; _p < widths_1.length; _p++) {
        var width = widths_1[_p];
        url.searchParams.append('widths', width);
    }
    for (var _q = 0, heights_1 = heights; _q < heights_1.length; _q++) {
        var height = heights_1[_q];
        url.searchParams.append('heights', height);
    }
    return H('div', { className: 'split' }, H('div', { className: 'pull-left' }, H.apply(void 0, __spreadArrays(['div', H(Field, {
            label: 'Theme',
            input: H(Dropdown, {
                options: themeOptions,
                value: theme,
                onchange: function (val) {
                    var options = val === 'light' ? imageLightOptions : imageDarkOptions;
                    var clone = __spreadArrays(images);
                    clone[0] = options[selectedImageIndex].value;
                    setLoadingState({ theme: val, images: clone });
                }
            })
        }),
        H(Field, {
            label: 'File Type',
            input: H(Dropdown, {
                options: fileTypeOptions,
                value: fileType,
                onchange: function (val) { return setLoadingState({ fileType: val }); }
            })
        }),
        H(Field, {
            label: 'Font Size',
            input: H(Dropdown, {
                options: fontSizeOptions,
                value: fontSize,
                onchange: function (val) { return setLoadingState({ fontSize: val }); }
            })
        }),
        H(Field, {
            label: 'Text Type',
            input: H(Dropdown, {
                options: markdownOptions,
                value: mdValue,
                onchange: function (val) { return setLoadingState({ md: val === '1' }); }
            })
        }),
        H(Field, {
            label: 'Text Input',
            input: H(TextInput, {
                value: text,
                oninput: function (val) {
                    console.log('oninput ' + val);
                    setLoadingState({ text: val, overrideUrl: url });
                }
            })
        }),
        H(Field, {
            label: 'Image 1',
            input: H('div', H(Dropdown, {
                options: imageOptions,
                value: imageOptions[selectedImageIndex].value,
                onchange: function (val) {
                    var clone = __spreadArrays(images);
                    clone[0] = val;
                    var selected = imageOptions.map(function (o) { return o.value; }).indexOf(val);
                    setLoadingState({ images: clone, selectedImageIndex: selected });
                }
            }), H('div', { className: 'field-flex' }, H(Dropdown, {
                options: widthOptions,
                value: widths[0],
                small: true,
                onchange: function (val) {
                    var clone = __spreadArrays(widths);
                    clone[0] = val;
                    setLoadingState({ widths: clone });
                }
            }), H(Dropdown, {
                options: heightOptions,
                value: heights[0],
                small: true,
                onchange: function (val) {
                    var clone = __spreadArrays(heights);
                    clone[0] = val;
                    setLoadingState({ heights: clone });
                }
            })))
        })], images.slice(1).map(function (image, i) { return H(Field, {
        label: "Image " + (i + 2),
        input: H('div', H(TextInput, {
            value: image,
            oninput: function (val) {
                var clone = __spreadArrays(images);
                clone[i + 1] = val;
                setLoadingState({ images: clone, overrideUrl: url });
            }
        }), H('div', { className: 'field-flex' }, H(Dropdown, {
            options: widthOptions,
            value: widths[i + 1],
            small: true,
            onchange: function (val) {
                var clone = __spreadArrays(widths);
                clone[i + 1] = val;
                setLoadingState({ widths: clone });
            }
        }), H(Dropdown, {
            options: heightOptions,
            value: heights[i + 1],
            small: true,
            onchange: function (val) {
                var clone = __spreadArrays(heights);
                clone[i + 1] = val;
                setLoadingState({ heights: clone });
            }
        })))
    }); }), [H(Field, {
            label: "Image " + (images.length + 1),
            input: H(Button, {
                label: "Add Image " + (images.length + 1),
                onclick: function () {
                    var nextImage = images.length === 1
                        ? 'https://cdn.jsdelivr.net/gh/remojansen/logo.ts@master/ts.svg'
                        : '';
                    setLoadingState({ images: __spreadArrays(images, [nextImage]) });
                }
            })
        })]))), H('div', { className: 'pull-right' }, H(ImagePreview, {
        src: overrideUrl ? overrideUrl.href : url.href,
        loading: loading,
        onload: function () { return setState({ loading: false }); },
        onerror: function () {
            setState({ showToast: true, messageToast: 'Oops, an error occurred' });
            setTimeout(function () { return setState({ showToast: false }); }, 2000);
        },
        onclick: function (e) {
            e.preventDefault();
            var success = copee.toClipboard(url.href);
            if (success) {
                setState({ showToast: true, messageToast: 'Copied image URL to clipboard' });
                setTimeout(function () { return setState({ showToast: false }); }, 3000);
            }
            else {
                window.open(url.href, '_blank');
            }
            return false;
        }
    })), H(Toast, {
        message: messageToast,
        show: showToast
    }));
};
R(H(App), document.getElementById('app'));

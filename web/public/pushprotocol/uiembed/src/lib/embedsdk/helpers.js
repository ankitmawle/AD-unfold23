"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstItemInArray = exports.SDK_LOCAL_STORAGE = exports.getRootID = void 0;
const tslib_1 = require("tslib");
const constants_1 = require("./constants");
function toUpper(str = '') {
    return str.toUpperCase();
}
function getRootID(config) {
    if (config.appName) {
        return `${constants_1.default.EPNS_SDK_EMBED_VIEW_ROOT}_${toUpper(config.appName)}`;
    }
    return `${constants_1.default.EPNS_SDK_EMBED_VIEW_ROOT}_DEFAULT_APPNAME`;
}
exports.getRootID = getRootID;
exports.SDK_LOCAL_STORAGE = {
    getLocalStorage(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const lsKey = `${constants_1.default.EPNS_SDK_EMBED_LOCAL_STORAGE_PREFIX}${key}`;
            const lsValue = window.localStorage.getItem(lsKey) || '{}';
            try {
                return JSON.parse(lsValue);
            }
            catch (err) {
                console.warn(`${constants_1.default.EPNS_SDK_EMBED_NAMESPACE} - Local Storage READ issue`);
                return '';
            }
        });
    },
    setLocalStorage(key, value) {
        const lsKey = `${constants_1.default.EPNS_SDK_EMBED_LOCAL_STORAGE_PREFIX}${key}`;
        window.localStorage.setItem(lsKey, JSON.stringify(value));
    }
};
function getFirstItemInArray(arr) {
    if (Array.isArray(arr)) {
        const [firstItem] = arr;
        return firstItem;
    }
    return '';
}
exports.getFirstItemInArray = getFirstItemInArray;
//# sourceMappingURL=helpers.js.map
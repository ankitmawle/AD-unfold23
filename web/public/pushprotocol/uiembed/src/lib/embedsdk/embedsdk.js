"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbedSDK = void 0;
const tslib_1 = require("tslib");
const html_template_1 = require("./html-template");
const css_template_1 = require("./css-template");
const constants_1 = require("./constants");
const helpers_1 = require("./helpers");
/**
 * PRIVATE variables
 */
/** keep the config flat as possible  */
const __DEFAULT_CONFIG = {
    isInitialized: false,
    targetID: '',
    chainId: 1,
    appName: '',
    user: '',
    headerText: 'Notifications',
    viewOptions: {
        type: 'sidebar',
        showUnreadIndicator: true,
        unreadIndicatorColor: '#cc1919',
        unreadIndicatorPosition: 'top-right',
        theme: 'light'
    },
};
// RUNTIME config
let __CONFIG = {};
/**
 * PRIVATE methods
 */
function validateConfig(passedConfig) {
    if (!passedConfig.user) {
        console.error(`${constants_1.default.EPNS_SDK_EMBED_NAMESPACE} - config.user not passed!`);
        return false;
    }
    if (![1, 5, 137, 80001, 56, 97].includes(passedConfig.chainId)) {
        console.error(`${constants_1.default.EPNS_SDK_EMBED_NAMESPACE} - config.chainId passed is not in EPNS supported networks [1, 5]!`);
        return false;
    }
    if (!passedConfig.targetID) {
        console.error(`${constants_1.default.EPNS_SDK_EMBED_NAMESPACE} - config.targetID not passed!`);
        return false;
    }
    if (!passedConfig.appName) {
        console.error(`${constants_1.default.EPNS_SDK_EMBED_NAMESPACE} - config.appName not passed!`);
        return false;
    }
    return true;
}
function getClonedConfig(passedConfig) {
    let clonedConfig = {};
    const viewOptionsConfig = Object.assign({}, __DEFAULT_CONFIG.viewOptions, passedConfig.viewOptions);
    clonedConfig = Object.assign({}, __DEFAULT_CONFIG, passedConfig);
    clonedConfig.viewOptions = viewOptionsConfig;
    return clonedConfig;
}
function hideEmbedView() {
    var _a;
    const rootID = (0, helpers_1.getRootID)(__CONFIG);
    const existingEmbedElements = document.querySelectorAll(`#${rootID}`);
    // remove any existing instances of the embedElement
    if (existingEmbedElements.length > 0) {
        for (let i = 0; i < existingEmbedElements.length; i++) {
            (_a = document.querySelector('body')) === null || _a === void 0 ? void 0 : _a.removeChild(existingEmbedElements[i]);
        }
    }
    /** this is to remove any outer scroll */
    const bodyElem = document.querySelector('body');
    if (bodyElem !== null) {
        bodyElem.style.overflow = 'visible';
    }
}
function showEmbedView() {
    const rootID = (0, helpers_1.getRootID)(__CONFIG);
    hideEmbedView();
    // set up the "embedViewElement"
    const embedViewElement = document.createElement('div');
    embedViewElement.id = rootID;
    embedViewElement.classList.add('epns-sdk-embed-modal', 'epns-sdk-embed-modal-open');
    embedViewElement.innerHTML = (0, html_template_1.default)(); // can pass __CONFIG later if needed.
    const bodyElem = document.querySelector('body');
    if (bodyElem !== null) {
        bodyElem.appendChild(embedViewElement);
        bodyElem.style.overflow = 'hidden'; // remove any outer scroll
    }
    removeUnreadIndicatorElement();
    // When the user clicks anywhere outside of the modal, close it
    const overlayId = `#${rootID} .epns-sdk-embed-modal-overlay`;
    const overlayElement = document.querySelector(overlayId);
    if (overlayElement !== null) {
        overlayElement.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            hideEmbedView();
        });
    }
}
function setUpEventHandlers() {
    const triggerElement = document.querySelector(`#${__CONFIG.targetID}`);
    if (triggerElement && triggerElement.id === __CONFIG.targetID) {
        console.info(`${constants_1.default.EPNS_SDK_EMBED_NAMESPACE} - click handler attached to #${__CONFIG.targetID}`);
        triggerElement.addEventListener('click', (clickEvent) => {
            clickEvent.preventDefault();
            clickEvent.stopPropagation();
            showEmbedView();
        });
    }
    else {
        console.error(`${constants_1.default.EPNS_SDK_EMBED_NAMESPACE} - No trigger element ${__CONFIG.targetID} found!`);
    }
}
function removeEventHandlers() {
    const triggerElement = document.querySelector(`#${__CONFIG.targetID}`);
    if (triggerElement && triggerElement.id === __CONFIG.targetID) {
        triggerElement.replaceWith(triggerElement.cloneNode(true));
    }
}
;
function publishToIFRAME(msgPayload) {
    const iframeElement = document
        .querySelector(`iframe#${constants_1.default.EPNS_SDK_EMBED_IFRAME_ID}`);
    try {
        if (iframeElement !== null && iframeElement.contentWindow !== null) {
            iframeElement.contentWindow.postMessage(JSON.stringify(msgPayload), '*');
        }
        else {
            throw 'Iframe not found!';
        }
    }
    catch (err) {
        console.error(`${constants_1.default.EPNS_SDK_EMBED_NAMESPACE} - APP to IFRAME publish error'`, err);
    }
}
function subscribeToIFRAME(evt) {
    try {
        if (typeof evt.data !== 'string')
            return null;
        const isSDKChannel = !!evt.data.match(constants_1.default.EPNS_SDK_EMBED_CHANNEL);
        if (!isSDKChannel)
            return null;
        const publishedMsg = JSON.parse(evt.data);
        if (publishedMsg.channel === constants_1.default.EPNS_SDK_EMBED_CHANNEL) {
            const { onOpen, onClose } = __CONFIG, sdkConfig = tslib_1.__rest(__CONFIG, ["onOpen", "onClose"]);
            console.info(`${constants_1.default.EPNS_SDK_EMBED_NAMESPACE} - Received communication from the IFRAME: `, publishedMsg);
            // When the Embed App is loaded.
            if (publishedMsg.topic === constants_1.default.EPNS_SDK_EMBED_CHANNEL_TOPIC_IFRAME_APP_LOADED) {
                const msgPayload = {
                    msg: sdkConfig,
                    channel: constants_1.default.EPNS_SDK_EMBED_CHANNEL,
                    topic: constants_1.default.EPNS_SDK_EMBED_CHANNEL_TOPIC_SDK_CONFIG_INIT
                };
                publishToIFRAME(msgPayload);
                if (typeof onOpen === 'function') {
                    onOpen();
                }
            }
            // When the Embed App close button is clicked.
            if (publishedMsg.topic === constants_1.default.EPNS_SDK_EMBED_CHANNEL_TOPIC_IFRAME_APP_CLOSED) {
                hideEmbedView();
                if (typeof onClose === 'function') {
                    onClose();
                }
            }
        }
    }
    catch (err) {
        console.error(`${constants_1.default.EPNS_SDK_EMBED_NAMESPACE} - IFRAME TO APP msg receiving error`, err);
    }
}
function setUpWidget() {
    // Add event handler to the trigger button 
    if (document.readyState === 'complete') {
        setUpEventHandlers();
    }
    else {
        window.addEventListener('load', () => {
            setUpEventHandlers();
        });
    }
    // attach IFRAME subscription
    window.addEventListener('message', subscribeToIFRAME, false);
}
function insertCSS() {
    const rootID = (0, helpers_1.getRootID)(__CONFIG);
    const styleTagId = `${constants_1.default.EPNS_SDK_EMBED_STYLE_TAG_ID_PREFIX}${rootID}`;
    let CSSElement = document.querySelector(`style#${styleTagId}`);
    if (!CSSElement) {
        const styleEl = document.createElement('style');
        styleEl.id = `${styleTagId}`;
        CSSElement = styleEl;
    }
    CSSElement.innerHTML = (0, css_template_1.default)(__CONFIG);
    const headTag = document.querySelector('head');
    if (headTag !== null) {
        headTag.appendChild(CSSElement);
    }
}
function handleUnreadNotifications() {
    // Unread notifications
    if (__CONFIG.viewOptions.showUnreadIndicator) {
        refreshUnreadCount();
    }
    else {
        removeUnreadIndicatorElement();
    }
}
function refreshUnreadCount() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let count = 0;
        const LS_KEY = 'LAST_NOTIFICATIONS';
        const lastNotifications = yield helpers_1.SDK_LOCAL_STORAGE.getLocalStorage(LS_KEY);
        let latestNotifications = yield getUnreadNotifications();
        latestNotifications = latestNotifications.map((notif) => notif.payload_id);
        const lastNotification = (0, helpers_1.getFirstItemInArray)(lastNotifications);
        if (lastNotification) {
            const indexOfID = latestNotifications.indexOf(lastNotification);
            if (indexOfID !== -1) { // present
                const latestNotificationsUnread = latestNotifications.slice(0, indexOfID);
                count = latestNotificationsUnread.length;
            }
        }
        else {
            count = latestNotifications.length;
        }
        helpers_1.SDK_LOCAL_STORAGE.setLocalStorage(LS_KEY, latestNotifications);
        if (count > 0) {
            addUnreadIndicatorElement(count > 9 ? '9+' : count);
        }
        else {
            removeUnreadIndicatorElement();
        }
    });
}
function getUnreadNotifications() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // call the API here
        try {
            const userInCAIP = `eip155:${__CONFIG.chainId}:${__CONFIG.user}`;
            const apiBaseUrl = constants_1.default.EPNS_SDK_EMBED_API_URL[__CONFIG.chainId];
            const requestUrl = `${apiBaseUrl}/v1/users/${userInCAIP}/feeds?page=1&limit=10&spam=false`;
            const response = yield fetch(requestUrl, {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            if (response.ok) {
                const json = yield response.json();
                return json.results || [];
            }
            else {
                return [];
            }
        }
        catch (error) {
            console.error(`${constants_1.default.EPNS_SDK_EMBED_NAMESPACE} - API Error`, error);
            return [];
        }
    });
}
function addUnreadIndicatorElement(count) {
    removeUnreadIndicatorElement();
    const throbber = document.createElement('div');
    const positionClass = __CONFIG.viewOptions.unreadIndicatorPosition || '';
    throbber.classList.add('epns-sdk-unread-indicator', `epns-sdk-appname-${__CONFIG.appName}`, positionClass);
    throbber.innerText = count.toString();
    const targetElem = document.querySelector(`#${__CONFIG.targetID}`);
    if (targetElem !== null) {
        targetElem.appendChild(throbber);
    }
}
function removeUnreadIndicatorElement() {
    const targetElem = document.querySelector(`#${__CONFIG.targetID}`);
    if (targetElem !== null) {
        const indicator = targetElem.querySelector(`.epns-sdk-unread-indicator.epns-sdk-appname-${__CONFIG.appName}`);
        if (indicator !== null) {
            targetElem.removeChild(indicator);
        }
    }
}
exports.EmbedSDK = {
    init(options) {
        if (!__CONFIG.isInitialized) {
            if (!validateConfig(options)) {
                return false;
            }
            __CONFIG = getClonedConfig(options);
            __CONFIG.isInitialized = true;
            setUpWidget();
            insertCSS();
            handleUnreadNotifications();
            console.info(`${constants_1.default.EPNS_SDK_EMBED_NAMESPACE} - CONFIG set`, __CONFIG);
            return true;
        }
        return false;
    },
    cleanup() {
        if (__CONFIG.isInitialized) {
            hideEmbedView();
            removeEventHandlers();
            window.removeEventListener('message', subscribeToIFRAME, false);
        }
        __CONFIG = {};
        console.info(`${constants_1.default.EPNS_SDK_EMBED_NAMESPACE} - cleanup called`);
    }
};
//# sourceMappingURL=embedsdk.js.map
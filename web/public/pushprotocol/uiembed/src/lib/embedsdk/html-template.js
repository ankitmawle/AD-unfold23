"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
function default_1() {
    return `
        <div class="epns-sdk-embed-modal-overlay">
            <div class="epns-sdk-embed-modal-content">
                <iframe id="${constants_1.default.EPNS_SDK_EMBED_IFRAME_ID}" src="${constants_1.default.EPNS_SDK_EMBED_APP_URL}"></iframe>
            </div>
        </div>
    `;
}
exports.default = default_1;
//# sourceMappingURL=html-template.js.map
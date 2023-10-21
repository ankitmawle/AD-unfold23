// ReactComponentWrapper.js
import React, { useEffect, useState } from 'react';
import { EmbedSDK } from "../pushprotocol/uiembed";
function Push() {
  useEffect(() => {
    if (account) { // 'your connected wallet address'
      EmbedSDK.init({
        headerText: 'AD- Payment Gateway', // optional
        targetID: 'sdk-trigger-id', // mandatory
        appName: 'AD- Payment Gateway', // mandatory
        user: account, // mandatory
        chainId: 80001, // mandatory
        viewOptions: {
            type: 'sidebar', // optional [default: 'sidebar', 'modal']
            showUnreadIndicator: true, // optional
            unreadIndicatorColor: '#cc1919',
            unreadIndicatorPosition: 'bottom-right',
        },
        theme: 'light',
        onOpen: () => {
          console.log('-> client dApp onOpen callback');
        },
        onClose: () => {
          console.log('-> client dApp onClose callback');
        }
      });
    }

    return () => {
      EmbedSDK.cleanup();
    };
  }, []);
}

export default Push;

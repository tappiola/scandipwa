/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import getStore from 'Util/Store';

import { AdyenReducer } from '../store/Adyen/Adyen.reducer';

class AppPlugin {
    aroundConfigureStore = (args, callback, instance) => {
        callback.apply(instance, args);
        getStore().injectReducer('AdyenReducer', AdyenReducer);
    };
}

const { aroundConfigureStore } = new AppPlugin();

const config = {
    'Component/App/Component': {
        'member-function': {
            configureStore: [
                {
                    position: 100,
                    implementation: aroundConfigureStore
                }
            ]
        }
    }
};

export default config;

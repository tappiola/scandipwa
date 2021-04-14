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

import { UPDATE_ADYEN_STATE, UPDATE_ADYEN_STATUS } from './Adyen.action';

export const initialState = {
    isLoading: false,
    isDeliveryOptionsLoading: false,
    isPaymentMethodsLoading: false,
    orderId: '',
    incrementId: '',
    threeDS2: false,
    challengeType: '',
    challengeToken: '',
    redirectUrl: '',
    isProcessed: false,
};

const getFormattedState = (state) => {
    const stateKeys = Object.keys(initialState);

    return Object.entries(state).reduce((formattedState, [key, value]) => {
        if (stateKeys.indexOf(key) === -1) {
            return formattedState;
        }

        return {
            ...formattedState,
            [key]: value
        };
    }, {});
};

export const AdyenReducer = (state = initialState, action) => {
    const {
        state: newState,
    } = action;

    switch (action.type) {
    case UPDATE_ADYEN_STATE:
        return {
            ...state,
            ...getFormattedState(newState)
        };
    case UPDATE_ADYEN_STATUS:
        return {
            ...state,
            ...status
        };
    default:
        return state;
    }
};

export default AdyenReducer;

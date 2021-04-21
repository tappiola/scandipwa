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

import { UPDATE_MK_STATE, UPDATE_MK_STATUS } from './MakeCommerce.action';

export const initialState = {
    isLoading: false,
    isPaymentMethodsLoading: false,
    paymentMethods: []
};

/** @namespace Makecommerce/Store/MakeCommerce/Reducer/MakeCommerceReducer */
export const MakeCommerceReducer = (state = initialState, action) => {
    const {
        state: newState
    } = action;

    switch (action.type) {
    case UPDATE_MK_STATE:
        return {
            ...state,
            ...newState
        };
    case UPDATE_MK_STATUS:
        return {
            ...state,
            ...status
        };
    default:
        return state;
    }
};

export default MakeCommerceReducer;

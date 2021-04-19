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

export const UPDATE_ADYEN_STATE = 'UPDATE_ADYEN_STATE';
export const UPDATE_ADYEN_STATUS = 'UPDATE_ADYEN_STATUS';

/**
 * Update adyen state
 * @param {Object} state
 */
export const updateAdyenState = state => ({
    type: UPDATE_ADYEN_STATE,
    state
});

/**
 * Update adyen loading status
 * @param {Object} status
 */
export const updateAdyenStatus = status => ({
    type: UPDATE_ADYEN_STATUS,
    status
});

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

export const UPDATE_MK_STATE = 'UPDATE_MK_STATE';
export const UPDATE_MK_STATUS = 'UPDATE_MK_STATUS';

/**
 * Update Makecommerce state
 * @param {Object} state
 * @namespace Makecommerce/Store/MakeCommerce/Action/updateMkState
 */
export const updateMkState = (state) => ({
    type: UPDATE_MK_STATE,
    state
});

/**
 * Update MakeCommerce loading status
 * @param {Object} status
 * @namespace Makecommerce/Store/MakeCommerce/Action/updateMkStatus
 */
export const updateMkStatus = (status) => ({
    type: UPDATE_MK_STATUS,
    status
});

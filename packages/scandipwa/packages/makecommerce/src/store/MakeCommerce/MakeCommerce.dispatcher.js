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

import { showNotification } from 'Store/Notification/Notification.action';

import { updateMkState, updateMkStatus } from './MakeCommerce.action';

export const PAYMENT_TOTALS = 'PAYMENT_TOTALS';

/** @namespace Makecommerce/Store/MakeCommerce/Dispatcher/MakeCommerceDispatcher */
export class MakeCommerceDispatcher {
    _handleError(dispatch, error) {
        const [{ message, debugMessage }] = error;

        dispatch(updateMkStatus({
            isLoading: false,
            isPaymentMethodsLoading: false,
            isDeliveryOptionsLoading: false
        }));
        dispatch(showNotification('error', debugMessage || message));
    }

    updateMkState(dispatch, payload) {
        dispatch(updateMkState(payload));
    }
}

export default new MakeCommerceDispatcher();

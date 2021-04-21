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

import CartDispatcher from 'Store/Cart/Cart.dispatcher';
import { showNotification } from 'Store/Notification/Notification.action';
import BrowserDatabase from 'Util/BrowserDatabase';

import AdyenQuery from '../../query/Adyen.query';
import { updateMkState, updateMkStatus } from './MakeCommerce.action';

export const PAYMENT_TOTALS = 'PAYMENT_TOTALS';
export const STRIPE_AUTH_REQUIRED = 'Authentication Required: ';

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

    updateAdyenState(dispatch, payload) {
        dispatch(updateMkState(payload));
    }
}

export default new MakeCommerceDispatcher();

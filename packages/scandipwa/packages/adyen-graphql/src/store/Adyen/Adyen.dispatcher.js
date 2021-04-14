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
import { fetchMutation } from 'Util/Request';

import { updateAdyenState, updateAdyenStatus } from './Adyen.action';
import AdyenQuery from '../../query/Adyen.query';

export const PAYMENT_TOTALS = 'PAYMENT_TOTALS';
export const STRIPE_AUTH_REQUIRED = 'Authentication Required: ';

export class AdyenDispatcher {
    async processThreeDS2(dispatch, payload) {
        const { orderId = '' } = payload;

        if (!orderId) {
            payload.orderId = BrowserDatabase.getItem('orderId');
        }

        const query = AdyenQuery.processThreeDS2(payload, BrowserDatabase.getItem('orderId'));

        try {
            const {
                adyenThreeDS2Process: {
                    threeDS2,
                    type: challengeType,
                    token: challengeToken
                }
            } = await fetchMutation(query);

            if (!threeDS2) {
                dispatch(updateAdyenState({ isProcessed: true }));
            }

            const data = {
                threeDS2: threeDS2 || false,
                challengeType: challengeType || '',
                challengeToken: challengeToken || ''
            };

            dispatch(updateAdyenState(data));
        } catch (e) {
            this._handleError(dispatch, e);

            // On 3D security, after order is placed, Cart data being removed from FE. To do not change full data
            // flow, we just request once mor cart data.
            // This function called 2 times - before 3D popup and after. our Goal - catch 2ond time call, and on error
            // reload cart data.
            CartDispatcher.updateInitialCartData(dispatch);
        }
    }

    _handleError(dispatch, error) {
        const [{ message, debugMessage }] = error;

        dispatch(updateAdyenStatus({
            isLoading: false,
            isPaymentMethodsLoading: false,
            isDeliveryOptionsLoading: false
        }));
        dispatch(showNotification('error', debugMessage || message));
    }

    updateAdyenState(dispatch, payload) {
        dispatch(updateAdyenState(payload));
    }
}

export default new AdyenDispatcher();

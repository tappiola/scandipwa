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

import CheckoutQuery from 'Query/Checkout.query';
import { getGuestQuoteId } from 'Util/Cart';
import { isSignedIn } from 'Util/Auth';
import { fetchMutation } from 'Util/Request';

export class CheckoutContainerPlugin {
    aroundSavePaymentMethodAndPlaceOrder = async (args, callback = () => {}, instance) => {
        const { paymentMethod: { code, additional_data, purchase_order_number } } = args[0];
        const guest_cart_id = !isSignedIn() ? getGuestQuoteId() : '';

        try {
            await fetchMutation(CheckoutQuery.getSetPaymentMethodOnCartMutation({
                guest_cart_id,
                payment_method: {
                    code,
                    [code]: additional_data,
                    purchase_order_number
                }
            }));

            const orderData = await fetchMutation(CheckoutQuery.getPlaceOrderMutation(guest_cart_id));
            const { placeOrder: { order: { order_id, payment_gateway_url: paymentGatewayUrl } } } = orderData;

            if (paymentGatewayUrl){
                window.location.assign(paymentGatewayUrl);
            } else {
                instance.setDetailsStep(order_id);
            }
        } catch (e) {
            instance._handleError(e);
        }
    }
}

const {
    aroundSavePaymentMethodAndPlaceOrder
} = new CheckoutContainerPlugin();

export const config = {
    'Route/Checkout/Container': {
        'member-function': {
            savePaymentMethodAndPlaceOrder: aroundSavePaymentMethodAndPlaceOrder
        }
    }
};

export default config;

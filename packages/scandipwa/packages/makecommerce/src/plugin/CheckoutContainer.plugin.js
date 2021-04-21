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
import {
    BILLING_STEP, DETAILS_STEP, PAYMENT_TOTALS, SHIPPING_STEP
} from 'Route/Checkout/Checkout.config';
import { isSignedIn } from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase/BrowserDatabase';
import { getGuestQuoteId } from 'Util/Cart';
import { fetchMutation } from 'Util/Request';

import { MAKECOMMERCE } from './CheckoutPaymentsContainer.plugin';

export class CheckoutContainerPlugin {
    aroundConstruct(args, callback = () => {}, instance) {
        const {
            toggleBreadcrumbs,
            totals: {
                is_virtual
            },
            match: { params: { step } },
            history: { location: { search } }
        } = args[0];

        toggleBreadcrumbs(false);

        const searchParams = new URLSearchParams(decodeURI(search));
        const orderId = JSON.parse(searchParams.get('json'))?.reference;
        const isSuccess = !!(step === 'success' && orderId);
        const defaultStep = is_virtual ? BILLING_STEP : SHIPPING_STEP;

        instance.state = {
            isLoading: is_virtual,
            isDeliveryOptionsLoading: false,
            requestsSent: 0,
            paymentMethods: [],
            shippingMethods: [],
            shippingAddress: {},
            billingAddress: {},
            checkoutStep: isSuccess ? DETAILS_STEP : defaultStep,
            orderID: orderId || '',
            paymentTotals: isSuccess ? {} : BrowserDatabase.getItem(PAYMENT_TOTALS) || {},
            email: '',
            isGuestEmailSaved: false,
            isCreateUser: false,
            estimateAddress: {}
        };

        if (is_virtual && !isSuccess) {
            instance._getPaymentMethods();
        }

        if (isSuccess) {
            const { createGuestEmptyCart } = instance.props;
            createGuestEmptyCart();
            instance.setDetailsStep(orderId);
        }
    }

    aroundSavePaymentMethodAndPlaceOrder = async (args, callback = () => {}, instance) => {
        const { paymentMethod: { code, additional_data, purchase_order_number } } = args[0];
        const guest_cart_id = !isSignedIn() ? getGuestQuoteId() : '';

        try {
            await fetchMutation(CheckoutQuery.getSetPaymentMethodOnCartMutation({
                guest_cart_id,
                payment_method: {
                    code,
                    [(code === MAKECOMMERCE ? 'additional_data' : code)]: additional_data,
                    purchase_order_number
                }
            }));

            const orderData = await fetchMutation(CheckoutQuery.getPlaceOrderMutation(guest_cart_id));
            const { placeOrder: { order: { order_id, payment_gateway_url: paymentGatewayUrl } } } = orderData;

            if (code === MAKECOMMERCE && paymentGatewayUrl) {
                window.location.assign(paymentGatewayUrl);
            } else {
                instance.setDetailsStep(order_id);
            }
        } catch (e) {
            instance._handleError(e);
        }
    };
}

const {
    aroundConstruct,
    aroundSavePaymentMethodAndPlaceOrder
} = new CheckoutContainerPlugin();

export const config = {
    'Route/Checkout/Container': {
        'member-function': {
            __construct: aroundConstruct,
            savePaymentMethodAndPlaceOrder: aroundSavePaymentMethodAndPlaceOrder
        }
    }
};

export default config;

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

import { CART_TAB } from 'Component/NavigationTabs/NavigationTabs.config';
import CheckoutQuery from 'Query/Checkout.query';
import { DETAILS_STEP, PAYMENT_TOTALS } from 'Route/Checkout/Checkout.config';
import { GUEST_QUOTE_ID } from 'Util/Cart';
import { isSignedIn } from 'Util/Auth';
import BrowserDatabase from 'Util/BrowserDatabase';
import { fetchMutation } from 'Util/Request';

import { ADYEN_CC } from './CheckoutPayments.plugin';

export class CheckoutContainerPlugin {
    aroundComponentDidUpdate = (args, callback = () => {}, instance) => {
        const { isProcessed = false, incrementId } = instance.props;
        const { checkoutStep } = instance.state;

        if (isProcessed && checkoutStep !== DETAILS_STEP) {
            instance.setState({
                isLoading: false,
                paymentTotals: {},
                checkoutStep: DETAILS_STEP,
                orderID: incrementId
            });
        }
    };

    // eslint-disable-next-line no-unused-vars
    aroundSavePaymentMethodAndPlaceOrder = async (args, callback = () => {}, instance) => {
        const { paymentMethod: { code, additional_data } } = args[0];
        const guest_cart_id = !isSignedIn() ? instance._getGuestCartId() : '';

        try {
            await fetchMutation(CheckoutQuery.getSetPaymentMethodOnCartMutation({
                guest_cart_id,
                payment_method: {
                    code, [(code === ADYEN_CC ? 'additional_data' : code)]: additional_data
                }
            }));

            const {
                placeOrder: {
                    order: {
                        id,
                        order_id: increment_id,
                        redirectUrl,
                        threeDS2,
                        type: challengeType,
                        token: challengeToken
                    }
                }
            } = await fetchMutation(CheckoutQuery.getPlaceOrderMutation(guest_cart_id));

            const additionalData = {
                redirectUrl,
                threeDS2,
                challengeType,
                challengeToken
            };

            instance.setDetailsStep(id, additionalData, increment_id);
        } catch (e) {
            instance._handleError(e);
        }
    };

    aroundSetDetailsStep = (args, callback = () => {}, instance) => {
        const { resetCart, setNavigationState, updateAdyenState } = instance.props;
        const { threeDS2 } = args[1] || {};

        // For some reason not logged in user cart preserves qty in it
        if (!isSignedIn()) {
            BrowserDatabase.deleteItem(GUEST_QUOTE_ID);
        }

        BrowserDatabase.deleteItem(PAYMENT_TOTALS);
        BrowserDatabase.setItem(args[0], 'orderId');

        resetCart();

        const newState = {
            ...(args[1] || {}),
            orderId: args[0],
            incrementId: args[2] || ''
        };

        updateAdyenState(newState);

        if (!threeDS2) {
            instance.setState({
                isLoading: false,
                paymentTotals: {},
                checkoutStep: DETAILS_STEP,
                orderID: args[2] || args[0]
            });
        }

        setNavigationState({
            name: CART_TAB
        });
    };
}

const {
    aroundSavePaymentMethodAndPlaceOrder,
    aroundSetDetailsStep,
    aroundComponentDidUpdate
} = new CheckoutContainerPlugin();

export const config = {
    'Route/Checkout/Container': {
        'member-function': {
            savePaymentMethodAndPlaceOrder: aroundSavePaymentMethodAndPlaceOrder,
            setDetailsStep: aroundSetDetailsStep,
            componentDidUpdate: aroundComponentDidUpdate
        }
    }
};

export default config;

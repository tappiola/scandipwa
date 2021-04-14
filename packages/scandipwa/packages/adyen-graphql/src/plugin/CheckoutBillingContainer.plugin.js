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

import {
    KLARNA
} from 'Component/CheckoutPayments/CheckoutPayments.config';

import { ADYEN_CC } from './CheckoutPayments.plugin';

const BRAINTREE = 'braintree';

export class CheckoutBillingContainerPlugin {
    _aroundGetPaymentData = (args, callback = () => {}, instance) => {
        const { asyncData } = args;
        const { paymentMethod: code } = instance.state;

        callback.apply(instance, args);

        switch (code) {
        case ADYEN_CC:
            const [{
                cc_type,
                encryptedCardNumber: number,
                encryptedExpiryMonth: expiryMonth,
                encryptedExpiryYear: expiryYear,
                encryptedSecurityCode: cvc,
                holderName,
                storeCc: store_cc,
                javaEnabled: java_enabled,
                colorDepth: screen_color_depth,
                screenWidth: screen_width,
                screenHeight: screen_height,
                timeZoneOffset: timezone_offset,
                language
            }] = asyncData || args[0];

            return {
                code,
                additional_data: {
                    cc_type,
                    number,
                    expiryMonth,
                    expiryYear,
                    cvc,
                    holderName,
                    store_cc,
                    java_enabled,
                    screen_color_depth,
                    screen_width,
                    screen_height,
                    timezone_offset,
                    language
                }
            };

        case BRAINTREE:
            const [{ nonce }] = asyncData || args[0];

            return {
                code,
                additional_data: {
                    payment_method_nonce: nonce,
                    is_active_payment_token_enabler: false
                }
            };

        case KLARNA:
            const [{ authorization_token }] = asyncData || args[0];

            return {
                code,
                additional_data: {
                    authorization_token
                }
            };

        default:
            return { code };
        }
    };
}

const {
    _aroundGetPaymentData
} = new CheckoutBillingContainerPlugin();

export const config = {
    'Component/CheckoutBilling/Container': {
        'member-function': {
            _getPaymentData: _aroundGetPaymentData
        }
    }
};

export default config;

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
    KLARNA, PURCHASE_ORDER
} from 'Component/CheckoutPayments/CheckoutPayments.config';

import { MAKECOMMERCE } from './CheckoutPaymentsContainer.plugin';

export class CheckoutBillingContainerPlugin {
    _aroundGetPaymentData = (args, callback = () => {}, instance) => {
        const { asyncData } = args;
        const { paymentMethod: code } = instance.state;

        callback.apply(instance, args);

        switch (code) {
        case MAKECOMMERCE:
            const [{
                payment_type
            }] = asyncData || args[0];

            return {
                code,
                additional_data: {
                    payment_type
                }
            };

        case KLARNA:
            const [{ authorization_token }] = asyncData;

            return {
                code,
                additional_data: {
                    authorization_token
                }
            };

        case PURCHASE_ORDER:
            const { purchaseOrderNumber } = fields;

            return {
                code,
                purchase_order_number: purchaseOrderNumber
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

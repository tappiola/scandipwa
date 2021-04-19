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

import { fetchQuery } from 'Util/Request';

import MakeCommerceQuery from '../query/MakeCommerce.query';

export const MAKECOMMERCE = 'makecommerce';

export class CheckoutPaymentsContainerPlugin {
    state = {
        paymentMethodConfig: {},
        isMkLoaded: false
    };

    aroundComponentDidMount = (args, callback = () => {}, instance) => {
        this.initializeMk().then(
            /** @namespace ScandiPWA/MakeCommerce/Plugin/Plugin/initializeMkThen */
            (result) => {
                console.log(result);
                this.setPaymentMethodConfig(result, instance);
                instance.setState({ isMkLoaded: true });
            }
        );

        callback.apply(instance, args);
    };

    containerFunctions = (originalMember, instance) => ({
        ...originalMember,
        setPaymentMethodData(data) {
            const { selectedPaymentCode } = instance.state;
            instance.setState(({ paymentMethodData }) => ({
                paymentMethodData: {
                    ...paymentMethodData,
                    [selectedPaymentCode]: data
                }
            }));
        }
    });

    setPaymentMethodConfig(paymentMethodConfig, instance) {
        instance.setState({ paymentMethodConfig });
    }

    initializeMk = async () => {
        const queries = [
            MakeCommerceQuery.getPaymentMethods()
        ];

        const { getMkConfig: { payment_methods : paymentMethods }} = await fetchQuery(queries);
        return paymentMethods ;
    };
}

const {
    aroundComponentDidMount,
    containerFunctions
} = new CheckoutPaymentsContainerPlugin();

export const config = {
    'Component/CheckoutPayments/Container': {
            'member-property': {
                containerFunctions
            },
            'member-function': {
                componentDidMount: aroundComponentDidMount
            }
        }
}

export default config;

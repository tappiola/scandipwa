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
        paymentBrand: '',
        isMkLoaded: false
    };

    // eslint-disable-next-line no-unused-vars
    aroundCollectAdditionalData = (args, callback = () => {}, instance) => {
        const { selectedPaymentCode } = instance.state;
        const additionalDataGetter = instance.dataMap[selectedPaymentCode];

        if (!additionalDataGetter) {
            return {};
        }

        return additionalDataGetter(instance);
    };

    aroundComponentDidMount = (args, callback = () => {}, instance) => {
        this.initializeMk().then(
            /** @namespace ScandiPWA/MakeCommerce/Plugin/Plugin/initializeMkThen */
            (result) => {
                this.setPaymentMethodConfig(result, instance);
                instance.setState({ isMkLoaded: true });
            }
        );

        callback.apply(instance, args);
    };

    aroundDataMap = (originalMember) => ({
        ...originalMember,
        [MAKECOMMERCE]: this.getMkData.bind(this)
    });

    getMkData(instance) {
        const { paymentBrand } = instance.state;
        return { asyncData: paymentBrand };
    }

    containerFunctions = (originalMember, instance) => ({
        ...originalMember,
        ...this.state,
        setPaymentMethodBrand(paymentBrand) {
            instance.setState({ paymentBrand });
        }
    });

    setPaymentMethodConfig(paymentMethodConfig, instance) {
        instance.setState({ paymentMethodConfig });
    }

    initializeMk = async () => {
        const queries = [
            MakeCommerceQuery.getPaymentMethods()
        ];

        const { getMkConfig: { payment_methods: paymentMethods } } = await fetchQuery(queries);
        return paymentMethods;
    };
}

const {
    aroundCollectAdditionalData,
    aroundComponentDidMount,
    containerFunctions,
    aroundDataMap
} = new CheckoutPaymentsContainerPlugin();

export const config = {
    'Component/CheckoutPayments/Container': {
        'member-property': {
            dataMap: aroundDataMap,
            containerFunctions
        },
        'member-function': {
            componentDidMount: aroundComponentDidMount,
            collectAdditionalData: aroundCollectAdditionalData
        }
    }
};

export default config;

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

import { CREDIT_CARD_TYPE } from '../component/Adyen/Adyen.config';
import AdyenQuery from '../query/Adyen.query';
import { ADYEN_CC } from './CheckoutPayments.plugin';

export class CheckoutPaymentsContainerPlugin {
    state = {
        paymentMethodConfig: {},
        paymentMethodData: {},
        isAdyenLoaded: false
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
        this.initializeAdyen().then(
            /** @namespace ScandiPWA/AdyenGraphQl/Plugin/Plugin/initializeAdyenThen */
            (result) => {
                this.setPaymentMethodConfig(result, instance);
                instance.setState({ isAdyenLoaded: true });
            }
        );

        callback.apply(instance, args);
    };

    aroundDataMap = (originalMember) => ({
        ...originalMember,
        [ADYEN_CC]: this.getAdyenData.bind(this)
    });

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

    getAdyenData(instance) {
        const { paymentMethodData: { [ADYEN_CC]: asyncData = {} } } = instance.state;

        return { asyncData };
    }

    setPaymentMethodConfig(paymentMethodConfig, instance) {
        instance.setState({ paymentMethodConfig });
    }

    initializeAdyen = async () => {
        const queries = [
            AdyenQuery.getConfig(),
            AdyenQuery.getPaymentMethods()
        ];

        const { getAdyenConfig, getAdyenPaymentMethods } = await fetchQuery(queries);
        const paymentMethod = getAdyenPaymentMethods.find(({ type }) => type === CREDIT_CARD_TYPE) || {};

        const {
            originKey,
            mode: environment,
            locale
        } = getAdyenConfig || {};

        const script = document.createElement('script');
        script.setAttribute(
            'src',
            `https://checkoutshopper-${ environment }.adyen.com/checkoutshopper/sdk/3.6.1/adyen.js`
        );
        script.setAttribute('crossorigin', 'anonymous');
        script.addEventListener('load', () => {
            const { AdyenCheckout } = window;

            window.adyen = new AdyenCheckout({
                locale,
                environment,
                originKey
            });
        });

        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute(
            'href',
            `https://checkoutshopper-${ environment }.adyen.com/checkoutshopper/sdk/3.6.1/adyen.css`
        );
        link.setAttribute('crossorigin', 'anonymous');

        document.body.prepend(script);
        document.head.append(link);

        return { paymentMethod };
    };
}

const {
    aroundCollectAdditionalData,
    aroundDataMap,
    aroundComponentDidMount,
    containerFunctions
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

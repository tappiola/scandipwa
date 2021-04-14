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

import Adyen from '../component/Adyen';

export const ADYEN_CC = 'adyen_cc';

export class CheckoutPaymentsPlugin {
    aroundPaymentRenderMap = (originalMember) => ({
        ...originalMember,
        [ADYEN_CC]: this.renderAdyen.bind(this)
    });

    renderAdyen(props) {
        const {
            paymentMethodConfig: config = {},
            setPaymentMethodData
        } = props;

        return (
            <Adyen
              config={ config }
              setPaymentMethodData={ setPaymentMethodData }
            />
        );
    }

    // eslint-disable-next-line no-unused-vars
    aroundRenderSelectedPayment = (args, callback = () => {}, instance) => {
        const { selectedPaymentCode } = instance.props;
        const render = instance.paymentRenderMap[selectedPaymentCode];

        if (!render) {
            return null;
        }

        return render(instance.props);
    };

    // eslint-disable-next-line no-unused-vars
    aroundRenderPayment = (args, callback = () => {}, instance) => {
        const {
            isAdyenLoaded
        } = instance.props;

        const method = args[0];
        const { code } = method;

        if (code === ADYEN_CC && !isAdyenLoaded) {
            return;
        }

        // eslint-disable-next-line consistent-return
        return (
            callback(...args)
        );
    };
}

const {
    aroundPaymentRenderMap,
    aroundRenderPayment,
    aroundRenderSelectedPayment
} = new CheckoutPaymentsPlugin();

export const config = {
    'Component/CheckoutPayments/Component': {
        'member-property': {
            paymentRenderMap: aroundPaymentRenderMap
        },
        'member-function': {
            renderSelectedPayment: aroundRenderSelectedPayment,
            renderPayment: aroundRenderPayment
        }
    }
};

export default config;

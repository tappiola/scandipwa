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

import { MAKECOMMERCE } from 'makecommerce/src/plugin/CheckoutPaymentsContainer.plugin';
import MakeCommerce from '../component/MakeCommerce';

export class CheckoutPaymentsPlugin {
    aroundPaymentRenderMap = (originalMember) => ({
        ...originalMember,
        [MAKECOMMERCE]: this.renderMakeCommerce.bind(this)
    });

    renderMakeCommerce(props) {
        const { paymentMethodConfig, setPaymentMethodBrand } = props;

        return (
            <MakeCommerce
                paymentMethodConfig={paymentMethodConfig}
                setPaymentMethodBrand={ setPaymentMethodBrand }
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
}

const {
    aroundPaymentRenderMap,
    aroundRenderSelectedPayment
} = new CheckoutPaymentsPlugin();

export const config = {
    'Component/CheckoutPayments/Component': {
        'member-property': {
            paymentRenderMap: aroundPaymentRenderMap
        },
        'member-function': {
            renderSelectedPayment: aroundRenderSelectedPayment
        }
    }
};

export default config;

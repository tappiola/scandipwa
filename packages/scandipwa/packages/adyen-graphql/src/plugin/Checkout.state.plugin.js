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
import AdyenDispatcher from '../store/Adyen/Adyen.dispatcher';

export class CheckoutState {
    mapDispatchToProps = (args, callback, instance) => {
        const [dispatch] = args;

        return {
            ...callback.apply(instance, args),
            updateAdyenState: (payload) => AdyenDispatcher.updateAdyenState(dispatch, payload)
        };
    };

    mapStateToProps = (args, callback, instance) => {
        const [state] = args;

        return {
            ...callback.apply(instance, args),
            isProcessed: state.AdyenReducer.isProcessed,
            incrementId: state.AdyenReducer.incrementId
        };
    };
}

export const { mapDispatchToProps, mapStateToProps } = new CheckoutState();

const config = {
    'Route/Checkout/Container/mapDispatchToProps': {
        function: [
            {
                position: 10,
                implementation: mapDispatchToProps
            }
        ]
    },
    'Route/Checkout/Container/mapStateToProps': {
        function: [
            {
                position: 100,
                implementation: mapStateToProps
            }
        ]
    }
};

export default config;

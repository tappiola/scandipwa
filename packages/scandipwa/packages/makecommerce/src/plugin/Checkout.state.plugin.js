import { CartDispatcher } from 'Store/MyAccount/MyAccount.dispatcher';

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

export class CheckoutState {
    mapDispatchToProps = (args, callback, instance) => {
        const [dispatch] = args;

        return {
            ...callback.apply(instance, args),
            createGuestEmptyCart: () => CartDispatcher.then(
                ({ default: dispatcher }) => {
                    dispatcher.createGuestEmptyCart(dispatch);
                }
            )
        };
    };
}

export const { mapDispatchToProps } = new CheckoutState();

const config = {
    'Route/Checkout/Container/mapDispatchToProps': {
        function: [
            {
                position: 10,
                implementation: mapDispatchToProps
            }
        ]
    }
};

export default config;

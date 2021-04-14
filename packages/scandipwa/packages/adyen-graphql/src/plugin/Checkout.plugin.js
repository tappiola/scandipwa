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

import ThreeDS2Popup from '../component/ThreeDS2Popup';

class CheckoutPlugin {
    aroundRender = (args, callback = () => {}, instance) => {
        const { setLoading } = instance.props;

        return (
            <>
                { callback.apply(instance, args) }
                <ThreeDS2Popup setLoading={ setLoading } />
            </>
        );
    };
}

const {
    aroundRender
} = new CheckoutPlugin();

const config = {
    'Route/Checkout/Component': {
        'member-function': {
            render: aroundRender
        }
    }
};

export default config;

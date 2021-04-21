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

import { Field } from 'Util/Query';

export class CheckoutQueryPlugin {
    /**
     * Get blog posts per page into config query
     * @returns [Field]
     */
    _aroundGetOrderField = () => new Field('order')
        .addFieldList([
            'id',
            'order_id',
            'payment_gateway_url'
        ]);
}

export const { _aroundGetOrderField } = new CheckoutQueryPlugin();

export const config = {
    'Query/Checkout': {
        'member-function': {
            _getOrderField: _aroundGetOrderField
        }
    }
};

export default config;

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

import CheckoutQuery from 'Query/Checkout.query';
import { GUEST_QUOTE_ID } from 'Util/Cart';
import BrowserDatabase from 'Util/BrowserDatabase';
import { Field } from 'Util/Query';

/** @namespace AdyenGraphql/Query/Adyen/Query/AdyenQuery */
export class AdyenQuery {
    getConfig() {
        return new Field('getAdyenConfig')
            .addField('originKey')
            .addField('mode')
            .addField('locale');
    }

    getPaymentMethods() {
        const guestQuoteId = BrowserDatabase.getItem(GUEST_QUOTE_ID);
        const getAdyenPaymentMethods = new Field('getAdyenPaymentMethods')
            .addField('type')
            .addField('brands')
            .addField(new Field('details')
                .addField('key')
                .addField('type')
                .addField('optional'));

        CheckoutQuery._addGuestCartId(guestQuoteId, getAdyenPaymentMethods);

        return getAdyenPaymentMethods;
    }

    processThreeDS2(payload, orderId) {
        return new Field('adyenThreeDS2Process')
            .addArgument('payload', 'String!', JSON.stringify(payload))
            .addArgument('orderId', 'String!', orderId)
            .addField('threeDS2')
            .addField('type')
            .addField('token');
    }
}

export default new AdyenQuery();

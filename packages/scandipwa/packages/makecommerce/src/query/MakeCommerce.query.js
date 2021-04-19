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
import CheckoutQuery from 'Query/Checkout.query';
import BrowserDatabase from 'Util/BrowserDatabase/BrowserDatabase';
import { GUEST_QUOTE_ID } from 'Util/Cart';

/** @namespace AdyenGraphql/Query/Adyen/Query/MakeCommerceQuery */
export class MakeCommerceQuery {

    _getCards = () => {
        return new Field('cards').addFieldList(['name', 'logo_url', 'url']);
    }

    _getBankLinks = () => {
        return new Field('banklinks').addFieldList(
            ['name', 'logo_url', 'url', 'country', 'countries']
        );
    }

    _getPaymentMethods() {
        return new Field('payment_methods')
            .addFieldList([this._getCards(), this._getBankLinks()])
    }

    getPaymentMethods(){
        const guestQuoteId = BrowserDatabase.getItem(GUEST_QUOTE_ID);
        const paymentMethods = new Field('getMkConfig').addField(this._getPaymentMethods());
        CheckoutQuery._addGuestCartId(guestQuoteId, paymentMethods);
        return paymentMethods;
    }
}

export default new MakeCommerceQuery();

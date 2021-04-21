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

/* eslint-disable react/jsx-no-bind */
import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import './MakeCommerce.style.scss';

/** @namespace Makecommerce/Component/MakeCommerce/Component/MakeCommerceComponent */
export class MakeCommerceComponent extends PureComponent {
    static propTypes = {
        onPaymentBrandSelect: PropTypes.func.isRequired,
        paymentBrand: PropTypes.string.isRequired,
        paymentMethodConfig: PropTypes.shape({
            banklinks: PropTypes.arrayOf(PropTypes.shape({
                logo_url: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired
            }).isRequired).isRequired,
            cards: PropTypes.arrayOf(PropTypes.shape({
                logo_url: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired
            }).isRequired).isRequired
        }).isRequired
    };

    renderIcon = (data) => {
        const { onPaymentBrandSelect, paymentBrand } = this.props;
        const { name, logo_url } = data;

        return (
            <button
              type="button"
              onClick={ (e) => onPaymentBrandSelect(e, name) }
              key={ name }
            >
                <img
                  alt={ name }
                  src={ logo_url }
                  block="Checkout"
                  elem="CardIcon"
                  mods={ { isSelected: name === paymentBrand } }
                />
            </button>
        );
    };

    renderCardsGroup = (title, data) => (
        <>
            { data.length > 0 && <h4>{ title }</h4> }
            <div mix={ { block: 'Checkout', elem: 'CardIcons' } }>
                { data.map((card) => this.renderIcon(card)) }
            </div>
        </>
    );

    render() {
        const {
            paymentMethodConfig: { cards = [], banklinks = [] } = {}
        } = this.props;

        return (
            <div block="Checkout" elem="MakeCommerce">
                { this.renderCardsGroup('Credit cards:', cards) }
                { this.renderCardsGroup('Banks:', banklinks) }
            </div>
        );
    }
}

export default MakeCommerceComponent;

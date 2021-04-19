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

/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import Image from 'Component/Image/Image.container';
import './MakeCommerce.style.scss';

/** @namespace AdyenGraphql/Component/Adyen/Component/MakeCommerceComponent */
export class MakeCommerceComponent extends PureComponent {
    static propTypes = {
    };

    renderIcon = (data) => {
        return <img
            key={data.name}
            src={ data.logo_url }
            block="Checkout"
            elem="CardIcon"
        />
    }

    renderCardsGroup = (title, data) => {
        return <>
            {data && <h4>{title}</h4>}
            <div mix={ { block: 'Checkout', elem: 'CardIcons' } }>
                {data.map(card => this.renderIcon(card))}
            </div>
        </>
    }

    render() {
        const {
            paymentMethodConfig: {cards = [], banklinks = [] } = {}
        } = this.props;

        return <div block="Checkout" elem="MakeCommerce">
            {this.renderCardsGroup('Credit cards:', cards)}
            {this.renderCardsGroup('Banks:', banklinks)}
        </div>;
    }
}

export default MakeCommerceComponent;

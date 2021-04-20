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

import PropTypes from 'prop-types';
import { createRef, PureComponent } from 'react';
import { connect } from 'react-redux';

import MakeCommerce from './MakeCommerce.component';

/** @namespace AdyenGraphql/Component/Adyen/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace AdyenGraphql/Component/Adyen/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace AdyenGraphql/Component/Adyen/Container/AdyenContainer */
export class MakeCommerceContainer extends PureComponent {
    static propTypes = {
        setPaymentMethodBrand: PropTypes.func.isRequired
    };

    state = {
        selectedBrand: null
    };

    containerFunctions = {
        onPaymentBrandSelect: this.onPaymentBrandSelect.bind(this)
    }

    onPaymentBrandSelect(e, selectedBrand) {
        const { setPaymentMethodBrand } = this.props;

        this.setState({selectedBrand});
        setPaymentMethodBrand(selectedBrand);
    }

    render() {
        return (
            <MakeCommerce
                { ...this.props }
                { ...this.state }
                { ...this.containerFunctions }
            />
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    MakeCommerceContainer
);

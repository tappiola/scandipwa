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

import Adyen from './Adyen.component';
import { CREDIT_CARD_TYPE } from './Adyen.config';

/** @namespace AdyenGraphql/Component/Adyen/Container/mapStateToProps */
export const mapStateToProps = () => ({});

/** @namespace AdyenGraphql/Component/Adyen/Container/mapDispatchToProps */
export const mapDispatchToProps = () => ({});

/** @namespace AdyenGraphql/Component/Adyen/Container/AdyenContainer */
export class AdyenContainer extends PureComponent {
    static propTypes = {
        config: PropTypes.shape({
            paymentMethods: PropTypes.shape
        }).isRequired,
        setPaymentMethodData: PropTypes.func.isRequired
    };

    state = {
        details: {}
    };

    checkout = {};

    fieldRef = createRef();

    // setPaymentMethodData = this.setPaymentMethodData.bind(this);

    componentDidMount() {
        const { adyen } = window;
        // eslint-disable-next-line react/prop-types
        const { config: { paymentMethod } } = this.props;
        const { current } = this.fieldRef;
        // eslint-disable-next-line react/prop-types
        const { details = [], brands = [] } = paymentMethod;

        const hasHolderName = details.find(({ key }) => key === 'holderName');
        const holderNameRequired = hasHolderName && !hasHolderName.optional;

        adyen.create(CREDIT_CARD_TYPE, {
            type: CREDIT_CARD_TYPE,
            hasHolderName,
            holderNameRequired,
            brands,
            onChange: this.handleChange.bind(this),
            onBrand: this.handleBrand.bind(this)
        }).mount(current);
    }

    setPaymentMethodData(data) {
        const { setPaymentMethodData } = this.props;

        this.setState(
            ({ details }) => ({ details: { ...details, ...data } }),
            () => {
                const { details } = this.state;
                setPaymentMethodData(details);
            }
        );
    }

    handleChange(state) {
        const {
            data: {
                storePaymentMethod,
                paymentMethod,
                browserInfo
            },
            isValid
        } = state;

        if (!isValid) {
            return;
        }

        const details = {
            storeCc: !!storePaymentMethod,
            ...browserInfo,
            ...paymentMethod
        };

        this.setPaymentMethodData(details);
    }

    handleBrand(state) {
        const { brand: cc_type } = state;

        this.setPaymentMethodData({ cc_type });
    }

    render() {
        return (
            <Adyen
              { ...this.props }
              { ...this.state }
              { ...{ checkout: this.checkout, fieldRef: this.fieldRef } }
            />
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    AdyenContainer
);

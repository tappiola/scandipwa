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

/** @namespace AdyenGraphql/Component/Adyen/Component/AdyenComponent */
export class AdyenComponent extends PureComponent {
    static propTypes = {
        fieldRef: PropTypes.shape({
            current: PropTypes.instanceOf(Element)
        }).isRequired
    };

    render() {
        const { fieldRef } = this.props;

        return <div ref={ fieldRef } />;
    }
}

export default AdyenComponent;

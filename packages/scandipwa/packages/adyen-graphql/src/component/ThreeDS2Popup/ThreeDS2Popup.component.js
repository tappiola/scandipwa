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
import { PureComponent } from 'react';
import { createPortal } from 'react-dom';

import './ThreeDS2Popup.style';

/** @namespace AdyenGraphql/Component/ThreeDS2Popup/Component/ThreeDS2PopupComponent */
export class ThreeDS2PopupComponent extends PureComponent {
    static propTypes = {
        popupRef: PropTypes.shape.isRequired
    };

    render() {
        const { popupRef } = this.props;

        return createPortal((
            <div block="ThreeDS2Popup" elem="Wrapper">
                <div block="ThreeDS2Popup" ref={ popupRef } />
            </div>
        ), document.body);
    }
}

export default ThreeDS2PopupComponent;

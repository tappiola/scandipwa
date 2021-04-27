/* eslint-disable react/jsx-no-bind */
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

import './ResetAttributes.style';

/** @namespace Component/ResetButton/Component */
export class ResetAttributes extends PureComponent {
    static propTypes = {
        toggleCustomFilter: PropTypes.func.isRequired,
        filtersData: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            attribute_code: PropTypes.string.isRequired
        }))).isRequired
    };

    renderSelectedOption(selectedOption) {
        const { toggleCustomFilter } = this.props;
        const { attribute_code, value_string } = selectedOption;
        const onRemove = () => toggleCustomFilter(attribute_code, value_string);

        return (
            <div block="ResetAttributes" elem="AttributeValue" key={ value_string }>
                <div
                  block="ResetAttributes"
                  elem="CloseIcon"
                  role="button"
                  tabIndex="0"
                  onKeyDown={ onRemove }
                  onClick={ onRemove }
                  aria-label={ __('Close') }
                />
                <div block="ResetAttributes" elem="AttributeText">{ selectedOption.label }</div>
            </div>
        );
    }

    renderResetItem(title, selectedOptions) {
        return (
            <>
                <h4>{ title }</h4>
                { selectedOptions.map((o) => this.renderSelectedOption(o)) }
            </>
        );
    }

    render() {
        const { filtersData } = this.props;

        if (filtersData === {}) {
            return null;
        }

        return (
            <div block="ResetAttributes">
                { Object.entries(filtersData).map(([k, v]) => this.renderResetItem(k, v)) }
            </div>
        );
    }
}

export default ResetAttributes;

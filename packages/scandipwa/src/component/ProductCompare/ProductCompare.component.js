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
import { Component } from 'react';

import ProductCompareAttributeRow from 'Component/ProductCompareAttributeRow';
import ProductCompareItem from 'Component/ProductCompareItem';
import ProductPrice from 'Component/ProductPrice';
import { DeviceType } from 'Type/Device.type';
import { ProductItemsType } from 'Type/ProductList.type';
import { getPrice } from 'Util/Product/Extract';

import './ProductCompare.style';

/** @namespace Component/ProductCompare/Component */
export class ProductCompare extends Component {
    static propTypes = {
        clearCompareList: PropTypes.func.isRequired,
        getAttributes: PropTypes.func.isRequired,
        isOutOfStock: PropTypes.func.isRequired,
        isLoading: PropTypes.bool,
        products: ProductItemsType,
        device: DeviceType.isRequired
    };

    static defaultProps = {
        isLoading: false,
        products: []
    };

    shouldComponentUpdate(nextProps) {
        const { products, isLoading } = this.props;
        const { products: nextProducts, isLoading: nextIsLoading } = nextProps;

        return products !== nextProducts || isLoading !== nextIsLoading;
    }

    renderHeading() {
        const { device } = this.props;

        if (device.isMobile) {
            return null;
        }

        return (
            <h1 block="ContactPage" elem="Heading">
                { __('Product compare') }
            </h1>
        );
    }

    renderClearButton() {
        const { clearCompareList } = this.props;

        return (
            <div
              block="ProductCompare"
              elem="FirstColumn"
              mix={ { block: 'ClearButton' } }
            >
                <button
                  block="Button"
                  mods={ { isHollow: true } }
                  onClick={ clearCompareList }
                >
                    { __('Clear Compare') }
                </button>
            </div>
        );
    }

    renderProductCards() {
        const { products, isOutOfStock } = this.props;

        return products.map((product) => (
            <div block="ProductCompare" elem="Item" key={ product.id }>
                <ProductCompareItem
                  product={ product }
                  isOutOfStock={ isOutOfStock }
                />
            </div>
        ));
    }

    renderPriceLabel() {
        return (
            <div
              block="ProductCompareAttributeRow"
              elem="Title"
            >
                { __('Price') }
            </div>
        );
    }

    renderProductPrices() {
        const { products } = this.props;

        return products.map(({
            id,
            price_range: priceRange,
            type_id: type,
            dynamic_price: dynamicPrice = false
        }) => (
            <ProductPrice
              price={ getPrice(priceRange, dynamicPrice, {}, type) }
              key={ id }
              priceType={ type }
              isPreview
            />
        ));
    }

    renderAttributes() {
        const { getAttributes } = this.props;
        const attributes = getAttributes();

        return attributes.map(({ attribute_id, attribute_label, attribute_values }) => (
            <ProductCompareAttributeRow
              title={ attribute_label }
              values={ attribute_values }
              key={ attribute_id }
            />
        ));
    }

    renderProducts() {
        return (
            <div block="ProductCompare">
                <div
                  block="ProductCompare"
                  elem="Row"
                  mix={ { block: 'ProductCardRow' } }
                >
                    { this.renderClearButton() }
                    { this.renderProductCards() }
                </div>
                <div
                  block="ProductCompare"
                  elem="AttributeTable"
                >
                    <div
                      block="ProductCompareAttributeRow"
                    >
                        { this.renderPriceLabel() }
                        <div block="ProductCompareAttributeRow" elem="Values">
                            { this.renderProductPrices() }
                        </div>
                    </div>
                    { this.renderAttributes() }
                </div>
            </div>
        );
    }

    renderEmpty() {
        return (
            <div block="ProductCompare" elem="Empty">
                { __('You have nothing to compare') }
            </div>
        );
    }

    renderContent() {
        const {
            isLoading,
            products
        } = this.props;
        const hasProducts = products && products.length;

        if (isLoading) {
            return null;
        }

        if (!hasProducts) {
            return this.renderEmpty();
        }

        return this.renderProducts();
    }

    render() {
        return (
            <>
            { this.renderHeading() }
            { this.renderContent() }
            </>
        );
    }
}

export default ProductCompare;

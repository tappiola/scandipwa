import { render } from './SearchOverlay.plugin';

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

export const componentDidMount = (args, callback, instance) => {
    const { device: { isMobile } } = instance.props;

    if (isMobile) {
        instance.searchBarRef.current.focus();
    }
};

export default {
    'Component/SearchField/Component': {
        'member-function': {
            componentDidMount
        }
    }
};

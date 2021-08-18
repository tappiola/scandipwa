import { MENU, MY_ACCOUNT, SEARCH } from 'Component/Header/Header.config';
import { ACCOUNT_LOGIN_URL } from 'Route/MyAccount/MyAccount.config';
import { isSignedIn } from 'Util/Auth';
import browserHistory from 'Util/History';
import { appendWithStoreCode } from 'Util/Url';

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

export class HeaderContainerPlugin {
    state = (originalMember) => ({
        ...originalMember,
        isSearchBarActive: false
    });

    containerProps = (args, callback, instance) => {
        const { openSideMenu, closeSideMenu, clearSearchResults } = instance.props;
        const { isSearchBarActive } = instance.state;

        return {
            ...callback.apply(instance, args),
            openSideMenu,
            closeSideMenu,
            isSearchBarActive,
            clearSearchResults
        };
    };

    containerFunctions = (originalMember, instance) => ({
        ...originalMember,
        onMobileMyAccountButtonClick: this.onMobileMyAccountButtonClick.bind(instance),
        onSearchButtonClick: this.onSearchButtonClick.bind(instance),
        onSearchBarDeactivate: this.onSearchBarDeactivate.bind(instance),
        onSearchOutsideClick: this.onSearchOutsideClick.bind(instance)
    });

    onSearchButtonClick() {
        const {
            setNavigationState,
            goToPreviousNavigationState,
            showOverlay,
            updateLoadStatus
        } = this.props;

        this.setState({ isSearchBarActive: true });

        updateLoadStatus(false);
        showOverlay(SEARCH);

        setNavigationState({
            name: SEARCH,
            onBackClick: () => {
                showOverlay(MENU);
                goToPreviousNavigationState();
            }
        });
    }

    onSearchOutsideClick() {
        const {
            goToPreviousNavigationState,
            navigationState: { name },
            device: { isMobile },
            clearSearchResults,
            updateLoadStatus
        } = this.props;

        if (name === SEARCH) {
            if (isMobile) {
                clearSearchResults();
                this.onClearSearchButtonClick();
                updateLoadStatus(false);
                return;
            }

            this.hideSearchOverlay();
            goToPreviousNavigationState();
        }
    }

    onSearchBarDeactivate() {
        this.setState({ isSearchBarActive: false });
        this.hideSearchOverlay();
    }

    onMobileMyAccountButtonClick() {
        const { pathname } = location;
        const url = appendWithStoreCode(isSignedIn() ? `/${ MY_ACCOUNT }` : ACCOUNT_LOGIN_URL);

        if (pathname !== url) {
            browserHistory.push(url);
        }
    }

    onSearchBarFocus(args, callback, instance) {
        const {
            setNavigationState,
            goToPreviousNavigationState,
            showOverlay,
            navigationState: { name },
            device
        } = instance.props;

        if (
            (!device.isMobile && name === SEARCH)
            || (device.isMobile)
        ) {
            return;
        }

        showOverlay(SEARCH);

        setNavigationState({
            name: SEARCH,
            onBackClick: () => {
                showOverlay(MENU);
                goToPreviousNavigationState();
            }
        });
    }
}

const {
    state,
    containerProps,
    containerFunctions,
    onSearchBarFocus
} = new HeaderContainerPlugin();

export default {
    'Component/Header/Container': {
        'member-function': {
            containerProps,
            onSearchBarFocus
        },
        'member-property': {
            state,
            containerFunctions
        }
    }
};

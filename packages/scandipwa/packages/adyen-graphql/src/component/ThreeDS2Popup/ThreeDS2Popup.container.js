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

import { showNotification } from 'Store/Notification/Notification.action';

import AdyenDispatcher from '../../store/Adyen/Adyen.dispatcher';
import ThreeDS2Popup from './ThreeDS2Popup.component';
import { CHALLENGE_SHOPPER, IDENTIFY_SHOPPER } from './ThreeDS2Popup.config';

/** @namespace AdyenGraphql/Component/ThreeDS2Popup/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    threeDS2: state.AdyenReducer.threeDS2,
    challengeType: state.AdyenReducer.challengeType,
    challengeToken: state.AdyenReducer.challengeToken
});

/** @namespace AdyenGraphql/Component/ThreeDS2Popup/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    processThreeDS2: (payload) => AdyenDispatcher.processThreeDS2(dispatch, payload),
    showErrorNotification: (message) => dispatch(showNotification('error', message))
});

/** @namespace AdyenGraphql/Component/ThreeDS2Popup/Container/ThreeDS2PopupContainer */
export class ThreeDS2PopupContainer extends PureComponent {
    static propTypes = {
        threeDS2: PropTypes.bool.isRequired,
        challengeType: PropTypes.string.isRequired,
        challengeToken: PropTypes.string.isRequired,
        processThreeDS2: PropTypes.func.isRequired,
        showErrorNotification: PropTypes.func.isRequired,
        setLoading: PropTypes.func.isRequired
    };

    popupRef = createRef();

    state = {
        isLoading: false
    };

    componentDidUpdate(prevProps) {
        const { challengeType: prevChallengeType } = prevProps;
        const { challengeType } = this.props;

        if (challengeType !== prevChallengeType) {
            this.setLoading(false, this.handleThreeDS2);
        }
    }

    containerProps = () => ({
        popupRef: this.popupRef
    });

    setLoading = (isLoading, callback) => {
        const { setLoading } = this.props;

        setLoading(isLoading);
        this.setState({ isLoading }, callback);
    };

    handleThreeDS2 = () => {
        const {
            challengeType,
            challengeToken,
            processThreeDS2,
            showErrorNotification
        } = this.props;
        const { current } = this.popupRef;
        const { adyen } = window;

        if (challengeType === IDENTIFY_SHOPPER) {
            const threeDS2IdentifyComponent = adyen.create('threeDS2DeviceFingerprint', {
                fingerprintToken: challengeToken,
                onComplete: ({ data }) => {
                    this.setLoading(true);
                    threeDS2IdentifyComponent.unmount();
                    processThreeDS2(data);
                },
                onError: showErrorNotification
            }).mount(current);
        }

        if (challengeType === CHALLENGE_SHOPPER) {
            const threeDS2ChallengeShopper = adyen.create('threeDS2Challenge', {
                challengeToken,
                size: '05',
                onComplete: ({ data }) => {
                    this.setLoading(true);
                    threeDS2ChallengeShopper.unmount();
                    processThreeDS2(data);
                },
                onError: showErrorNotification
            }).mount(current);
        }
    };

    render() {
        const { isLoading } = this.state;
        const { threeDS2 } = this.props;

        if (!threeDS2 || isLoading) {
            return null;
        }

        return (
            <ThreeDS2Popup
              { ...this.props }
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    ThreeDS2PopupContainer
);

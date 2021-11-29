/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/scandipwa
 */

import '../../../../../node_modules/react-datepicker/dist/react-datepicker.css';

import PropTypes from 'prop-types';
import { PureComponent } from 'react';

import { FIELD_DATE_TYPE } from 'Component/DatePicker/DatePicker.config';
import {
    AMPM_FORMAT,
    DEFAULT_MONTH_DAYS,
    HOURS_24H_COUNT,
    MINUTES_COUNT,
    MONTHS_COUNT,
    TIME_FORMAT
} from 'Component/DateSelect/DateSelect.config';
import Field from 'Component/Field';
import FIELD_TYPE from 'Component/Field/Field.config';
import { isMagentoDateFormatValid } from 'Util/Form/Extract';
import { range } from 'Util/Manipulations';

import './DateSelect.style.scss';

/** @namespace Component/DateSelect/Component */
export class DateSelectComponent extends PureComponent {
    static propTypes = {
        type: PropTypes.shape(PropTypes.oneOf(Object.values(FIELD_DATE_TYPE))).isRequired,
        onSetYear: PropTypes.func.isRequired,
        onSetMonth: PropTypes.func.isRequired,
        onSetDay: PropTypes.func.isRequired,
        onSetHours: PropTypes.func.isRequired,
        onSetMinutes: PropTypes.func.isRequired,
        onSetAMPM: PropTypes.func.isRequired,
        selectedYear: PropTypes.string.isRequired,
        selectedMonth: PropTypes.string.isRequired,
        selectedDay: PropTypes.string.isRequired,
        selectedHours: PropTypes.string.isRequired,
        selectedMinutes: PropTypes.string.isRequired,
        selectedAMPM: PropTypes.string.isRequired,
        uid: PropTypes.string.isRequired,
        isRequired: PropTypes.bool.isRequired,
        minYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        maxYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        maxDay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        showDateSelect: PropTypes.bool.isRequired,
        showTimeSelect: PropTypes.bool.isRequired,
        dateFieldsOrder: PropTypes.string.isRequired,
        timeFormat: PropTypes.string.isRequired
    };

    dateMap = {
        d: this.renderDay.bind(this),
        m: this.renderMonth.bind(this),
        y: this.renderYear.bind(this)
    };

    getYearOptions() {
        const { minYear, maxYear } = this.props;

        const yearRange = range(Number(minYear), Number(maxYear));
        return yearRange.map((year) => ({ id: year, value: year, label: year }));
    }

    getMonthOptions() {
        const monthRange = range(1, Number(MONTHS_COUNT));
        return monthRange.map((month) => ({ id: month, value: month, label: month }));
    }

    getDayOptions() {
        const { maxDay } = this.props;

        const dayRange = range(1, Number(maxDay || DEFAULT_MONTH_DAYS));
        return dayRange.map((day) => ({ id: day, value: day, label: day }));
    }

    getHoursOptions() {
        const { timeFormat } = this.props;

        const maxHours = timeFormat.slice(0, -1);
        const hoursRange = range(0, Number(maxHours || HOURS_24H_COUNT));
        return hoursRange.map((hours) => ({ id: hours, value: hours, label: hours }));
    }

    getMinutesOptions() {
        const hoursRange = range(0, MINUTES_COUNT);
        return hoursRange.map((hours) => ({ id: hours, value: hours, label: hours }));
    }

    getAMPMOptions() {
        const ampmRange = Object.values(AMPM_FORMAT);
        return ampmRange.map((option) => ({ id: option, value: option, label: option }));
    }

    renderYear() {
        const {
            uid,
            isRequired,
            type,
            selectedYear,
            onSetYear
        } = this.props;

        return (
            <Field
              type={ FIELD_TYPE.select }
              label={ __('Year') }
              attr={ {
                  id: `${type}-year-${ uid }`,
                  name: uid,
                  selectPlaceholder: __('Year'),
                  value: selectedYear,
                  'data-type': type,
                  'data-field': 'year'
              } }
              options={ this.getYearOptions() }
              events={ {
                  onChange: onSetYear
              } }
              validationRule={ {
                  isRequired
              } }
              validateOn={ ['onChange'] }
            />
        );
    }

    renderMonth() {
        const {
            uid,
            isRequired,
            type,
            selectedMonth,
            onSetMonth
        } = this.props;

        return (
            <Field
              type={ FIELD_TYPE.select }
              label={ __('Month') }
              attr={ {
                  id: `${type}-month-${ uid }`,
                  name: uid,
                  selectPlaceholder: __('Month'),
                  value: selectedMonth,
                  'data-type': type,
                  'data-field': 'month'
              } }
              options={ this.getMonthOptions() }
              events={ {
                  onChange: onSetMonth
              } }
              validationRule={ {
                  isRequired
              } }
              validateOn={ ['onChange'] }
            />
        );
    }

    renderDay() {
        const {
            onSetDay,
            uid,
            isRequired,
            type,
            selectedDay
        } = this.props;

        return (
            <Field
              type={ FIELD_TYPE.select }
              label={ __('Day') }
              attr={ {
                  id: `${type}-day-${ uid }`,
                  name: uid,
                  selectPlaceholder: __('Day'),
                  value: selectedDay,
                  'data-type': type,
                  'data-field': 'day'
              } }
              options={ this.getDayOptions() }
              events={ {
                  onChange: onSetDay
              } }
              validationRule={ {
                  isRequired
              } }
              validateOn={ ['onChange'] }
            />
        );
    }

    renderHours() {
        const {
            onSetHours,
            uid,
            isRequired,
            type,
            selectedHours
        } = this.props;

        return (
            <Field
              type={ FIELD_TYPE.select }
              label={ __('Hours') }
              attr={ {
                  id: `${type}-hours-${ uid }`,
                  name: uid,
                  selectPlaceholder: __('Hours'),
                  value: selectedHours,
                  'data-type': type,
                  'data-field': 'hours'
              } }
              options={ this.getHoursOptions() }
              events={ {
                  onChange: onSetHours
              } }
              validationRule={ {
                  isRequired
              } }
              validateOn={ ['onChange'] }
            />
        );
    }

    renderMinutes() {
        const {
            onSetMinutes,
            uid,
            isRequired,
            type,
            selectedMinutes
        } = this.props;

        return (
            <Field
              type={ FIELD_TYPE.select }
              label={ __('Minutes') }
              attr={ {
                  id: `${type}-minutes-${ uid }`,
                  name: uid,
                  selectPlaceholder: __('Minutes'),
                  value: selectedMinutes,
                  'data-type': type,
                  'data-field': 'minutes'
              } }
              options={ this.getMinutesOptions() }
              events={ {
                  onChange: onSetMinutes
              } }
              validationRule={ {
                  isRequired
              } }
              validateOn={ ['onChange'] }
            />
        );
    }

    renderAMPM() {
        const {
            onSetAMPM,
            uid,
            isRequired,
            type,
            selectedAMPM,
            timeFormat
        } = this.props;

        if (timeFormat !== TIME_FORMAT.H12) {
            return null;
        }

        return (
            <Field
              type={ FIELD_TYPE.select }
              label={ __('AM/PM') }
              attr={ {
                  id: `${type}-ampm-${ uid }`,
                  name: uid,
                  value: selectedAMPM,
                  noPlaceholder: true,
                  'data-type': type,
                  'data-field': 'ampm'
              } }
              options={ this.getAMPMOptions() }
              events={ {
                  onChange: onSetAMPM
              } }
              validationRule={ {
                  isRequired
              } }
              validateOn={ ['onChange'] }
            />
        );
    }

    renderDate() {
        const { dateFieldsOrder, showDateSelect } = this.props;

        if (!showDateSelect) {
            return null;
        }

        if (!isMagentoDateFormatValid(dateFieldsOrder)) {
            return Object.values(this.dateMap).map((renderMethod) => renderMethod());
        }

        return (
<div block="DateSelect" elem="InnerWrapper">
            { dateFieldsOrder.split(',').map((field) => this.dateMap[field]()) }
</div>
        );
    }

    renderTime() {
        const { showTimeSelect } = this.props;

        if (!showTimeSelect) {
            return null;
        }

        return (
<div block="DateSelect" elem="InnerWrapper">
            { this.renderHours() }
            { this.renderMinutes() }
            { this.renderAMPM() }
</div>
        );
    }

    render() {
        return (
            <div block="DateSelect" elem="Wrapper">
                { this.renderDate() }
                { this.renderTime() }
            </div>
        );
    }
}

export default DateSelectComponent;
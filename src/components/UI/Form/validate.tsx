
const isValidArea = (number: string) => {
    if (number) {
        if (typeof number == 'string') {
            let newValue = number.split('_').join('').split('-').join('');
            if (newValue.length == 3) {
                return true;
            }
            else {
                return false;
            }
        } else {
            if (String(number).length == 3) {
                return true;
            } else {
                return false;
            }
        }
    } else {
        return false
    }
}

const isValidZip = (number: string) => {
    if (number) {
        if (typeof number == 'string') {
            let newValue = number.split('_').join('').split('-').join('');
            if (newValue.length < 6 && newValue.length > 0) {
                return true;
            }
            else {
                return false;
            }
        } else {
            if (String(number).length < 6 && String(number).length > 0) {
                return true;
            } else {
                return false;
            }
        }
    } else {
        return false
    }
}
const isValidNumber = (number: string) => {
    if (number) {
        if (typeof number === 'string') {
            let newValue = number.split('_').join('').split('-').join('');
            if (newValue.length == 10) {
                return true;
            }
            else {
                return false;
            }
        } else {
            if (String(number).length === 10) {
                return true;
            } else {
                return false;
            }
        }
    } else {
        return false
    }
}

export default (values: any) => {
    const errors: any = {};

    if (!values.dncSource) {
        errors.dncSource = 'Required DNC Source';
    }

    if (!values.dncNumber && values.dncRuleId === 1) {
        errors.dncNumber = 'Required DNC 10 digits Number';
    }
    if (!values.dncStateRegionAbb && values.dncRuleId === 5 || values.dncRuleId === 6) {
        errors.dncStateRegionAbb = 'Required DNC State';
    }

    if (!values.dncHolidayDateInit && values.dncRuleId === 4 || values.dncRuleId === 6) {
        errors.dncHolidayDateInit = 'an initial date is Required';
    }

    if (!values.dncHolidayDateEnd && values.dncRuleId === 4 || values.dncRuleId === 6) {
        errors.dncHolidayDateEnd = 'an end date is Required';
    }

    if (values.dncHolidayDateEnd < values.dncHolidayDateInit) {
        errors.dncHolidayDateEnd = 'End date must be later than Initial date';
    }

    if (values.dncRuleId === 1 && !values.clientId || values.dncRuleId === 5 && !values.clientId) {
        errors.clientId = 'client is Required';
    }

    if (!values.campaignId && values.dncRuleId === 1 || values.dncRuleId === 5) {
        errors.campaignId = 'campaign is Required';
    }

    if (!values.leadFileName) {
        errors.leadFileName = 'file name is Required';
    }

    if (!values.uploadedFile) {
        errors.uploadedFile = 'lead file is Required';
    }

    if (!values.dncZipCode && values.dncRuleId === 5 || !isValidZip(values.dncZipCode)) {
        if (!values.dncAreaCode || !isValidArea(values.dncAreaCode)) {
            errors.dncAreaCode = 'Required select valid area or Zip Code';
        }
    }

    if (!values.dncAreaCode && values.dncRuleId === 5 || !isValidArea(values.dncAreaCode)) {
        if (!values.dncZipCode || !isValidZip(values.dncZipCode)) {
            errors.dncAreaCode = 'Required select valid area or Zip Code';
        }
    }
    if (!values.prefix) {
        errors.prefix = 'Prefix field must have 0 to 3 characters';
    }
    if (!values.companyDesc) {
        errors.companyDesc = 'companyDesc field is required';
    }

    return errors;
};

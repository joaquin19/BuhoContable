export default (values: any) => {
    const errors: any = {};

    if (!values.employeeName) {
        errors.employeeName = 'Required employee name';
    }

    if (!values.lastName) {
        errors.lastName = 'Required employee last name';
    }

    if (!values.companyId) {
        errors.companyId = 'Required select company';
    }

    if (!values.countryId) {
        errors.countryId = 'Required select country';
    }

    if (!values.zipCode) {
        if (!values.areaId) {
            errors.areaId = 'Required select area or Zip Code';
        }
    } else if (values.zipCode.length > 5) {
        errors.zipCode = 'Zipcode not valid';
    }

    if (!values.areaId) {
        if (!values.zipCode) {
            errors.areaId = 'Required select area or Zip Code';
        } else if (values.zipCode.length > 5) {
            errors.zipCode = 'Zipcode not valid';
        }
    }

    if (!values.rfc) {

    } else if (values.rfc.length !== 13) {
        errors.rfc = 'RFC not valid';
    }

    if (!values.curp) {
        errors.curp = 'Required employee CURP';
    } else if (values.curp.length !== 18) {
        errors.curp = 'CURP not valid';
    }

    if (!values.landLine) {

    } else if (values.landLine.length !== 10) {
        errors.landLine = 'Number not valid';
    }

    if (!values.mobileNumber) {

    } else if (values.mobileNumber.length !== 10) {
        errors.mobileNumber = 'Number not valid';
    }

    if (!values.employeeEmail) {
        errors.employeeEmail = 'Required employee email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.employeeEmail)) {
        errors.employeeEmail = 'Invalid email address';
    }

    if (!values.locationCityId) {
        errors.locationCityId = 'Required select city';
    }
    if (!values.locationId) {
        errors.locationId = 'Required select location';
    }
    if (!values.buildingId) {
        errors.buildingId = 'Required select building';
    }
    if (!values.isleId) {
        errors.isleId = 'Required select isle';
    }
    if (!values.spotId) {
        errors.spotId = 'Required select spot';
    }
    if (!values.positionId) {
        errors.positionId = 'Required select position';
    }

    if (!values.prefix) {
        errors.prefix = 'Prefix field must have 0 to 3 characters';
    }
    if (!values.companyDesc) {
        errors.companyDesc = 'companyDesc field is required';
    }


    return errors;
};

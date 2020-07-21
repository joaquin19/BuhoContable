
const required = value => value ? undefined : 'Required';
const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or max` : undefined;
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined;
const minValue18 = minValue(18);
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined;
const tooOld = value =>
    value && value > 65 ? 'You might be too old for this' : undefined;
const aol = value =>
    value && /.+@aol\.com/.test(value) ?
        'Really? You still use AOL for your email?' : undefined;
const beTrue = value =>
    value === true ? undefined : `Must be accept Terms & Conditions`;

export { required, minLength, maxLength, maxLength15, number, minValue, minValue18, email, tooOld, aol, beTrue };
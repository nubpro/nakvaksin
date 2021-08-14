const REGEX_EMAIL = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const REGEX_PHONE_NUMBER = new RegExp(
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/g
);

function isEmail(username: string): boolean {
    return REGEX_EMAIL.test(username);
}

function isPhoneNumber(username: string): boolean {
    return REGEX_PHONE_NUMBER.test(username);
}

function isUsernameValid(username: string) {
    return isEmail(username) || isPhoneNumber(username);
}

export { isEmail, isPhoneNumber, isUsernameValid, REGEX_EMAIL, REGEX_PHONE_NUMBER };

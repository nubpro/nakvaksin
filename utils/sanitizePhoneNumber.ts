import { isEmail } from './username';

function sanitizePhoneNumber(usernameValue: string): string {
    /**
     * Return because it is Email
     */
    if (isEmail(usernameValue)) {
        return usernameValue;
    }

    let newUsernameValue = usernameValue;
    /**
     * Prefix it with 6 if user enter "012..." without country code (we just assume it's MY number)
     */
    if (newUsernameValue[0] === '0') {
        newUsernameValue = '6' + newUsernameValue;
    }

    newUsernameValue = newUsernameValue.replace(/^\+60/, '60');
    newUsernameValue = newUsernameValue.replace(/-/g, '');
    newUsernameValue = newUsernameValue.replace(/ /g, '');
    return newUsernameValue;
}

export default sanitizePhoneNumber;

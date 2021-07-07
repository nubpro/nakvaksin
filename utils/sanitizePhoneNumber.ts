function sanitizePhoneNumber(usernameValue: string): string {
    /**
     * Return because it is Email
     */
    if (usernameValue.includes('@')) {
        return usernameValue;
    }

    let newUsernameValue = usernameValue;
    /**
     * Prefix it with 6 if user enter "012..." without country code (we just assume it's MY number)
     */
    if (newUsernameValue[0] === '0') {
        newUsernameValue = '6' + newUsernameValue;
    }

    newUsernameValue = newUsernameValue.replace('+60', '60');
    newUsernameValue = newUsernameValue.replaceAll('-', '');
    newUsernameValue = newUsernameValue.replaceAll(' ', '');
    return newUsernameValue;
}

export default sanitizePhoneNumber;

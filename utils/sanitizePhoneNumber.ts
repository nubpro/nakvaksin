function sanitizePhoneNumber(usernameValue: string): string {
    const isEmail = usernameValue.includes('@');
    let newUsernameValue = usernameValue;

    if (isEmail) {
        return usernameValue;
    } else {
        // Prefix it with 6 if user enter "012..." without country code (we just assume it's MY number)
        if (newUsernameValue[0] === '0') {
            newUsernameValue = '6' + newUsernameValue;
        }

        // TODO: maybe only check the first 3 characters only for sanity
        if (newUsernameValue.includes('+60')) {
            newUsernameValue = newUsernameValue.replace('+60', '60');
        }

        newUsernameValue.replace(/\-/g, '');
        newUsernameValue.replace(/\s/g, ''); // replace space

        return newUsernameValue;
    }
}

export default sanitizePhoneNumber;

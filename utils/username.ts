function isEmail(username: string): boolean {
    return username.includes('@');
}

function isPhoneNumber(username: string): boolean {
    const regex = new RegExp(/^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g);
    return regex.test(username);
}

function isUsernameValid(username: string) {
    return isEmail(username) || isPhoneNumber(username);
}

export { isEmail, isPhoneNumber, isUsernameValid };

function isEmail(username: string): boolean {
    const regex = new RegExp(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    return regex.test(username);
}

function isPhoneNumber(username: string): boolean {
    const regex = new RegExp(/^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g);
    return regex.test(username);
}

function isUsernameValid(username: string) {
    return isEmail(username) || isPhoneNumber(username);
}

export { isEmail, isPhoneNumber, isUsernameValid };

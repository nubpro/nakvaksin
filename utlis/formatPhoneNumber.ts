function formatPhoneNumber(usernameValue: string): string {
    const isMobile = usernameValue.includes('@');
    let temp = usernameValue;

    if (!isMobile) return usernameValue;
    if (temp[0] === '0') temp = '6' + temp;
    if (temp.includes('+60')) temp = temp.replace('+60', '60');
    if (temp.includes('-')) temp = temp.replaceAll('-', '');
    if (temp.includes(' ')) temp = temp.replaceAll(' ', '');

    return temp;
}

export default formatPhoneNumber;

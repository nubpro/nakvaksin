async function requestInit() {
    const url = 'https://m2umobile.maybank2u.com.my/RMBPMY/apps/services/api/RMBP/iphone/init';
    const headers = {
        Host: 'm2umobile.maybank2u.com.my:443',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-wl-app-version': '8.5',
        'x-wl-platform-version': '6.0.0',
        'Accept-Language': 'en-GB,en;q=0.9',
        'User-Agent': 'M2U%20MY/1.0 CFNetwork/1312 Darwin/21.0.0',
        Cookie: ''
    };

    const res = await fetch(url, {
        method: 'POST',
        headers
    });

    const raw = await res.text();
    const cleaned = await raw.replace('/*-secure-', '').replace('*/', '');
    const data = JSON.parse(cleaned);

    const cookies = res.headers.get('set-cookie').replace(/,/g, ';');
    const instanceId = data['challenges']['wl_antiXSRFRealm']['WL-Instance-Id'];
    const deviceToken = data['challenges']['wl_deviceNoProvisioningRealm']['token'];

    return { cookies, instanceId, deviceToken };
}

export default async function handler(req, res) {
    const init_result = await requestInit();

    res.status(200).json(init_result);
}

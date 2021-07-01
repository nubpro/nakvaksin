## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory agre treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## How MySejahtera Authentication Works

_A. Token Authentication Method_

1. Login to MySejahtera API
2. A token is returned (`x-auth-token` from response header)
3. This token expires within 3 days
4. Pass the token when making MySejahtera API request. In the response header, a new `x-auth-token` is returned.
5. Save that token on the client to ensure token validity.

_B. Login with Basic Auth_
To be documented soon, not something we may need to know?

## Backend Architecture

I've drafted out the backend architecture based on AWS infra as I was planning to have it there using [Serverless Framework](https://www.serverless.com/). I believe there are some gaps here and there, I have quite some doubt myself

You can check out `/backend/` directory. It is still in a very rough stage, I honestly wont mind you scrap the whole thing and do it over

![image](https://user-images.githubusercontent.com/762914/123636048-fab2c280-d84e-11eb-9388-011dd9077da2.png)

## MySejahtera API

#### 1. Login

Request:

```
curl --location --request POST 'https://mysejahtera.malaysia.gov.my/epms/login' \
--header 'Content-Type: multipart/form-data;boundary=31' \
--header 'Host: mysejahtera.malaysia.gov.my' \
--form 'username="60123456789"' \
--form 'password="<INSERT YOUR PASSWORD>"'
```

Response:

-   `X-AUTH-TOKEN` in header

---

#### 2. Get user profile

Request:

```
curl --location --request GET 'https://mysejahtera.malaysia.gov.my/epms/v1/mobileApp/vaccinationEmployeeInfo' \
--header 'x-auth-token: <INSERT YOUR X-AUTH-TOKEN>' \
```

Response:

-   `X-AUTH-TOKEN` in header
<details>
  <summary>View body returned</summary>

```json
{
    "employeeInfo": {
        "employeeId": "F36D245FB41354E17DC2C8816FD18AFA892XXXXXXX",
        "displayName": "<YOUR FULL NAME>",
        "imageUrl": null,
        "employeeCode": "60123456789",
        "email": null,
        "userName": "60123456789",
        "designation": "Low Risk No Symptom",
        "designationCode": "LOW_RISK_NS",
        "organizationName": "Selangor",
        "localeName": "en_US",
        "primarySupervisor": {
            "id": "F36D245FB41354E17DC2C8816FXXXXXXXX",
            "empCode": "EMP1",
            "displayName": "CPRC KKM",
            "imageUrl": "https://mysejahtera.malaysia.gov.my/epms/noAuth/image/27/EMPLOYEE_IMAGE/267_27_bc104428-84df-41c8-xxxx.jpg",
            "email": "cdcmalaysiaa@gmail.com",
            "userName": "cdcmalaysiaa@gmail.com"
        },
        "secSupervisorList": [],
        "theme": {
            "primaryrgb": "rgb(58,131,255)",
            "headerrgb": "rgb(58,131,255)"
        },
        "lastModifiedOn": 1596436824000,
        "location": {
            "lat": 6.021034052466086,
            "lng": 116.12464023715202,
            "imageUrl": "/images/lowRisk.png"
        },
        "phoneNumber": "60123456789",
        "licenceNumber": "<YOUR IC NUMBER>",
        "postcode": "<YOUR POSTCODE>",
        "address": "<YOUR ADDRESS>",
        "homeLocation": null,
        "hasHighRiskDependents": null,
        "isInterested": true,
        "firstLogin": false,
        "isDemoUser": false,
        "isTodoEnabled": true,
        "isScorecardHistoryEnabled": false,
        "showDisplayPictureAsTenantLogo": false,
        "canShare": false,
        "canDiscuss": false,
        "hasTeam": false,
        "analyticsEnabled": false,
        "eligibleForVaccine": false,
        "selfVerified": true,
        "nonVaccinationAccount": false,
        "passportNumber": null,
        "dateOfBirth": null,
        "tenantImageUrl": "https://mysejahtera.malaysia.gov.my/epms/noAuth/image/27/TENANT_IMAGE/27_2750d863-e6ce-450b-8d4e-dxxxb.png",
        "tenantFont": null,
        "tenantLogoUrl": "https://mysejahtera.malaysia.gov.my/epms/noAuth/image/27/TENANT_LOGO/27_9439be0d-b332-4fa1-b527-d0c3cb9b727cxxxPinA.png",
        "tenantName": "MySejahtera",
        "tenantLoaderUrl": null,
        "verificationStatus": "NOT_YET_STARTED",
        "editableFields": ["IMAGE", "DOB", "PASSPORT_NUMBER"]
    },
    "vaccineDependents": []
}
```

</details>

---

#### 3. Get personal vax status

```
curl --location --request GET 'https://mysejahtera.malaysia.gov.my/epms/v1/mobileApp/vaccination/processFlow' \
--header 'Accept-Language: en-MY;q=1, zh-Hans-MY;q=0.9' \
--header 'User-Agent: MySejahtera/1.0.36 (iPhone; iOS 14.4.2; Scale/2.00)' \
--header 'Connection: keep-alive' \
--header 'Content-Type: application/json' \
--header 'Host: mysejahtera.malaysia.gov.my' \
--header 'x-auth-token: <INSERT YOUR X-AUTH-TOKEN>' \
```

Response:

-   `X-AUTH-TOKEN` in header
<details>
  <summary>View body returned</summary>

```json
[
    {
        "timestamp": "03-Mar",
        "headerText": {
            "ms_MY": "Berdaftar",
            "en_US": "Registered"
        },
        "state": "COMPLETED",
        "data": [
            {
                "text": {
                    "ms_MY": "Notis:",
                    "en_US": "Note:"
                },
                "value": "Anda telah berjaya mendaftar untuk Program Imunisasi COVID-19 Kebangsaan. Langkah seterusnya akan dibuka setelah anda layak untuk menerima vaksinasi seperti yang dirancang oleh kerajaan. / You have successfully registered for the vaccination program. The next steps will be enabled once you become eligible as per the National Immunization Plan"
            }
        ],
        "action": []
    },
    {
        "timestamp": "04-Jun",
        "headerText": {
            "ms_MY": "Penilaian",
            "en_US": "Assessment"
        },
        "state": "ACTIVE",
        "data": [],
        "action": [
            {
                "text": {
                    "ms_MY": "1. Kemaskini maklumat pendaftaran anda",
                    "en_US": "1. Update your registration details"
                },
                "value": "PRE_SCREENING_ASSESSMENT"
            },
            {
                "text": {
                    "ms_MY": "2. Kemaskini alamat tempat tinggal semasa anda",
                    "en_US": "2. Update your home address"
                },
                "value": "UPDATE_ADDRESS_ASSESSMENT"
            },
            {
                "text": {
                    "ms_MY": "3. Klik jika hamil / menyusukan anak",
                    "en_US": "3. Click if pregnant / breastfeeding"
                },
                "value": "PREGNANCY_ASSESSMENT"
            }
        ]
    },
    {
        "timestamp": null,
        "headerText": {
            "ms_MY": "Layak untuk vaksinasi?",
            "en_US": "Eligible for vaccine?"
        },
        "state": "PENDING",
        "data": [],
        "action": []
    },
    {
        "timestamp": null,
        "headerText": {
            "ms_MY": "Temu janji Dos 1",
            "en_US": "1st Dose appointment"
        },
        "state": "PENDING",
        "data": [],
        "action": []
    },
    {
        "timestamp": null,
        "headerText": {
            "ms_MY": "Dos 1 selesai",
            "en_US": "1st Dose completed"
        },
        "state": "PENDING",
        "data": [],
        "action": []
    },
    {
        "timestamp": null,
        "headerText": {
            "ms_MY": "Temu janji Dos 2",
            "en_US": "2nd Dose appointment"
        },
        "state": "PENDING",
        "data": [],
        "action": []
    },
    {
        "timestamp": null,
        "headerText": {
            "ms_MY": "Dos 2 selesai",
            "en_US": "2nd Dose completed"
        },
        "state": "PENDING",
        "data": [],
        "action": []
    },
    {
        "timestamp": null,
        "headerText": {
            "ms_MY": "Sijil digital dikeluarkan",
            "en_US": "Digital certificate issued"
        },
        "state": "PENDING",
        "data": [],
        "action": []
    }
]
```

</details>
  
---
  
#### 4. Forgot password
  
```
curl --location --request POST 'https://mysejahtera.malaysia.gov.my/register/forgotPassword' \
--header 'Connection: keep-alive' \
--header 'Accept-Language: en-MY;q=1, zh-Hans-MY;q=0.9' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
--header 'Content-Length: 33' \
--header 'User-Agent: MySejahtera/1.0.36 (iPhone; iOS 14.4.2; Scale/2.00)' \
--header 'Host: mysejahtera.malaysia.gov.my' \
--data-raw '{"emailOrUserName":"60143516633"}'
```

Response:

-   `200` status code if success

---

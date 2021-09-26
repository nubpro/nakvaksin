import React from 'react';

import Header from '../components/header';

export default function Closing() {
    return (
        <>
            <Header />
            <div className="h-screen py-4 w-full px-14">
                <div className="text-center">
                    <h1 className="text-3xl">Nak Vaksin Is Closing Down ...</h1>
                </div>
                <hr className="w-full" />
                <div className="container sm:w-2/3 mx-auto mt-4 text-justify">
                    <p>
                        With the vast majority of Malaysian are vaccinated, we think it is the time
                        that NakVaksin had fulfill its duty and responsibility to serve Malaysian to
                        get their vaccination. As such, we decided to shutting down NakVaksin on{' '}
                        <strong>
                            3 <sup>rd</sup> of October 2021.
                        </strong>
                    </p>
                    <p>
                        For those who are receiving notification from NakVaksin, or received
                        vaccination, we sincerely hope the best of health will be upon with you.
                    </p>
                    <p>
                        Lastly, on behalf of the team, thank you for using our service and make
                        Malaysia a better and safer place.
                    </p>
                    <br />
                    <p className="text-right">
                        Regards, <br />
                        Nakvaksin
                    </p>
                </div>
            </div>
        </>
    );
}

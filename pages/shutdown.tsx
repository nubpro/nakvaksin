import React from 'react';

import Footer from '../components/footer';
import Header from '../components/header';

export default function Closing() {
    return (
        <>
            <Header />
            <div className="py-4 w-full px-14">
                <div className="text-center">
                    <h1 className="text-3xl">End of Service for NakVaksin</h1>
                </div>

                <div className="container sm:w-2/3 mx-auto mt-4 text-justify space-y-2">
                    <p>
                        When we build NakVaksin we have a common goal - To ensure all Malaysian
                        received their vaccination on schedule. Day by day, we are inching closer to
                        have everybody vaccinated. With at least 83% of adults vaccinated as of 26
                        Sept, we think this is the right time to end NakVaksin services.
                    </p>
                    <p>
                        On <strong>3rd October 2021</strong>, we will begin terminating our services
                        and hence, you will stop receiving any further notification from us. All
                        data stored will be erased permanently from our database. The source codes
                        will remain open and available on our{' '}
                        <a href="https://github.com/nubpro/nakvaksin" className="underline">
                            GitHub repo
                        </a>{' '}
                        publicly for free.
                    </p>
                    <p>
                        Lastly, on behalf of the team, thank you for using our service and also for
                        completing your doses, it is with you that Malaysia is a better and safer
                        place.
                    </p>
                    <br />
                    <p className="text-right">
                        Regards, <br />
                        NakVaksin Team
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
}

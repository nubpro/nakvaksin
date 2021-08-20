import React from 'react';

import Footer from '../components/footer';
import Header from '../components/header';

export default function Privacy() {
    return (
        <>
            <Header />
            <div className="container mx-auto px-4 pt-5">
                <h1 className="text-2xl mb-4">Privacy Policy for NakVaksin</h1>

                <p className="mb-2">
                    At NakVaksin, accessible from https://nakvaksin.com, one of our main priorities
                    is the privacy of our visitors. This Privacy Policy document contains types of
                    information that is collected and recorded by NakVaksin and how we use it.
                </p>

                <p className="mb-2">
                    If you have additional questions or require more information about our Privacy
                    Policy, do not hesitate to contact us.
                </p>

                <p className="mb-2">
                    This Privacy Policy applies only to our online activities and is valid for
                    visitors to our website with regards to the information that they shared and/or
                    collect in NakVaksin. This policy is not applicable to any information collected
                    offline or via channels other than this website. Our Privacy Policy was created
                    with the help of the{' '}
                    <a href="https://www.termsfeed.com/privacy-policy-generator/">
                        TermsFeed Privacy Policy Generator
                    </a>
                    .
                </p>

                <h2 className="font-bold text-medium mt-4">Consent</h2>

                <p className="mb-2">
                    By using our website, you hereby consent to our Privacy Policy and agree to its
                    terms.
                </p>

                <h2 className="font-bold text-medium mt-4">Information we collect</h2>

                <p className="mb-2">
                    The personal information that you are asked to provide, and the reasons why you
                    are asked to provide it, will be made clear to you at the point we ask you to
                    provide your personal information.
                    <br />
                    <br />
                    We collect these data from MySejahtera to service our app:
                    <br />
                    1. Your name
                    <br />
                    2. Your mobile number
                    <br />
                    3. Your e-mail address
                    <br />
                    4. Your MySejahtera ID
                    <br />
                    5. Your vaccination appointments (including the status, date, time and venue)
                </p>

                <h2 className="font-bold text-medium mt-4">How we use your information</h2>

                <p className="mb-2">
                    We use the information we collect in various ways, including to:
                </p>

                <ul>
                    <li>Provide, operate, and maintain our website</li>
                    <li>Improve, personalize, and expand our website</li>
                    <li>Develop new products, services, features, and functionality</li>
                    <li>
                        Communicate with you, either directly or through one of our partners,
                        including for customer service, to provide you with updates and other
                        information relating to the website, and for marketing and promotional
                        purposes
                    </li>
                    <li>Send you emails</li>
                    <li>Find and prevent fraud</li>
                </ul>

                <h2 className="font-bold text-medium mt-4">Log Files</h2>

                <p className="mb-2">
                    NakVaksin follows a standard procedure of using log files. These files log
                    visitors when they visit websites. All hosting companies do this and a part of
                    hosting services' analytics. The information collected by log files include
                    internet protocol (IP) addresses, browser type, Internet Service Provider (ISP),
                    date and time stamp, referring/exit pages, and possibly the number of clicks.
                    These are not linked to any information that is personally identifiable. The
                    purpose of the information is for analyzing trends, administering the site,
                    tracking users' movement on the website, and gathering demographic information.
                </p>

                <h2 className="font-bold text-medium mt-4">Cookies and Web Beacons</h2>

                <p className="mb-2">
                    Like any other website, NakVaksin uses 'cookies'. These cookies are used to
                    store information including visitors' preferences, and the pages on the website
                    that the visitor accessed or visited. The information is used to optimize the
                    users' experience by customizing our web page content based on visitors' browser
                    type and/or other information.
                </p>

                <p className="mb-2">
                    For more general information on cookies, please read{' '}
                    <a href="https://www.generateprivacypolicy.com/#cookies">
                        "Cookies" article from the Privacy Policy Generator
                    </a>
                    .
                </p>

                <h2 className="font-bold text-medium mt-4">
                    Advertising Partners Privacy Policies
                </h2>

                <p className="mb-2">
                    You may consult this list to find the Privacy Policy for each of the advertising
                    partners of NakVaksin.
                </p>

                <p className="mb-2">
                    Third-party ad servers or ad networks uses technologies like cookies,
                    JavaScript, or Web Beacons that are used in their respective advertisements and
                    links that appear on NakVaksin, which are sent directly to users' browser. They
                    automatically receive your IP address when this occurs. These technologies are
                    used to measure the effectiveness of their advertising campaigns and/or to
                    personalize the advertising content that you see on websites that you visit.
                </p>

                <p className="mb-2">
                    Note that NakVaksin has no access to or control over these cookies that are used
                    by third-party advertisers.
                </p>

                <h2 className="font-bold text-medium mt-4">Third Party Privacy Policies</h2>

                <p className="mb-2">
                    NakVaksin's Privacy Policy does not apply to other advertisers or websites.
                    Thus, we are advising you to consult the respective Privacy Policies of these
                    third-party ad servers for more detailed information. It may include their
                    practices and instructions about how to opt-out of certain options.{' '}
                </p>

                <p className="mb-2">
                    You can choose to disable cookies through your individual browser options. To
                    know more detailed information about cookie management with specific web
                    browsers, it can be found at the browsers' respective websites.
                </p>

                <h2 className="font-bold text-medium mt-4">Children's Information</h2>

                <p className="mb-2">
                    Another part of our priority is adding protection for children while using the
                    internet. We encourage parents and guardians to observe, participate in, and/or
                    monitor and guide their online activity.
                </p>

                <p className="mb-2">
                    NakVaksin does not knowingly collect any Personal Identifiable Information from
                    children under the age of 13. If you think that your child provided this kind of
                    information on our website, we strongly encourage you to contact us immediately
                    and we will do our best efforts to promptly remove such information from our
                    records.
                </p>
            </div>

            <Footer />
        </>
    );
}

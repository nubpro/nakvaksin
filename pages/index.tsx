import Link from 'next/link';

import Header from '../components/header';

export default function Home() {
    return (
        <div className="container mx-auto px-4 pt-5">
            <Header />

            <div className="text-center">
                <div className="leading-snug text-base">
                    Tiap-tiap hari check MySejahtera?
                    <br />
                    Missed appointment?
                    <br />
                    BILA AKU BOLEH KENA CUCUK!?
                    <br />
                    Tak ade SMS?
                    <br />
                    Mana tu notification?
                    <br />
                    MySejahtera hang?
                </div>
            </div>

            <div className="mt-10 text-center">
                <Link href="/subscribe">
                    <a className="rounded-full bg-green-500 inline-block text-white px-5 py-5 lg:px-10 focus:outline-none focus:ring-4 hover:bg-green-600 transition-colors">
                        I nak SMS when appointment is ready{' '}
                        {/* <span role="img" aria-label="sms">
                            💬
                        </span> */}
                    </a>
                </Link>
            </div>
        </div>
    );
}

import Link from 'next/link';

import Header from '../components/header';

export default function Home() {
    return (
        <div>
            <div
                className="bg-cover bg-center absolute z-0 h-screen bg-no-repeat"
                style={{
                    backgroundImage: `url('http://preview.uxtheme.website/xpider-preview/xpider/img/hero-8.png')`
                }}
            />
            <div
                className="z-0 opacity-90 w-full h-full absolute"
                style={{
                    background: `linear-gradient(-45deg, #2f1ce0 0%, #53a0fd 50%, #51eca5 100%)`
                }}
            />
            ;
            <div className="absolute w-full flex flex-col">
                <div
                    className="bg-bottom bg-no-repeat bg-cover h-screen"
                    style={{
                        backgroundImage:
                            "url('https://galaxy.up.video/media/backgrounds/bg-curve.svg')"
                    }}>
                    <Header />
                    <section className="w-full ">
                        <div className="container mx-auto flex md:flex-row sm:items-center xl:pb-16 xl:px-0 px-4">
                            <div className="w-1/2 text-white md:flex md:flex-col md:space-y-6">
                                <h1 className="sm:text-5xl text-xl font-weight-bolder sm:mb-4 text-black md:text-white">
                                    Tiap-tiap hari check MySejahtera?
                                </h1>
                                <h2 className="sm:text-2xl text-base mb-2 text-black md:text-white">
                                    Missed appointment?
                                </h2>
                                <p className="text-xs sm:text-base text-black md:text-white">
                                    BILA AKU BOLEH KENA CUCUK!?
                                </p>
                                <div className="xl:mt-4 mt-8 flex flex">
                                    <Link href="/subscribe">
                                        <button className="w-4/5 md:w-full py-8 md:px-8 md:py-4 rounded-3xl bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                                            I nak SMS when appointment is ready{' 💬 '}
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className="w-1/2 xl:pt-8 xl:items-center flex justify-end">
                                <img
                                    className="xl:w-2/5"
                                    alt="Screenshot of Mobile phone of this application"
                                    src="phone.png"
                                />
                            </div>
                        </div>
                    </section>
                </div>
                <div className="bg-white pb-8 w-full pt-8">
                    <div className="container mx-auto">
                        <div className="text-center w-full pb-16">
                            <h3 className="uppercase text-gray-800">Kenapa this app?</h3>
                            <p className="sm:text-3xl text-2xl text-black-800 pt-4 xl:w-1/2 mx-auto">
                                A simple, easier way to get notified on your appointment.
                            </p>
                        </div>
                        <div className="flex sm:flex-row flex-col w-full xl:mt-12 mb-12 xl:px-0 px-4">
                            <div className="sm:w-1/3 mb-8 sm:mb-0 xl:pr-0 pr-2">
                                <div className="flex flex-wrap mb-4 mt-0">
                                    <div className="w-1/6 items-center mx-auto">
                                        <img
                                            src="https://img.icons8.com/material-outlined/48/000000/appointment-reminders--v2.png"
                                            alt="Notification Icon"
                                        />
                                    </div>
                                    <div className="w-5/6">
                                        <h4 className="text-black items-center xl:text-2xl capitalize">
                                            Better Notification
                                        </h4>
                                    </div>
                                </div>
                                <div className="leading-relaxed pr-4">
                                    <p>
                                        <b className="font-normal text-blue-600">
                                            No more Checking MySejahtera.
                                        </b>{' '}
                                    </p>
                                    <p>
                                        Now, this software will send you an SMS when your
                                        appointment is ready.
                                    </p>
                                </div>
                            </div>
                            <div className="sm:w-1/3 mb-8 sm:mb-0 xl:pr-0 pr-2">
                                <div className="flex flex-wrap mb-4">
                                    <div className="w-1/6 items-center mx-auto">
                                        <img
                                            src="https://img.icons8.com/material-rounded/48/000000/family.png"
                                            alt="Family Icon"
                                        />
                                    </div>
                                    <div className="w-4/5">
                                        <h4 className="text-black items-center xl:text-2xl capitalize">
                                            Inform your family
                                        </h4>
                                    </div>
                                </div>
                                <div className="leading-relaxed pr-4">
                                    <p>
                                        <b className="font-normal text-blue-600 ">
                                            Notify Your Love one that your appointment is ready
                                        </b>{' '}
                                    </p>
                                    <p>
                                        Getting a jab is not a single person job. Let your family
                                        knowing that your vaccine appointment is prepared to make
                                        you arrange your schedule easily.
                                    </p>
                                </div>
                            </div>
                            <div className="sm:w-1/3 mb-8 sm:mb-0 xl:pr-0 pr-2">
                                <div className="flex flex-wrap mb-4">
                                    <div className="w-1/6 items-center mx-auto">
                                        <img
                                            src="https://img.icons8.com/material-outlined/48/000000/money--v2.png"
                                            alt="Money Icon"
                                        />
                                    </div>
                                    <div className="w-4/5">
                                        <h4 className="text-black items-center xl:text-2xl">
                                            Not A Multi Billion Project
                                        </h4>
                                    </div>
                                </div>
                                <div className="leading-relaxed pr-4">
                                    <p>
                                        <b className="font-normal text-blue-600">
                                            No more wasting rakyat's money
                                        </b>
                                    </p>
                                    It is made open-source, the developer made it with the hope that
                                    our country will get better in days.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <footer className=" text-center py-8 border-t border-gray-200 text-xs text-gray-700 w-full">
                        <a href="https://icons8.com/icon/AszNi9Jvemeu/notification">
                            Notification icon by Icons8
                        </a>
                        <br />
                        <a href="https://icons8.com/icon/t2abv2VHiC8x/money">
                            Money icon by Icons8
                        </a>
                        <br />
                        <a href="https://icons8.com/icon/86222/family">Family icon by Icons8</a>
                    </footer>
                </div>
            </div>
        </div>
    );
}

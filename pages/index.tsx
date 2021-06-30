import Link from 'next/link';
import Image from 'next/image';
import { GiHumanPyramid } from 'react-icons/gi';
import { IoHeartCircleOutline, IoNotificationsOutline, IoLogoGithub } from 'react-icons/io5';

import Header from '../components/header';

export default function Home() {
    return (
        <div>
            <div
                className="z-0 opacity-90 w-full h-full absolute"
                style={{
                    background: `linear-gradient(-45deg, #2f1ce0 0%, #53a0fd 50%, #51eca5 100%)`
                }}
            />

            <div className="absolute w-full flex flex-col">
                <div
                    className="bg-bottom bg-no-repeat bg-cover min-h-screen"
                    style={{
                        backgroundImage: "url('bg-curve.svg')"
                    }}>
                    <Header />
                    <section className="w-full">
                        <div className="container flex flex-col items-center px-5 mx-auto sm:flex-row ">
                            <div className="w-full lg:flex-grow lg:w-3/5 flex flex-col items-start min-h-full text-left space-y-8 mt-12  sm:px-8">
                                <h1 className="text-4xl font-bold tracking-tighter text-white lg:text-6xl title-font">
                                    Tiap-tiap hari check MySejahtera?
                                </h1>

                                <p className="w-full text-xl text-left text-white">
                                    Missed appointment?
                                </p>
                                <p className="w-full text-xl text-left text-white">
                                    BILA AKU BOLEH KENA CUCUK!?
                                </p>
                                <div className="flex flex-col justify-center lg:flex-row pb-8">
                                    <Link href="/subscribe">
                                        <button className="w-full py-8 px-8 md:py-4 md:px-12 rounded-3xl bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2">
                                            I nak SMS when appointment is ready{' 💬 '}
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            <div className="sm:flex lg:w-5/6 lg:max-w-lg sm:w-1/2 flex justify-end ">
                                <Image src="/phone.png" width={282} height={572} />
                            </div>
                        </div>
                    </section>
                </div>
                <div className="bg-white pb-8 w-full pt-8">
                    <div className="container mx-auto px-8 md:px-0">
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
                                        <IoNotificationsOutline size={48} />
                                    </div>
                                    <div className="w-5/6">
                                        <h4 className="text-black items-center xl:text-2xl">
                                            Guaranteed notification
                                        </h4>
                                    </div>
                                </div>
                                <div className="leading-relaxed pr-4">
                                    <p>
                                        <b className="font-normal text-blue-600">
                                            Don&apos;t worry, we are not as forgetful
                                        </b>
                                    </p>
                                    <p>
                                        We promise that you will receive an SMS from us if your
                                        vaccination appointment is ready or even changed.
                                    </p>
                                </div>
                            </div>
                            <div className="sm:w-1/3 mb-8 sm:mb-0 xl:pr-0 pr-2">
                                <div className="flex flex-wrap mb-4">
                                    <div className="w-1/6 items-center mx-auto">
                                        <IoHeartCircleOutline size={48} />
                                    </div>
                                    <div className="w-4/5">
                                        <h4 className="text-black items-center xl:text-2xl">
                                            Care for your loved one
                                        </h4>
                                    </div>
                                </div>
                                <div className="leading-relaxed pr-4">
                                    <p>
                                        <b className="font-normal text-blue-600">
                                            Get up to speed with your family member&apos;s vaccine
                                            appointment updates
                                        </b>
                                    </p>
                                    <p>
                                        Keep an eye out for your grandparents, parents and even
                                        childrens when their appointed is set up.
                                    </p>
                                </div>
                            </div>
                            <div className="sm:w-1/3 mb-8 sm:mb-0 xl:pr-0 pr-2">
                                <div className="flex flex-wrap mb-4">
                                    <div className="w-1/6 items-center mx-auto">
                                        <GiHumanPyramid size={48} />
                                    </div>
                                    <div className="w-4/5">
                                        <h4 className="text-black items-center xl:text-2xl">
                                            Made by Malaysians for everyone
                                        </h4>
                                    </div>
                                </div>
                                <div className="leading-relaxed pr-4">
                                    <p>
                                        <b className="font-normal text-blue-600">
                                            We do what we can, we are in this together
                                        </b>
                                    </p>
                                    This is an open-source initiative by Malaysians. Your
                                    contributions and donations are very welcomed.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <footer className="text-center py-8 border-t border-gray-200 text-xs text-gray-700 w-full">
                        An initiative by Malaysians for everyone
                        <div className="mt-1">
                            <a href="https://github.com/nubpro/nakvaksin">
                                <IoLogoGithub size={20} className="inline-block" />
                            </a>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}

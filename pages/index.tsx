import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import { GiHumanPyramid } from 'react-icons/gi';
import { IoHeartCircleOutline, IoLogoGithub, IoNotificationsOutline } from 'react-icons/io5';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import Header from '../components/header';
import { useUser } from '../hooks/useUser';

const CallToActionButton = () => {
    const { user } = useUser();
    const redirectUrl = user ? '/dashboard' : '/login';

    return (
        <div>
            <Link href={redirectUrl}>
                <button className="w-full py-8 px-8 md:py-4 md:px-12 rounded-3xl bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2">
                    I nak SMS when appointment is ready{' 💬 '}
                </button>
            </Link>
        </div>
    );
};

const FeaturedItem = ({
    icon,
    title,
    subtitle,
    description
}: {
    icon: ReactElement;
    title: string;
    subtitle: string;
    description: string;
}) => (
    <div className="flex-1 mb-8 lg:px-4">
        <div className="flex items-center mb-1 xl:mb-3">
            <div>{icon}</div>
            <div className="ml-3 text-black font-medium xl:text-2xl">{title}</div>
        </div>
        <div className="leading-relaxed pr-4">
            <div className="font-normal text-blue-600 ">{subtitle}</div>
            <div>{description}</div>
        </div>
    </div>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();

    const { userProfile } = context.req.cookies;
    if (userProfile) {
        queryClient.setQueryData('user', JSON.parse(userProfile));
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    };
};

export default function Home() {
    return (
        <div>
            <div
                className="z-0 opacity-90 w-full h-full absolute"
                style={{
                    background: `linear-gradient(-45deg, #2f1ce0 0%, #53a0fd 50%, #51eca5 100%)`
                }}
            />

            <div
                className="hidden sm:block absolute w-full h-full bg-bottom bg-no-repeat bg-cover min-h-screen "
                style={{
                    backgroundImage: "url('bg-curve.svg')"
                }}
            />
            <div className="absolute w-full flex flex-col">
                <div>
                    <Header />
                    <section className="w-full">
                        <div className="container flex flex-col items-center px-5 mx-auto sm:flex-row min-h-screen">
                            <div className="w-full lg:flex-grow lg:w-3/5 flex flex-col items-start text-left space-y-8 sm:px-8 mb-8 sm:mb-0 content-center sm:-mt-24">
                                <h1 className="text-4xl font-bold tracking-tighter text-white lg:text-6xl title-font">
                                    Tiap-tiap hari check MySejahtera?
                                </h1>

                                <p className="w-full text-xl text-left text-white">
                                    Missed appointment?
                                </p>
                                <p className="w-full text-xl text-left text-white">
                                    BILA AKU BOLEH KENA CUCUK!?
                                </p>
                                <CallToActionButton />
                            </div>

                            <div className="sm:flex lg:w-5/6 lg:max-w-lg sm:w-1/2 flex justify-end sm:-mt-24 ">
                                <Image
                                    src="/phone.png"
                                    width={282}
                                    height={572}
                                    alt="Screenshot of this application"
                                />
                            </div>
                        </div>
                    </section>
                </div>
                <div className="bg-white pb-8 w-full pt-8">
                    <div className="container mx-auto px-8 md:px-0">
                        <div className="text-center w-full pb-16">
                            <h2 className="uppercase text-gray-800">Kenapa this app?</h2>
                            <p className="sm:text-3xl text-2xl text-black-800 pt-4 xl:w-1/2 mx-auto">
                                A simple, easier way to get notified on your appointment.
                            </p>
                        </div>

                        <div className="flex flex-col w-full lg:flex-row">
                            <FeaturedItem
                                icon={<IoNotificationsOutline size={48} />}
                                title={'Guaranteed notification'}
                                subtitle={"Don't worry, we are not as forgetful"}
                                description={
                                    'We promise that you will receive an SMS from us if your vaccination appointment is ready or even changed.'
                                }
                            />
                            <FeaturedItem
                                icon={<IoHeartCircleOutline size={48} />}
                                title={'Care for your loved one'}
                                subtitle={
                                    "Get up to speed with your family member's vaccine appointment updates"
                                }
                                description={
                                    'Keep an eye out for your grandparents, parents and even childrens when their appointed is set up.'
                                }
                            />
                            <FeaturedItem
                                icon={<GiHumanPyramid size={48} />}
                                title={'Made by Malaysians for everyone'}
                                subtitle={'We do what we can, we are in this together'}
                                description={
                                    ' This is an open-source initiative by Malaysians. Your contributions and donations are very welcomed.'
                                }
                            />
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

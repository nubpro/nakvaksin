import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React from 'react';
import { AiOutlineBell } from 'react-icons/ai';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import Footer from '../components/footer';

import Header from '../components/header';
import SubscribeStatus from '../components/SubscribeStatus';
import VaxStatus from '../components/VaxStatus';

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

const CTLDashboard = () => {
    return (
        <Link href="/subscribe">
            <button className="mx-auto w-full bg-primary text-white flex py-4 px-2 rounded-2xl">
                <AiOutlineBell className="flex-none text-4xl self-center mr-2" />
                <div className="flex-grow">
                    <h3 className="text-left font-bold text-sm">
                        Subscribe to my vaccination updates
                    </h3>
                    <p className="text-left text-white opacity-80 text-xs">
                        We will keep you (and your family) updated when your vaccination appointment
                        changes
                    </p>
                </div>
            </button>
        </Link>
    );
};
export default function dashboard() {
    return (
        <>
            <Header />
            <div className="container mx-auto px-4 pt-5">
                <div className="space-y-3">
                    <CTLDashboard />
                    <VaxStatus />
                    <SubscribeStatus />
                </div>
            </div>

            <Footer />
        </>
    );
}

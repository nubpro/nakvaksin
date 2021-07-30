import { GetServerSideProps } from 'next';
import React from 'react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

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

export default function dashboard() {
    return (
        <div className="container mx-auto px-4 pt-5">
            <Header />
            <div className="space-y-3">
                <VaxStatus />
                <SubscribeStatus />
            </div>
        </div>
    );
}

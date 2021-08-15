import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import Header from '../../components/header';
import { reSub, unSub } from '../../services/SubUnSub';

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

export default function Unsubscribe() {
    const [isUnSubing, setIsUnSubing] = useState(true);
    const [isReSubing, setIsReSubing] = useState(true);
    const [isDoneReSubing, setIsDoneReSubing] = useState(false);

    const router = useRouter();
    const { key } = router.query;

    if (key && typeof key === 'string') {
        unSub(key)
            .then(() => {
                setIsUnSubing(false);
            })
            .catch((error) => {
                // TODO: log to sentry
                console.error(error);
            });
    }

    function undo() {
        setIsReSubing(false);

        if (key && typeof key === 'string') {
            reSub(key)
                .then(() => {
                    setIsDoneReSubing(true);
                    setIsReSubing(true);
                })
                .catch((error) => {
                    // TODO: log to sentry
                    console.error(error);
                });
        }
    }

    return (
        <div className="container mx-auto px-4 pt-5">
            <Header />

            <div className="mx-auto text-center space-y-2">
                {(isUnSubing || !isReSubing) && (
                    <div>
                        <button className="bg-blue-500 rounded-full p-6 cursor-default animate-bounce my-2" />
                    </div>
                )}

                {!isUnSubing && !isDoneReSubing && (
                    <>
                        <div>
                            <span className="font-bold">
                                You have been unsubscribed from NakVaksin
                            </span>
                            <br></br>You will stop receiving any notifications from us when your
                            vaccination appointment changes
                        </div>
                        <div className="pt-4">You didn&apos;t meant to do that?</div>
                        <button
                            onClick={() => undo()}
                            className="text-white bg-primary rounded-full py-4 px-10">
                            Yes, I would like to undo!
                        </button>
                    </>
                )}

                {isDoneReSubing && (
                    <>
                        <div>
                            <span className="font-bold">
                                Hooray! Your subscription to NakVaksin has been restored
                            </span>
                            <br />
                            We will keep you (and your family) updated when your vaccination
                            appointment changes!
                        </div>
                        <div className="text-3xl"> {'🎉 🎉'}</div>
                    </>
                )}
            </div>
        </div>
    );
}

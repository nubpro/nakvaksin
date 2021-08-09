import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Header from '../../components/header';
import { reSub, unSub } from '../../services/SubUnSub';

export default function key() {
    const [isUnSubing, setIsUnSubing] = useState(true);
    const [isReSubing, setIsReSubing] = useState(false);

    const router = useRouter();
    const { key } = router.query;

    if (key !== undefined) {
        unSub(key).then(() => {
            setIsUnSubing(false);
        });
    }

    function undo() {
        reSub(key).then(() => {
            setIsReSubing(true);
        });
    }

    return (
        <div className="container mx-auto px-4 pt-5">
            <Header />

            <div className="mx-auto text-center space-y-2">
                {(!isUnSubing || isReSubing) && (
                    <div>
                        <button className="bg-blue-500 rounded rounded-full p-6 cursor-default animate-bounce my-2" />
                    </div>
                )}
                {isUnSubing && (
                    <>
                        <h1>You have been unsubscribed to the service.</h1>
                        <h2 className="mt-4">Whoops! I didnt meant to do that?</h2>
                        <button
                            onClick={() => undo()}
                            className="text-white bg-blue-500 px-4 py-2 rounded-xl">
                            Undo!
                        </button>
                    </>
                )}

                <hr />
                <h1 className="pt-8 text-sm">
                    Its OK, we understand... <br />
                    But we not gonna pretend we are not sad about it
                    <span className="text-2xl">{' 😢 '}</span>
                </h1>
            </div>
        </div>
    );
}

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import useUser from '../hooks/useUser';

export default function Header() {
    // const [user, setUser] = useState({ username: null, displayName: null, token: null });

    // useEffect(() => {
    //     const userJSON = Cookies.getJSON('user');

    //     console.log(userJSON);

    //     if (userJSON) {
    //         const user = JSON.parse(userJSON);
    //         setUser(user);
    //     }
    // }, [Cookies.get('user')]);

    const user = useUser();
    const router = useRouter();
    const [, , removeCookies] = useCookies();

    // useEffect(() => {
    //     console.log('asd');
    // });

    return (
        <header className="z-20 w-full xl:px-0 px-2">
            <div className="container mx-auto flex flex-wrap mt-8 mb-8 ">
                <div className="flex sm:w-1/2 flex">
                    <a href="/" className="text-3xl text-blue-500 ml-1 font-bold">
                        Nak Vaksin{' '}
                        <span role="img" aria-label="syringe">
                            💉
                        </span>
                    </a>
                </div>
                <div className="flx sm:w-1/2 flex justify-end ">
                    {user && (
                        <div className="inline">
                            <h3 className="inline pr-4">Welcome {user.displayName} </h3>
                            <button
                                type="button"
                                className="text-xl text-white bg-blue-600 rounded-xl py-1 px-4 font-bold hover:underline"
                                onClick={() => {
                                    removeCookies('user');
                                    router.push('/');
                                }}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

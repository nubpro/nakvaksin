import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

import { useUser } from '../hooks/useUser';

export default function Header() {
    const { user, logout } = useUser();
    const router = useRouter();
    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        // TODO: Move this outside of header, probably in _app.tsx (need to create an AuthProvider I think)
        const publicRoutes = ['/', '/login', '/resetpassword'];
        const isPublicRoute = publicRoutes.includes(router.pathname);
        const isAuthenticated = !!user;

        // Redirect unauthenticated user to home
        if (!isAuthenticated && !isPublicRoute) {
            router.push('/');
        }
    }, [user, router.pathname]);

    return (
        <header className="z-20 w-full xl:px-0 px-2">
            <div className="container mx-auto flex flex-col mt-8 mb-8 ">
                <div className="flex">
                    <Link href="/">
                        <h1 className="flex-none text-blue-500 font-bold text-2xl inline">
                            NakVaksin
                        </h1>
                    </Link>
                    <h1 className="flex-grow text-black inline text-right">
                        {user && <h3 className="float-right">{user.displayName} </h3>}
                    </h1>
                    <button className="h-auto px-2 right-0" onClick={() => setIsOpened((s) => !s)}>
                        {isOpened ? (
                            <FaCaretUp className="inline text-black bg-gray-200 rounded-xl text-xl" />
                        ) : (
                            <FaCaretDown className="inline text-black bg-gray-200 rounded-xl text-xl" />
                        )}
                    </button>
                </div>
                {isOpened && (
                    <div className="absolute container bg-transparent w-1/2 text-center my-6 py-2 right-0">
                        <button
                            className="bg-gray-50 w-4/5 mx-auto border rounded border-black p-1"
                            onClick={() => {
                                logout();
                            }}>
                            Logout
                        </button>

                        <button className="bg-gray-50 w-4/5 mx-auto border rounded border-black p-1">
                            Privacy Notice
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}

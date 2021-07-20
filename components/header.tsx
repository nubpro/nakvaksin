import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useUser } from '../hooks/useUser';

export default function Header() {
    const { user, logout } = useUser();
    const router = useRouter();

    useEffect(() => {
        // TODO: Move this outside of header, probably in _app.tsx (need to create an AuthProvider I think)
        const publicRoutes = ['/', '/login', '/resetpassword'];

        // Redirect user to landing page if unauthenticated
        if (user == null && !publicRoutes.includes(router.pathname)) {
            router.push('/');
        }
    }, [user, router.pathname]);

    return (
        <header className="z-20 w-full xl:px-0 px-2">
            <div className="container mx-auto flex flex-wrap mt-8 mb-8 ">
                <div className="flex sm:w-1/2">
                    <Link href="/">
                        <a className="text-3xl text-blue-500 ml-1 font-bold">
                            Nak Vaksin{' '}
                            <span role="img" aria-label="syringe">
                                💉
                            </span>
                        </a>
                    </Link>
                </div>
                <div className="flx sm:w-1/2 flex justify-end ">
                    {user && (
                        <div className="inline">
                            <h3 className="inline pr-4">Welcome {user.displayName} </h3>
                            <button
                                type="button"
                                className="text-xl text-white bg-blue-600 rounded-xl py-1 px-4 font-bold hover:underline"
                                onClick={() => {
                                    logout();
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

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useUser } from '../hooks/useUser';

export default function Header() {
    const { user, logout } = useUser();
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

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

    useEffect(() => {
        setIsMounted(true);
    }, []);

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
                    {/*
                    We are checking for both user and isMounted.
                    This is needed otherwise React will prompt 'Warning: Expected server HTML to contain a matching <div> in <div>.'
        
                    This is because the cached user profile cannot be retrieved on the server side, as the server does not contain the client's cookie
                    Hence, the rendered DOM is different, causing the error.
                    To prevent this, we need to make sure the component can only be rendered on the client.
                    UseEffect is not run on the server
                    
                    More info: https://github.com/vercel/next.js/discussions/17443
                    */}
                    {user && isMounted && (
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

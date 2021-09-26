import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { ReactNode, Ref, useEffect, useRef, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { IoHome } from 'react-icons/io5';

import { useUser } from '../hooks/useUser';

Header.propTypes = {
    isHomepage: PropTypes.bool
};

export default function Header({ isHomepage = false }) {
    /**
     * https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
     * TODO: Move it out of here ...?
     * Hook that alerts clicks outside of the passed ref
     */
    function useOutsideAlerter(ref: Ref<ReactNode>) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event: Event) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                if (ref?.current && !ref?.current.contains(event.target)) {
                    setIsOpened(false);
                }
            }

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);
    }

    const { user, logout } = useUser();
    const router = useRouter();
    const [isOpened, setIsOpened] = useState(false);

    useEffect(() => {
        // TODO: Move this outside of header, probably in _app.tsx (need to create an AuthProvider I think)
        const publicRoutes = ['/', '/login', '/resetpassword', '/r/[key]', '/privacy', '/shutdown'];
        const isPublicRoute = publicRoutes.includes(router.pathname);
        const isAuthenticated = !!user;

        // Redirect unauthenticated user to login
        if (!isAuthenticated && !isPublicRoute) {
            router.push('/login');
        }
    }, [user, router.pathname]);

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        <>
            <Link href="/shutdown">
                <a className="flex bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-2 justify-center text-center">
                    <span className="animate-pulse text-white font-medium">
                        Announcement: NakVaksin is shutting down on 3 Oct
                    </span>
                </a>
            </Link>
            <div
                className={classNames(
                    'flex px-4 justify-between h-14',
                    { 'bg-white bg-opacity-70': isHomepage },
                    {
                        'border-b': !isHomepage
                    }
                )}>
                {isHomepage ? (
                    <Link href="/dashboard">
                        <a className="flex-none self-center bg-white py-2 px-4 shadow-sm rounded-full text-primary text-sm">
                            <IoHome size={20} className="inline-block align-text-bottom mr-1" />
                            Dashboard
                        </a>
                    </Link>
                ) : (
                    <Link href="/">
                        <a className="flex items-center text-xl text-blue-500 font-bold">
                            NakVaksin
                        </a>
                    </Link>
                )}

                <div className="flex relative">
                    {user && (
                        <button
                            className="flex focus:outline-none items-center"
                            onClick={() => setIsOpened((s) => !s)}>
                            <div className="mr-2 font-light leading-tight truncate w-32 md:w-52 text-right">
                                {user.displayName}
                            </div>
                            <div className="flex items-center justify-center bg-gray-100 w-6 h-6 rounded-full focus:outline-none">
                                <FaCaretDown className="text-gray-600" size={16} />
                            </div>
                        </button>
                    )}

                    {isOpened && (
                        <div className="flex flex-col text-center absolute mt-12 bg-white w-full shadow rounded-lg divide-y tracking-tight z-50">
                            <Link href="/privacy">
                                <a className="py-2">Privacy Notice</a>
                            </Link>
                            <button className="py-2 text-red-500" onClick={() => logout()}>
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

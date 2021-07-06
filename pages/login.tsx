import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';

import Header from '../components/header';
import useUser from '../hooks/useUser';

const ErrorMessage: React.FC = ({ children }) => (
    <div className="text-sm text-red-500 mt-0.5">{children}</div>
);

ErrorMessage.propTypes = {
    children: PropTypes.node
};

type FormData = {
    username: string;
    password: string;
};

export default function Login() {
    // const [isMobile, setIsMobile] = useState(true);
    const [AuthErrorMessage, setAuthErrorMessage] = useState('');
    const router = useRouter();
    const [, setCookie] = useCookies(['user']);
    const user = useUser();

    useEffect(() => {
        if (user) {
            // is logged in
            router.push('/subscribe');
        }
    }, [user]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<FormData>();
    const onSubmit = handleSubmit((data) => {
        setAuthErrorMessage('');

        return axios({
            method: 'POST',
            url: '/api/myslogin',
            data: {
                username: data.username,
                password: data.password
            }
        })
            .then((resp) => {
                if (resp.status === 200) {
                    setCookie('user', resp.data, { maxAge: 86400 });
                } else {
                    throw new Error('Unexpected response from endpoint');

                    // TODO: add sentry logging here
                }
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    setAuthErrorMessage(
                        'Your account and/or password is incorrect, please try again'
                    );
                } else {
                    setAuthErrorMessage(err.message);
                    // TODO: add sentry logging here
                }

                console.error(err);
            });
    });

    return (
        <div className="container mx-auto px-4 pt-5">
            <Header />

            <div className="relative mt-10 text-center border-gray-100 border-2 rounded-lg p-5 md:p-10 overflow-hidden">
                {isSubmitting && (
                    <div className="absolute bg-black bg-opacity-60 w-full h-full z-10 left-0 top-0 flex flex-col justify-center items-center">
                        <svg
                            className="animate-spin h-8 w-8 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                )}

                <form onSubmit={onSubmit}>
                    <Image
                        src="/mysejahtera-logo.png"
                        alt="MySejahtera logo"
                        width={50}
                        height={50}
                    />
                    <div className="text-sm">Please use your MySejahtera account to login</div>

                    <div className="mt-4">
                        {AuthErrorMessage.length > 0 && (
                            <div className="bg-red-500 text-white border border-red-500 text-sm rounded-md py-1 px-1 mb-3">
                                <span role="img" aria-label="exclaimation">
                                    ⚠️
                                </span>{' '}
                                {AuthErrorMessage}
                            </div>
                        )}

                        <div className="relative text-left mb-3">
                            <label htmlFor="username" className="text-gray-700 text-sm">
                                Phone Number or Email
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder={'60123456789 / ali@email.com'}
                                {...register('username', { required: true })}
                            />
                            {errors.username && <ErrorMessage>This is required.</ErrorMessage>}
                        </div>
                        <div className="relative text-left">
                            <label htmlFor="password" className="text-gray-700 text-sm">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Please enter your password"
                                {...register('password', { required: true })}
                            />
                            {errors.password && <ErrorMessage>This is required.</ErrorMessage>}
                        </div>
                        {/* <div className="text-center md:text-right mt-1">
                            <button
                                type="button"
                                className="text-sm"
                                onClick={() => setIsMobile((s) => !s)}>
                                Change to login with {isMobile ? 'email' : 'mobile number'}
                            </button>
                        </div> */}

                        <button
                            type="submit"
                            className="mt-6 py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Login
                        </button>
                        <div className="mt-1">
                            <Link href="/resetpassword">
                                <a className="text-sm hover:underline">Forgot password?</a>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

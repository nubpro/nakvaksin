import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import Header from '../components/header';
import { resetPassword } from '../services/auth';
import { isUsernameValid } from '../utils/username';

const ErrorMessage: React.FC = ({ children }) => (
    <div className="text-sm text-red-500 mt-0.5">{children}</div>
);

ErrorMessage.propTypes = {
    children: PropTypes.node
};

type FormData = {
    username: string;
};

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

export default function ResetPassword() {
    const [axiosErrorMessage, setAxiosErrorMessage] = useState('');
    const [axiosSuccessMessage, setAxiosSuccessMessage] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<FormData>();

    const onSubmit = handleSubmit((data, event) => {
        setAxiosErrorMessage('');
        setAxiosSuccessMessage('');

        if (!isUsernameValid(data.username)) {
            return setAxiosErrorMessage('Please enter valid Phone Number or Email Address');
        }

        return resetPassword(data.username)
            .then((res) => {
                reset();

                if (res.status === 200) {
                    return setAxiosSuccessMessage(
                        'You will receive a SMS from MySejahtera to reset your password shortly'
                    );
                } else {
                    // TODO: add sentry logging
                }

                return setAxiosSuccessMessage(res.data);
            })
            .catch((err) => {
                if (err.response.status === 408) {
                    return setAxiosErrorMessage(
                        'Unexpected failure from MySejahtera (Please ensure your Phone Number or Email Address is correct)'
                    );
                }

                if (err.response.status === 400) {
                    return setAxiosErrorMessage('Please enter valid Phone Number or Email Address');
                }

                return setAxiosErrorMessage(err.message);
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
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
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
                    <div>
                        <h1 className="text-xl">Reset your MySejahtera&apos;s Password</h1>
                        <h2 className="text-sm text-gray-600">
                            Resetting password will not affect your existing logged in devices
                        </h2>
                    </div>
                    <div className="mt-4">
                        {axiosErrorMessage.length > 0 && (
                            <div className="bg-red-500 text-white border border-red-500 text-sm rounded-md py-1 px-1 mb-3">
                                <span role="img" aria-label="exclaimation">
                                    ⚠️
                                </span>{' '}
                                {axiosErrorMessage}
                            </div>
                        )}

                        {axiosSuccessMessage.length > 0 && (
                            <div className="bg-green-500 text-white border border-green-500 text-sm rounded-md py-1 px-1 mb-3">
                                <span role="img" aria-label="tick">
                                    ✅
                                </span>{' '}
                                {axiosSuccessMessage}
                            </div>
                        )}

                        <div className="relative text-left">
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

                        <button
                            type="submit"
                            className="mt-6 py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Reset Password
                        </button>
                        <div className="mt-1">
                            <Link href="/login">
                                <a className="text-sm hover:underline">Nak Login?</a>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

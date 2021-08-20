import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { QueryClient, useQueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import Header from '../components/header';
import Overlay from '../components/overlay';
import { useUser } from '../hooks/useUser';
import { login, persistUserProfile } from '../services/auth';

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

export default function Login() {
    // const [isMobile, setIsMobile] = useState(true);
    const [AuthErrorMessage, setAuthErrorMessage] = useState('');
    const router = useRouter();
    const { user } = useUser();

    useEffect(() => {
        // user has logged in
        if (user) {
            router.push('/dashboard');
        }
    }, [user]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<FormData>();
    const queryClient = useQueryClient();

    const onSubmit = handleSubmit((data) => {
        setAuthErrorMessage('');

        return login(data.username, data.password)
            .then((resp) => {
                if (resp.status === 200) {
                    const { user } = resp.data;

                    queryClient.setQueryData('user', user);
                    persistUserProfile(user);
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
        <>
            <Header />
            <div className="container mx-auto px-4 pt-5">
                <div className="relative mt-10 text-center border-gray-100 border-2 rounded-lg p-5 md:p-10 overflow-hidden">
                    {isSubmitting && <Overlay />}

                    <form onSubmit={onSubmit}>
                        <Image
                            src="/mysejahtera-logo.png"
                            alt="MySejahtera logo"
                            width={50}
                            height={50}
                        />
                        <div className="text-sm">Please use your MySejahtera account to login</div>

                        <div className="border px-5 py-2 text-sm max-w-xl m-auto my-4">
                            <div className="font-medium text-center">Can you trust us?</div>
                            <div className="text-left">
                                <span className="underline">
                                    By logging in to this app, you are granting us access to all
                                    your MySejahtera features
                                </span>
                                . It is a risk to expose your MySejahtera account to a third-party
                                like us. It is up to you whether you would like to use our service.{' '}
                                <span className=" font-bold">
                                    However, we must emphasize that we DO NOT and WILL NEVER
                                    analyze, sell or distribute your personal data. Sensitive
                                    information are NOT collected, this includes but not limited to
                                    your personal identification number, your location, your
                                    check-ins history, your medical history, your risk assessment
                                    and your depencies information.
                                </span>
                                . We are only using your MySejahtera account to access your
                                vaccination status and contact information only.
                                <br />
                                <br />
                                Please refer to our{' '}
                                <a href="/privacy" className="text-primary">
                                    Privacy Notice
                                </a>{' '}
                                and{' '}
                                <a href="/#faq" className="text-primary">
                                    FAQ
                                </a>{' '}
                                for more information
                            </div>
                        </div>

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
        </>
    );
}

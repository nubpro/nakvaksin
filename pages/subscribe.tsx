import { AxiosError, AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiTrash } from 'react-icons/bi';
import { IoCallOutline, IoClose, IoTrashOutline } from 'react-icons/io5';
import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import Header from '../components/header';

import Overlay from '../components/overlay';
import { useUser } from '../hooks/useUser';
import { QK_VAC_SUBSCRIPTION, useVacSub } from '../hooks/useVacSub';
import { updateVacSub } from '../services/vaxSubscription.service';
import VacSubscription from '../types/VacSubscription';
import sanitizePhoneNumber from '../utils/sanitizePhoneNumber';
import { REGEX_EMAIL, REGEX_PHONE_NUMBER } from '../utils/username';

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

const ErrorMessage: React.FC = ({ children }) => (
    <div className="text-sm text-red-500 mt-0.5">{children}</div>
);
ErrorMessage.propTypes = {
    children: PropTypes.node
};

export default function Subscribe() {
    const router = useRouter();
    const { user } = useUser();
    // const [axiosErrorMessage, setAxiosErrorMessage] = useState('');
    // const [axiosSuccessMessage, setAxiosSuccessMessage] = useState('');
    const vacSub = useVacSub();
    const queryClient = useQueryClient();
    const { mutateAsync } = useMutation<AxiosResponse, AxiosError, VacSubscription>(updateVacSub, {
        onSuccess: (data, variables) => {
            queryClient.setQueryData(QK_VAC_SUBSCRIPTION, variables);
        },
        onError: (error) => {
            // TODO: log error to sentry
            console.error(error.response);
        }
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<VacSubscription>();

    const onSubmit = handleSubmit((data) =>
        mutateAsync(data).catch(() => {
            // no need to do anything as it is being handled in useMutation
            // we are only adding this catch here otherwise we will get Uncaught promise error
        })
    );

    const textFieldStyle =
        'border border-black py-5 rounded-full text-center w-full placeholder-gray-700 font-light outline-none';
    const groupHeadingStyle = 'font-semibold mb-3';

    return (
        <div className="flex flex-col h-screen px-5 relative">
            <Header />
            {isSubmitting && <Overlay />}

            <button className="absolute top-0 right-0 m-5" onClick={() => reset()}>
                <IoClose size={45} />
            </button>

            {/* <div className="text-center italic font-light text-gray-500 py-7 text-sm">
                All fields are optional
                <br />
                You may leave them blank
            </div> */}

            <div className="py-10">{JSON.stringify(vacSub.data)}</div>

            {/* {vacSubMutation.error} */}

            <form className="flex-1 flex flex-col" onSubmit={onSubmit}>
                <div className="flex-1 text-center">
                    <div>
                        <div className={groupHeadingStyle}>
                            Subscribe <span className="underline">yourself</span> to your
                            vaccination updates
                        </div>

                        <div className="flex flex-col space-y-4">
                            <div>
                                <input
                                    id="userPhoneNumber"
                                    className={textFieldStyle}
                                    placeholder="Please enter your phone number (optional)"
                                    {...register('userPhoneNumber', {
                                        required: false,
                                        pattern: REGEX_PHONE_NUMBER
                                    })}
                                    defaultValue={vacSub.data?.userPhoneNumber}
                                />
                                {user?.phoneNumber && (
                                    <FieldUnderCaption caption={user.phoneNumber} />
                                )}
                                {errors.userPhoneNumber?.type == 'pattern' && (
                                    <ErrorMessage>Invalid phone number</ErrorMessage>
                                )}
                            </div>

                            <div>
                                <input
                                    id="userEmail"
                                    className={textFieldStyle}
                                    placeholder="Please enter your email (optional)"
                                    {...register('userEmail', {
                                        required: false,
                                        pattern: REGEX_EMAIL
                                    })}
                                    defaultValue={vacSub.data?.userEmail}
                                />
                                {user?.email && <FieldUnderCaption caption={user.email} />}
                                {errors.userEmail?.type == 'pattern' && (
                                    <ErrorMessage>Invalid email</ErrorMessage>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className={groupHeadingStyle}>
                            Subscribe <span className="underline">your family</span> to your
                            vaccination updates
                        </div>

                        <div className="flex flex-col space-y-4">
                            <div>
                                <input
                                    id="familyPhoneNumber"
                                    className={textFieldStyle}
                                    placeholder="Please enter their phone number (optional)"
                                    {...register('familyPhoneNumber', {
                                        required: false,
                                        pattern: REGEX_PHONE_NUMBER
                                    })}
                                    defaultValue={vacSub.data?.familyPhoneNumber}
                                />
                                {errors.familyPhoneNumber?.type == 'pattern' && (
                                    <ErrorMessage>Invalid phone number</ErrorMessage>
                                )}
                            </div>

                            <div>
                                <input
                                    id="familyEmail"
                                    className={textFieldStyle}
                                    placeholder="Please enter their email (optional)"
                                    {...register('familyEmail', {
                                        required: false,
                                        pattern: REGEX_EMAIL
                                    })}
                                    defaultValue={vacSub.data?.familyEmail}
                                />
                                {errors.familyEmail?.type == 'pattern' && (
                                    <ErrorMessage>Invalid email</ErrorMessage>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center mt-10 mb-4">
                    <button
                        type="submit"
                        className="btn bg-green-500 text-white border-4 border-green-500 rounded-2xl w-full py-2">
                        Save
                    </button>

                    <button
                        className="my-2 py-2 text-sm flex items-center text-red-500 hover:text-red-700"
                        type="button">
                        <BiTrash size={22} />
                        <div className="ml-1 font-medium">Unsubscribe from NakVaksin</div>
                    </button>
                </div>
            </form>
        </div>
    );
}

const FieldUnderCaption = ({ caption }: { caption: string }) => (
    <div>
        Use <button className="text-blue-500 pt-1.5 pb-1 font-medium underline">{caption}</button>
    </div>
);

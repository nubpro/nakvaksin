import { AxiosError, AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import router from 'next/router';
import PropTypes from 'prop-types';
import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { BiTrash } from 'react-icons/bi';
import { IoCall, IoMail } from 'react-icons/io5';
import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import Overlay from '../components/overlay';
IoCall;
import { QK_VAC_SUBSCRIPTION, useVaxSubscription } from '../hooks/useVaxSubscription';
import { updateVaxSubscription } from '../services/vaxSubscription.service';
import { VaxSubscription } from '../types/vaxSubscription';
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
    <div className="text-sm text-red-500 mt-1">{children}</div>
);
ErrorMessage.propTypes = {
    children: PropTypes.node
};

const GroupHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => {
    return (
        <div className="mb-2">
            <div className="font-medium">{title}</div>
            <div className="text-sm text-gray-500">{subtitle}</div>
        </div>
    );
};

const SubscribeField = ({
    icon,
    placeholder,
    defaultValue,
    register
}: {
    icon: ReactElement;
    placeholder: string;
    defaultValue?: string;
    register: any;
}) => {
    return (
        <div className="flex border h-16 items-center border-black rounded-full pl-7">
            <div className="flex mr-4">{icon}</div>

            <input
                className="flex-1 h-10 outline-none rounded-r-full text-sm placeholder-gray-500 font-light"
                placeholder={placeholder}
                {...register}
                defaultValue={defaultValue}
            />
        </div>
    );
};

export default function Subscribe() {
    const vaxSubscriptionQuery = useVaxSubscription();
    const queryClient = useQueryClient();
    const { mutateAsync } = useMutation<AxiosResponse, AxiosError, VaxSubscription>(
        updateVaxSubscription,
        {
            onSuccess: (data, variables) => {
                queryClient.setQueryData(QK_VAC_SUBSCRIPTION, variables);
            },
            onError: (error) => {
                // TODO: log error to sentry
                console.error(error.response);
            }
        }
    );

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<VaxSubscription>();

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        mutateAsync(data).catch(() => {
            // no need to do anything as it is being handled in useMutation
            // we are only adding this catch here otherwise we will get Uncaught promise error
        });
    });

    return (
        <div className="flex flex-col h-screen px-5 relative">
            {isSubmitting && <Overlay />}

            <button
                className="absolute top-0 right-0 m-5"
                onClick={() => {
                    router.back();
                }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24.178"
                    height="24.178"
                    viewBox="0 0 24.178 24.178">
                    <g
                        id="Group_26"
                        data-name="Group 26"
                        transform="translate(-178.822 -11.822)"
                        opacity="0.766">
                        <rect
                            id="Rectangle_32"
                            data-name="Rectangle 32"
                            width="2.052"
                            height="32.141"
                            transform="translate(201.549 11.822) rotate(45)"
                        />
                        <rect
                            id="Rectangle_33"
                            data-name="Rectangle 33"
                            width="2.052"
                            height="32.141"
                            transform="translate(178.822 13.273) rotate(-45)"
                        />
                    </g>
                </svg>
            </button>

            <div className="text-center font-light py-7 text-lg">
                Subscribe to your vaccination status
            </div>

            {/* <div className="py-10">{JSON.stringify(vaxSubscriptionQuery.data)}</div> */}

            {/* {vaxSubscriptionMutation.error} TODO: show error from server */}

            <form className="flex-1 flex flex-col" onSubmit={onSubmit}>
                <div className="flex-1 text-center">
                    <div>
                        <GroupHeading title="Subscribe your family" />

                        <div className="flex flex-col space-y-4">
                            <div>
                                <SubscribeField
                                    icon={<IoCall size={18} />}
                                    placeholder="Please enter your phone number"
                                    defaultValue={vaxSubscriptionQuery.data?.userPhoneNumber}
                                    register={register('userPhoneNumber', {
                                        required: false,
                                        pattern: REGEX_PHONE_NUMBER
                                    })}
                                />
                                {errors.userPhoneNumber?.type == 'pattern' && (
                                    <ErrorMessage>Invalid phone number</ErrorMessage>
                                )}
                            </div>

                            <div>
                                <SubscribeField
                                    icon={<IoMail size={18} />}
                                    placeholder="Please enter your email"
                                    defaultValue={vaxSubscriptionQuery.data?.userEmail}
                                    register={register('userEmail', {
                                        required: false,
                                        pattern: REGEX_EMAIL
                                    })}
                                />
                                {errors.userEmail?.type == 'pattern' && (
                                    <ErrorMessage>Invalid email</ErrorMessage>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <GroupHeading
                            title="Subscribe your family"
                            subtitle="Your family will be informed when your vaccination appointment
                                changes"
                        />

                        <div className="flex flex-col space-y-4">
                            <div>
                                <SubscribeField
                                    icon={<IoCall size={18} />}
                                    placeholder="Please enter their phone number"
                                    defaultValue={vaxSubscriptionQuery.data?.familyPhoneNumber}
                                    register={register('familyPhoneNumber', {
                                        required: false,
                                        pattern: REGEX_PHONE_NUMBER
                                    })}
                                />
                                {errors.familyPhoneNumber?.type == 'pattern' && (
                                    <ErrorMessage>Invalid phone number</ErrorMessage>
                                )}
                            </div>

                            <div>
                                <SubscribeField
                                    icon={<IoMail size={18} />}
                                    placeholder="Please enter their email"
                                    defaultValue={vaxSubscriptionQuery.data?.userEmail}
                                    register={register('familyEmail', {
                                        required: false,
                                        pattern: REGEX_EMAIL
                                    })}
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

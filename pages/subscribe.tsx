import { AxiosError, AxiosResponse } from 'axios';
import classNames from 'classnames';
import { GetServerSideProps } from 'next';
import router from 'next/router';
import PropTypes from 'prop-types';
import React, { ReactElement, useEffect, useState } from 'react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiTrash } from 'react-icons/bi';
import { IoCall, IoMail } from 'react-icons/io5';
import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import Overlay from '../components/overlay';
import { useUser } from '../hooks/useUser';
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

const SubscribeTextField = ({
    icon,
    placeholder,
    defaultValue,
    register
}: {
    icon: ReactElement;
    placeholder: string;
    defaultValue?: string;
    register: UseFormRegisterReturn;
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

const SubscribeToggle = ({
    icon,
    readonlyValue,
    onToggle,
    toggled,
    stateFetched
}: {
    icon: ReactElement;
    readonlyValue: string;
    onToggle: (state: boolean) => void;
    toggled: boolean;
    stateFetched: boolean;
}) => {
    return (
        <div className="flex border h-16 items-center text-left border-black rounded-full pl-7">
            <div className="flex mr-4">{icon}</div>
            <div className="flex-1">{readonlyValue}</div>

            {stateFetched ? (
                <ToggleButton onToggle={onToggle} toggled={toggled} />
            ) : (
                <div className="pr-8">...</div>
            )}
        </div>
    );
};

const ToggleButton = ({
    onToggle,
    toggled
}: {
    onToggle: (state: boolean) => void;
    toggled: boolean;
}) => {
    const [mToggled, setMToggled] = useState(false); // internal toggle state

    useEffect(() => {
        setMToggled(toggled);
    }, [toggled]);

    useEffect(() => {
        onToggle(mToggled);
    }, [mToggled]);

    return (
        <button
            type="button"
            className="ml-1 mr-5 p-2 focus:outline-none"
            onClick={() => setMToggled((s) => !s)}>
            <div
                className={classNames(
                    'bg-gray-300 w-10 h-6 flex items-center rounded-full p-0.5 transition-colors',
                    {
                        'bg-secondary': mToggled
                    }
                )}>
                <div
                    className={classNames(
                        'bg-white w-5 h-5 rounded-full shadow-md transform transition duration-200 ease-in-out',
                        {
                            'translate-x-4': mToggled
                        }
                    )}></div>
            </div>
        </button>
    );
};

export default function Subscribe() {
    const { user } = useUser();
    const vaxSubscriptionQuery = useVaxSubscription();
    const queryClient = useQueryClient();
    const formMutation = useMutation<AxiosResponse, AxiosError, VaxSubscription>(
        updateVaxSubscription,
        {
            onSuccess: (data, variables) => {
                queryClient.setQueryData(QK_VAC_SUBSCRIPTION, variables);
                toast.success('Saved!');
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
        setValue
    } = useForm<VaxSubscription>();

    const onSubmit = handleSubmit((data) => {
        // console.log('onsubmit', data);
        return formMutation.mutateAsync(data).catch(() => {
            // no need to do anything as it is being handled in useMutation
            // we are only adding this catch here otherwise we will get Uncaught promise error
        });
    });

    return (
        <div>
            {isSubmitting && <Overlay />}

            <div className="flex flex-col h-screen px-5 relative max-w-screen-lg m-auto">
                <button
                    className="absolute top-0 right-0 p-3 m-4"
                    onClick={() => {
                        router.replace('dashboard');
                    }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
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
                <div className="text-center font-light mt-16 pb-8 text-lg">
                    Subscribe to your vaccination status
                </div>

                {formMutation.error && (
                    <div className="bg-red-500 text-white border text-sm rounded-md py-2 text-center mb-3">
                        <span role="img" aria-label="exclaimation">
                            ⚠️
                        </span>{' '}
                        {formMutation.error.response?.data}
                    </div>
                )}

                <form className="flex-1 flex flex-col" onSubmit={onSubmit}>
                    <div className="flex-1 text-center">
                        <div>
                            <GroupHeading title="Subscribe yourself" />

                            <div className="flex flex-col space-y-4">
                                <div>
                                    {user?.phoneNumber ? (
                                        <SubscribeToggle
                                            icon={<IoCall size={18} />}
                                            readonlyValue={user.phoneNumber}
                                            onToggle={(toggled) => {
                                                if (toggled) {
                                                    setValue('userPhoneNumber', user.phoneNumber);
                                                } else {
                                                    setValue('userPhoneNumber', '');
                                                }
                                            }}
                                            stateFetched={vaxSubscriptionQuery.isFetched}
                                            toggled={!!vaxSubscriptionQuery.data?.userPhoneNumber}
                                        />
                                    ) : (
                                        <SubscribeTextField
                                            icon={<IoCall size={18} />}
                                            placeholder="Please enter your phone number"
                                            defaultValue={
                                                vaxSubscriptionQuery.data?.userPhoneNumber
                                            }
                                            register={register('userPhoneNumber', {
                                                required: false,
                                                pattern: REGEX_PHONE_NUMBER
                                            })}
                                        />
                                    )}

                                    {errors.userPhoneNumber?.type == 'pattern' && (
                                        <ErrorMessage>Invalid phone number</ErrorMessage>
                                    )}
                                </div>

                                <div>
                                    <SubscribeTextField
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
                                    <SubscribeTextField
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
                                    <SubscribeTextField
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
        </div>
    );
}

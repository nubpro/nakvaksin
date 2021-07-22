import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoCallOutline, IoTrashOutline, IoClose } from 'react-icons/io5';
import { BiTrash } from 'react-icons/bi';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';

import Header from '../components/header';
import { useUser } from '../hooks/useUser';
import sanitizePhoneNumber from '../utils/sanitizePhoneNumber';

type FormData = {
    email: string;
    phone: string;
    fam_email: string;
    fam_phone: string;
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

export default function Subscribe() {
    const router = useRouter();
    const { user } = useUser();
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

        return axios({
            method: 'POST',
            url: '/api/resetpsassword',
            data: {}
        });
    });

    const textFieldStyle =
        'border border-black py-5 rounded-full text-center w-full placeholder-gray-900 font-light outline-none';
    const groupHeadingStyle = 'font-semibold mb-3';

    return (
        <div className="container mx-auto flex flex-col h-screen px-5 relative md:max-w-xl">
            <button className="absolute top-0 right-0 m-5">
                <IoClose size={45} />
            </button>

            <div className="text-center italic font-light text-gray-500 py-7 text-sm">
                All fields are optional
                <br />
                You may leave them blank
            </div>

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
                                    id="phone"
                                    type="text"
                                    className={textFieldStyle}
                                    placeholder="Please enter your phone number"
                                    {...register('phone', { required: false })}
                                />
                                {user?.phoneNumber && (
                                    <FieldUnderCaption caption={user.phoneNumber} />
                                )}
                            </div>

                            <div>
                                <input
                                    id="email"
                                    type="email"
                                    className={textFieldStyle}
                                    placeholder="Please enter your email"
                                    {...register('email', { required: false })}
                                />
                                {user?.email && <FieldUnderCaption caption={user.email} />}
                            </div>
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className={groupHeadingStyle}>
                            Subscribe <span className="underline">your family</span> to your
                            vaccination updates
                        </div>

                        <div className="flex flex-col space-y-4">
                            <input
                                id="fam_phone"
                                type="text"
                                className={textFieldStyle}
                                placeholder="Please enter their phone number"
                                {...register('fam_phone', { required: false })}
                            />
                            <input
                                id="fam_email"
                                type="email"
                                className={textFieldStyle}
                                placeholder="Please enter their email"
                                {...register('fam_email', { required: false })}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center mt-10 mb-4">
                    <button
                        type="submit"
                        className="btn bg-green-500 text-white border-4 border-green-500 rounded-2xl w-full py-2">
                        Save
                    </button>

                    <button className="my-2 py-2 text-sm flex items-center text-red-500 hover:text-red-700">
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

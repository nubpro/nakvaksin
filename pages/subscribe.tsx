import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Header from '../components/header';
import { useUser } from '../hooks/useUser';
import sanitizePhoneNumber from '../utils/sanitizePhoneNumber';
import { isEmail, isPhoneNumber, isUsernameValid } from '../utils/username';

type FormData = {
    email: string;
    phone: string;
    fam_email: string;
    fam_phone: string;
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
        'border border-black py-5 rounded-full text-center w-full placeholder-gray-700 font-light outline-none';
    const groupHeadingStyle = 'text-xl font-semibold mb-3';

    return (
        <div className="container mx-auto flex flex-col h-screen">
            <div className="text-center italic font-light py-7">
                All fields are optional
                <br />
                You may leave them blank
            </div>

            <form className="text-center flex-1 flex flex-col" onSubmit={onSubmit}>
                <div className="flex-1">
                    <div>
                        <div className={groupHeadingStyle}>
                            Subscribe <span className="underline">me</span> to my vaccination status
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
                            Subscribe <span className="underline">my family</span> to my vaccination
                            status
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

                <div className="">
                    <button
                        type="submit"
                        className="btn bg-green-500 text-white border-4 border-green-500 rounded-2xl w-full py-2">
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
}

const FieldUnderCaption = ({ caption }: { caption: string }) => (
    <div>
        Use <button className="text-blue-500 underline pt-1.5 pb-1 font-medium">{caption}</button>
    </div>
);

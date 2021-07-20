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

    return (
        <div className="container mx-auto px-4 pt-5">
            <Header />

            <form className="text-center space-y-6" onSubmit={onSubmit}>
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
                <h4 className="text-xl font-semibold w-3/4 mx-auto ">
                    Subscribe me to my vaccination status
                </h4>
                <input
                    id="phone"
                    type="text"
                    className="border border-8 py-4 w-full border-blue-500 rounded-full text-center"
                    placeholder="Please enter your phone number"
                    {...register('phone', { required: false })}
                />
                {isPhoneNumber(user?.username) && (
                    <span>
                        Use <button className="text-blue-500 underline">{user?.username}</button>
                    </span>
                )}
                <input
                    id="email"
                    type="email"
                    className="border border-8 py-4 w-full border-blue-500 rounded-full text-center mt-2"
                    placeholder="Please enter your email"
                    {...register('email', { required: false })}
                />
                {isEmail(user?.username) && (
                    <span>
                        Use <button className="text-blue-500 underline">{user?.username}</button>
                    </span>
                )}

                <h4 className="text-xl font-semibold w-3/4 mx-auto pt-12">
                    Update my family about my vaccination status (optional)
                </h4>
                <div className="space-y-4">
                    <input
                        id="fam_phone"
                        type="text"
                        className="border border-8 py-4 w-full border-blue-500 rounded-full text-center"
                        placeholder="Please enter their phone number"
                        {...register('fam_phone', { required: false })}
                    />
                    <input
                        id="fam_email"
                        type="email"
                        className="border border-8 py-4 w-full border-blue-500 rounded-full text-center"
                        placeholder="Please enter their email"
                        {...register('fam_email', { required: false })}
                    />
                    <button
                        type="submit"
                        className="btn bg-green-500 text-white border-4 border-green-500 rounded-2xl w-full py-2 mt-2 font-bold">
                        Subscribe !
                    </button>
                </div>
            </form>
        </div>
    );
}

import classNames from 'classnames';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { MouseEvent, ReactNode, useEffect, useState } from 'react';
import { GoCheck } from 'react-icons/go';
import { IoCallOutline, IoTrashOutline } from 'react-icons/io5';

import Header from '../components/header';
import { useUser } from '../hooks/useUser';

const Checkbox = ({
    children,
    checked = false,
    className,
    onClick
}: {
    children: ReactNode;
    checked?: boolean;
    className?: string;
    onClick?: (event: MouseEvent) => void;
}) => {
    const [isChecked, setIsChecked] = useState(checked);

    return (
        <button
            className={classNames(
                'w-full text-left focus:outline-none focus:ring-4 py-4 px-5 bg-primary rounded-lg text-sm md:text-base font-extrabold text-white flex items-center flex-1',
                className
            )}
            onClick={(e) => onClick && onClick(e)}>
            <div className="mr-8 flex-1">{children}</div>

            <div className="my-1">
                {isChecked ? (
                    <div className="bg-primaryDark rounded text-white h-12 w-12 flex-none flex justify-center items-center">
                        <GoCheck size={35} />
                    </div>
                ) : (
                    <div className="rounded border-4 border-white text-white h-12 w-12 flex-none flex justify-center items-center"></div>
                )}
            </div>
        </button>
    );
};

const ExpandedCheckbox = ({
    checked = false,
    className,
    onClick
}: {
    checked?: boolean;
    className?: string;
    onClick?: (event: MouseEvent) => void;
}) => {
    const [isChecked, setIsChecked] = useState(checked);

    return (
        <div>
            <button
                className={classNames(
                    'w-full rounded-t-lg text-left focus:outline-none focus:ring-4 py-4 px-5 bg-primary text-sm md:text-base font-extrabold text-white flex items-center flex-1',
                    className
                )}
                onClick={(e) => onClick && onClick(e)}>
                <div className="mr-4 flex-1">I would like to inform my family / friend too</div>

                <div className="my-1">
                    {isChecked ? (
                        <div className="bg-primaryDark rounded text-white h-12 w-12 flex-none flex justify-center items-center">
                            <GoCheck size={35} />
                        </div>
                    ) : (
                        <div className="rounded border-4 border-white text-white h-12 w-12 flex-none flex justify-center items-center"></div>
                    )}
                </div>
            </button>
            <div className="bg-gray-100 rounded-b-lg px-4 py-5">
                <div className="flex items-center">
                    <IoCallOutline size={25} className="text-gray-800" />
                    <div className="leading-tight text-sm ml-2">
                        <div className="text-gray-800">Please enter their phone number</div>
                        <div className="text-gray-500">
                            Only send your appointment to someone you trust
                        </div>
                    </div>
                </div>
                <div className="bg-gray-300 h-px mt-2"></div>

                <div className="py-6 px-3">
                    <input
                        type="text"
                        id="username"
                        className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder={'60123456789'}
                    />
                </div>

                <div className="bg-gray-300 h-px"></div>

                <div className="flex items-center mt-3">
                    <button className="text-sm rounded-full h-10 bg-secondary inline-block px-6 text-white focus:ring-2 focus:outline-none focus:ring-secondary focus:ring-opacity-40 hover:bg-secondaryDark">
                        Save
                    </button>

                    <button className="text-sm ml-4 h-10 flex items-center justify-center text-red-500 hover:text-red-800">
                        <IoTrashOutline size={22} />
                        <div className="ml-1">Remove this number</div>
                    </button>
                </div>
            </div>
        </div>
    );
};

// Checkbox.propTypes = {
//     children: PropTypes.node,
//     checked: PropTypes.bool
// };

export default function Subscribe() {
    const router = useRouter();
    const user = useUser();

    useEffect(() => {
        // if (!user) {
        //     router.push('/login');
        // }
    }, []);

    return (
        <div className="container mx-auto px-4 pt-5">
            <Header />

            <Checkbox>
                <div>Text me once my appointment is set</div>
                <div className="flex mt-2 ml-1 items-center">
                    <IoCallOutline size={23} />
                    <span className="text-base sm:text-lg font-normal ml-1.5">
                        {user.data?.username}
                    </span>
                </div>
            </Checkbox>

            <ExpandedCheckbox className={'mt-5'} />
        </div>
    );
}

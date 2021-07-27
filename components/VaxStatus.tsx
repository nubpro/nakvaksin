import axios from 'axios';
import classNames from 'classnames';
import React, { ReactNode, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { getVaxStatus } from '../services/vaxStatus';
import { VaxStatusType } from '../types/VaxStatusType';

const VaxStatusCard = ({
                           isOpen = false,
                           className,
                           heading,
                           status,
                           children
                       }: {
    isOpen?: boolean;
    className?: string;
    status?: string;
    heading?: string;
    children?: ReactNode;
}) => {
    const [isOpened, setIsOpened] = useState(isOpen);
    if (isOpened) {
        return (
            <button onClick={() => setIsOpened(!isOpened)} className="w-full">
                <div className={classNames('rounded-t-xl py-4', className)}>
                    <div className="flex">
                        <h1 className="flex-none text-white uppercase pl-4 font-bold inline">
                            {heading}
                        </h1>
                        <h1 className="flex-grow text-white uppercase pl-4 font-bold inline text-right">
                            {status}
                        </h1>
                        <div className="h-auto px-2">
                            <FaChevronUp className="inline text-white" />
                        </div>
                    </div>
                </div>
                <div className="bg-white h-auto rounded-b-xl p-8">
                    <div>{children}</div>
                </div>
            </button>
        );
    } else {
        return (
            <button onClick={() => setIsOpened(!isOpened)} className="w-full">
                <div className={classNames('rounded-xl py-4', className)}>
                    <div className="flex">
                        <h1 className="flex-none text-white uppercase pl-4 font-bold inline">
                            {heading}
                        </h1>
                        <h1 className="flex-grow text-white uppercase pl-4 font-bold inline text-right">
                            {status}
                        </h1>
                        <div className="h-auto px-2">
                            <FaChevronDown className="inline text-white" />
                        </div>
                    </div>
                </div>
            </button>
        );
    }
};

export default function VaxStatus() {
    let firstDoseStatus;
    getVaxStatus().then((res) => {
        const data = res as VaxStatusType[];
        firstDoseStatus = data[1].state;
        console.log(data[1].state);
    });

    return (
        <div className="h-auto mx-auto ">
            <div>
                <h1 className="text-black text-2xl text-center font-bold">
                    Your Vaccination Status
                </h1>
                <div className="bg-gray-100 rounded rounded-2xl p-4 pb-12">
                    <div className="space-y-2">
                        <h2 className="text-gray-500 text-sm ">Name </h2>
                        <p className="text-black text-xl">Ching Cheng Kang</p>
                    </div>
                    <div className="mt-2 space-y-4">
                        <VaxStatusCard
                            heading="Dose 1"
                            status={firstDoseStatus}
                            isOpen={false}
                            className="bg-gradient-to-r from-green-400 to-blue-500">
                            <p className="font-bold">Appointment Date :</p>
                            <p>22 June 2021 09:00AM</p>
                            <br />
                            <p className="font-bold"> Health Facility:</p>
                            <p>Hospital Want dan Kanak</p>
                            <br />
                            <p className="font-bold"> Location:</p>
                            <p>HOSPITAL WANITA DAN KANAK-KANAK, LIKAS</p>
                        </VaxStatusCard>

                        <VaxStatusCard
                            heading="Dose 2"
                            status="PENDING"
                            isOpen={false}
                            className="bg-gradient-to-r from-yellow-600 to-yellow-400">
                            <p className="font-bold">Appointment Date :</p>
                            <p>22 June 2021 09:00AM</p>
                            <br />
                            <p className="font-bold"> Health Facility:</p>
                            <p>Hospital Want dan Kanak</p>
                            <br />
                            <p className="font-bold"> Location:</p>
                            <p>HOSPITAL WANITA DAN KANAK-KANAK, LIKAS</p>
                        </VaxStatusCard>
                    </div>
                </div>
            </div>
        </div>
    );
}

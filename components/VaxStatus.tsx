import classNames from 'classnames';
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { useUser } from '../hooks/useUser';
import { getHealthFacility, getVaccinationLocation, useVaxStatus } from '../hooks/useVaxStatus';
import { VaxElemState, VaxStatusElem } from '../types/VaxStatus';

const VaxStatusCard = ({
    vaxStatus,
    heading,
    isOpen = false
}: {
    vaxStatus: VaxStatusElem;
    heading: string;
    isOpen?: boolean;
}) => {
    const [isOpened, setIsOpened] = useState(isOpen);

    const COLOR_BY_STATE = {
        [VaxElemState.ACTIVE]: 'bg-gradient-to-r from-yellow-600 to-yellow-400', // TODO: change this maybe
        [VaxElemState.PENDING]: 'bg-gradient-to-r from-yellow-600 to-yellow-400',
        [VaxElemState.COMPLETED]: 'bg-gradient-to-r from-green-400 to-blue-500'
    };

    return (
        <div className="flex flex-col">
            <button onClick={() => setIsOpened((s) => !s)}>
                <div
                    className={classNames(
                        'py-4',
                        { 'rounded-t-xl': isOpened },
                        { 'rounded-xl': !isOpened }, // collapsed
                        COLOR_BY_STATE[vaxStatus.state]
                    )}>
                    <div className="flex">
                        <h1 className="flex-none text-white uppercase pl-4 font-bold inline">
                            {heading}
                        </h1>
                        <h1 className="flex-grow text-white uppercase pl-4 font-bold inline text-right">
                            {vaxStatus.state}
                        </h1>
                        <div className="h-auto px-2">
                            {isOpened ? (
                                <FaChevronUp className="inline text-white" />
                            ) : (
                                <FaChevronDown className="inline text-white" />
                            )}
                        </div>
                    </div>
                </div>
            </button>
            {isOpened && (
                <div className="bg-white h-auto rounded-b-xl p-8 text-center">
                    <p className="font-bold">Appointment Date & Time</p>
                    <p>{vaxStatus.timestamp}</p>
                    <br />
                    <p className="font-bold">Health Facility</p>
                    <p>{getHealthFacility(vaxStatus)}</p>
                    <br />
                    <p className="font-bold">Location</p>
                    <p>{getVaccinationLocation(vaxStatus)}</p>
                </div>
            )}
        </div>
    );
};

export default function VaxStatusComponent() {
    const { user } = useUser();
    const { isLoading, data } = useVaxStatus();

    return (
        <div className="h-auto mx-auto ">
            <div>
                <h1 className="text-black text-2xl text-center font-bold">
                    Your Vaccination Status
                </h1>
                <div className="bg-gray-100 rounded-2xl p-4 pb-12">
                    <div>
                        <h2 className="text-gray-500 text-sm ">Name</h2>
                        <p className="text-black text-xl">{user?.displayName}</p>
                    </div>

                    <div className="mt-4 space-y-5">
                        {isLoading ? (
                            'Loading vaccination status...'
                        ) : (
                            <>
                                {data?.firstDoseAppointment && (
                                    <VaxStatusCard
                                        heading="Dose 1"
                                        vaxStatus={data.firstDoseAppointment}
                                        isOpen={
                                            data.firstDoseAppointment.state !==
                                            VaxElemState.COMPLETED
                                        }></VaxStatusCard>
                                )}

                                {data?.secondDoseAppointment && (
                                    <VaxStatusCard
                                        heading="Dose 2"
                                        vaxStatus={data.secondDoseAppointment}
                                        isOpen={
                                            data.secondDoseAppointment.state !==
                                            VaxElemState.COMPLETED
                                        }></VaxStatusCard>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

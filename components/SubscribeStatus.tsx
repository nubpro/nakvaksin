import Link from 'next/link';
import { FaBell, FaPen } from 'react-icons/fa';
import { IoCall, IoMail } from 'react-icons/io5';

import { useVaxSubscription } from '../hooks/useVaxSubscription';

const NOT_AVAILABLE_MSG = '-';
const LOADING_MSG = 'Loading...';

export default function SubscribeStatus() {
    const { data, isLoading } = useVaxSubscription();

    return (
        <div>
            <h2 className="font-bold">
                <FaBell className="inline" /> Subscribe to vaccination updates
            </h2>
            <p className="text-xs text-gray-500 py-2">
                You (and your family) will be notified when your vaccination appointment changes
            </p>

            <div className="bg-gray-200 rounded-t-xl p-4 space-y-2 relative">
                <Link href="/subscribe">
                    <a className="absolute top-0 right-0 bg-primary flex rounded-full py-2 px-4 items-center text-white text-sm mr-4 mt-5 shadow-md">
                        <FaPen className="mr-1" />
                        Edit
                    </a>
                </Link>

                <h3 className="font-bold text-sm">Your Info</h3>

                <div className="w-full bg-white py-2 rounded-3xl">
                    <IoCall className="inline w-2/12" /> |
                    <p className="inline-block text-center w-8/12 mx-auto">
                        {isLoading ? LOADING_MSG : data?.userPhoneNumber || NOT_AVAILABLE_MSG}
                    </p>
                </div>
                <div className="w-full bg-white py-2 rounded-3xl">
                    <IoMail className="inline w-2/12" /> |
                    <p className="inline-block text-center w-8/12 mx-auto">
                        {isLoading ? LOADING_MSG : data?.userEmail || NOT_AVAILABLE_MSG}
                    </p>
                </div>
            </div>

            <div className="bg-gray-200 rounded-b-xl p-4 space-y-2">
                <h3 className="font-bold text-sm">Your family Info</h3>

                <div className="w-full bg-white py-2 rounded-3xl">
                    <IoCall className="inline w-2/12" /> |
                    <p className="inline-block text-center w-8/12 mx-auto">
                        {isLoading ? LOADING_MSG : data?.familyPhoneNumber || NOT_AVAILABLE_MSG}
                    </p>
                </div>
                <div className="w-full bg-white py-2 rounded-3xl">
                    <IoMail className="inline w-2/12" /> |
                    <p className="inline-block text-center w-8/12 mx-auto">
                        {isLoading ? LOADING_MSG : data?.familyEmail || NOT_AVAILABLE_MSG}
                    </p>
                </div>
            </div>
        </div>
    );
}

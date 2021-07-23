import Link from 'next/link';
import { FaBell, FaEnvelope, FaPen, FaPhone } from 'react-icons/fa';

import { useVaxSubscription } from '../hooks/useVaxSubscription';
export default function SubscribeStatus() {
    const { data } = useVaxSubscription();
    return (
        <div>
            <h2 className="font-bold">
                <FaBell className="inline" /> Subscribe to vaccination updates
            </h2>
            <p className="text-xs text-gray-500 py-2">
                You (and your family) will be notified when your vaccination appointment changes
            </p>
            <Link href="/subscribe">
                <button className="float-right bg-blue-500 rounded-full text-white py-1 px-4 mt-1 mr-1">
                    <FaPen className="inline" /> Edit
                </button>
            </Link>
            <div className="bg-gray-200 rounded-t-xl p-4 space-y-2">
                <h3 className="font-bold text-sm">Your Info</h3>

                <div className="w-full bg-white py-2 rounded-3xl">
                    <FaPhone className="inline w-2/12" /> |{' '}
                    <p className="inline text-center w-8/12">
                        {data?.userPhoneNumber ? data?.userPhoneNumber : ''}
                    </p>
                </div>
                <div className="w-full bg-white py-2 rounded-3xl">
                    <FaEnvelope className="inline w-2/12" /> |{' '}
                    <p className="inline text-center w-8/12">
                        {data?.userEmail ? data?.userEmail : ''}
                    </p>
                </div>
            </div>

            <div className="bg-gray-200 rounded-b-xl p-4 space-y-2">
                <h3 className="font-bold text-sm">Your family Info</h3>

                <div className="w-full bg-white py-2 rounded-3xl">
                    <FaPhone className="inline w-2/12" /> |{' '}
                    <p className="inline text-center w-8/12">
                        {data?.familyPhoneNumber ? data?.familyPhoneNumber : ''}
                    </p>
                </div>
                <div className="w-full bg-white py-2 rounded-3xl">
                    <FaEnvelope className="inline w-2/12" /> |{' '}
                    <p className="inline text-center w-8/12">
                        {data?.familyEmail ? data?.familyEmail : ''}
                    </p>
                </div>
            </div>
        </div>
    );
}

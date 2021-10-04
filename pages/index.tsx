import Link from 'next/link';
import React from 'react';

export default function index() {
    return (
        <div className="flex flex-col items-center bg-gradient-to-b from-purple-600 to-yellow-400 h-screen text-black justify-center p-10">
            <div className="text-2xl font-medium">
                NakVaksin service has sunset on October 3rd, 2021
            </div>
            <div>We thank you for your patronage and have a good day!</div>
            <div className="pt-3">
                <Link href="/shutdown">
                    <a className="underline">Read the full notice here</a>
                </Link>
            </div>
        </div>
    );
}

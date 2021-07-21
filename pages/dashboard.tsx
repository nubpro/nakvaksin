import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import Header from '../components/header';
import VaxStatus from '../components/vaxStatus';
import { useUser } from '../hooks/useUser';

export default function dashboard() {
    const { user } = useUser();
    const router = useRouter();
    return (
        <div className="container mx-auto px-4 pt-5">
            <Header />
            <VaxStatus />
        </div>
    );
}

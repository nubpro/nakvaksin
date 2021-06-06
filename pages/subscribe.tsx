import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Header from '../components/header';
import useUser from '../hooks/useUser';

export default function Subscribe() {
    const router = useRouter();
    const user = useUser();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, []);

    return (
        <div className="container mx-auto px-4 pt-5">
            <Header />
        </div>
    );
}

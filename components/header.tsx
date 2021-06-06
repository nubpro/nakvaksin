import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import useUser from '../hooks/useUser';

export default function Header() {
    // const [user, setUser] = useState({ username: null, displayName: null, token: null });

    // useEffect(() => {
    //     const userJSON = Cookies.getJSON('user');

    //     console.log(userJSON);

    //     if (userJSON) {
    //         const user = JSON.parse(userJSON);
    //         setUser(user);
    //     }
    // }, [Cookies.get('user')]);

    const user = useUser();
    const router = useRouter();
    const [, , removeCookies] = useCookies();

    // useEffect(() => {
    //     console.log('asd');
    // });

    return (
        <div className="text-center">
            <Link href="/">
                <a className="text-5xl text-primary font-semibold mb-3">
                    Nak Vaksin{' '}
                    <span role="img" aria-label="syringe">
                        💉
                    </span>
                </a>
            </Link>

            {user && (
                <div>
                    <div>
                        Welcome {user.displayName}{' '}
                        <button
                            type="button"
                            className="hover:underline"
                            onClick={() => {
                                removeCookies('user');
                                router.push('/');
                            }}>
                            (Logout)
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

import { useRouter } from 'next/router';

import { useUser } from '../hooks/useUser';

export default function Header() {
    const { data } = useUser();
    const router = useRouter();

    return (
        <header className="z-20 w-full xl:px-0 px-2">
            <div className="container mx-auto flex flex-wrap mt-8 mb-8 ">
                <div className="flex sm:w-1/2">
                    <a href="/" className="text-3xl text-blue-500 ml-1 font-bold">
                        Nak Vaksin{' '}
                        <span role="img" aria-label="syringe">
                            💉
                        </span>
                    </a>
                </div>
                <div className="flx sm:w-1/2 flex justify-end ">
                    {data && (
                        <div className="inline">
                            <h3 className="inline pr-4">Welcome {data.displayName} </h3>
                            <button
                                type="button"
                                className="text-xl text-white bg-blue-600 rounded-xl py-1 px-4 font-bold hover:underline"
                                onClick={() => {
                                    router.push('/');
                                }}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

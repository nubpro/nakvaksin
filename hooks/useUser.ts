import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

function useUser(): { username: string; displayName: string; token: string } {
    const [cookies] = useCookies(['user']);

    return cookies.user;
}

export default useUser;

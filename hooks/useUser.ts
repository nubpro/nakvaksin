import { useCookies } from 'react-cookie';
import User from '../types/user';

function useUser(): User {
    const [cookies] = useCookies(['user']);

    return cookies.user;
}

export default useUser;

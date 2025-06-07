import {useCallback, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../app/hooks.ts";
import {toast} from "react-toastify";
import {fetchUserDataByOAuth} from "./usersThunks.ts";

const OAuthSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const fetchUserData = useCallback(async () => {
        try {
            await dispatch(fetchUserDataByOAuth()).unwrap();
            toast.success('Login successful');
            navigate('/');
        } catch (e){
            toast.error("Failed to fetch user data");
            navigate('/');
        }
    }, [dispatch]);

    useEffect(() => {
        void fetchUserData();
    }, [fetchUserData]);

    return (
        <p>
            Logging in via OAuth... Pleas wait...
        </p>
    );
};

export default OAuthSuccess;
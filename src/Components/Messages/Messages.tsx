import { useEffect } from "react";
import "./messages.css";
// import { ForAuth } from "../Report/ForAuth";
// import { ReportDetail } from "./ReportDetail";
import { getMessages } from "../../store/messageSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";

export const Messages = () => {
    const { messages, loading, error } = useSelector((state: RootState) => state.messages);
    const isAuthenticated = useSelector((state: RootState) => state.auth.token !== null);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getMessages());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {isAuthenticated && (
                <div>
                    <h1>Messages</h1>
                    {messages.map((message) => (
                        <div key={message.id}>
                            <h2>{message.name}</h2>
                            <p>{message.email}</p>
                            <p>{message.message}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

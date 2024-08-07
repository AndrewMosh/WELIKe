import { useState } from "react";
import staff from "./officers.svg";
import "./officers.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { OfficerDetails } from "./OfficerDetails";
import { useDispatch, useSelector } from "react-redux";
import { getOfficers } from "../../store/officersSlice";
import { registerUser } from "../../store/registerSlice";
import { RootState, AppDispatch } from "../../store/store";

export const AllOfficers = () => {
    //состояния для регистрации нового сотрудника
    const isAuthenticated = useSelector((state: RootState) => state.auth.token !== null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setName] = useState("");
    const [lastName, setSurname] = useState("");
    const [newWorker, setNewWorker] = useState(false);
    const [detail, setDetail] = useState(false);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const { officers } = useSelector((state: RootState) => state.officers);

    //добавляем нового сотрудника
    const changeMail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const changeSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSurname(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(registerUser({ email, password, firstName, lastName }));
        setName("");
        setPassword("");
        setEmail("");
        setSurname("");
        setMessage("Новый сотрудник успешно зарегистрирован");
        dispatch(getOfficers());
    };
    const handleAdd = () => {
        setNewWorker(!newWorker);
    };
    const handleClose = () => {
        setNewWorker(!newWorker);
        setMessage("");
    };
    useEffect(() => {
        dispatch(getOfficers());
    }, [dispatch]);
    return (
        <>
            {" "}
            {(isAuthenticated && (
                <div>
                    ((
                    <div className="pic">
                        <img src={staff} alt="officers" />
                    </div>
                    <h2 className="title">Список всех зарегистрированных сотрудников</h2>
                    <div className="officerContainer">
                        <ol className="officers">
                            {<div className="loading">loading...</div> ||
                                officers.map((worker) => (
                                    <div key={worker._id} className="approve">
                                        <Link onClick={() => setDetail(!detail)} className="link" to={`/officers/${worker._id}`}>
                                            <li>{worker.email}</li>
                                        </Link>
                                    </div>
                                ))}
                        </ol>
                        {(officers.length === 0 && <div></div>) || (
                            <button className="addButton" onClick={handleAdd}>
                                Добавить сотрудника
                            </button>
                        )}
                        {(newWorker && (
                            <form method="post" className="addOfficer" onSubmit={handleSubmit}>
                                <div className="relat">
                                    <span
                                        style={{
                                            color: "white",
                                            textAlign: "center",
                                            marginBottom: "20px",
                                        }}
                                    >
                                        {message}
                                    </span>
                                    <label>E-mail </label>
                                    <input onChange={changeMail} type="text" name="email" value={email} required />

                                    <label>Пароль</label>
                                    <input onChange={changePassword} type="password" name="пароль" value={password} required />

                                    <label>Имя</label>
                                    <input onChange={changeName} type="text" name="имя" value={firstName} />

                                    <label>Фамилия</label>
                                    <input onChange={changeSurname} type="text" name="фамилия" value={lastName} />
                                    <span onClick={handleClose} className="close">
                                        X
                                    </span>
                                    <button>Добавить</button>
                                </div>
                            </form>
                        )) ||
                            (detail && <OfficerDetails detail={detail} setDetail={setDetail} />) ||
                            null}
                    </div>
                </div>
            )) || <div style={{ color: "#5288bd", fontSize: "200px", textAlign: "center" }}>404</div>}
        </>
    );
};

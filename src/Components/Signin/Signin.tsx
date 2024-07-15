import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import { RootState, AppDispatch } from "../../store/store";
import signin from "./signin.svg";
import "../Report/report.css";
import "./signin.css";

interface FormData {
    email: string;
    password: string;
}

export const Signin: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state: RootState) => state.auth.token !== null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(login(formData));

        if (isAuthenticated) {
            setFormData({ email: "", password: "" });
            setMessage("");
            navigate("/messages");
        } else {
            setFormData({ email: "", password: "" });
            setMessage("Вы ввели неверные данные");
        }
    };

    return (
        <div style={{ marginTop: "90px" }} className="report">
            <div className="signin">
                <img src={signin} alt="thief" />
            </div>
            <form className="formPublic" onSubmit={handleSubmit}>
                <h2>Авторизация</h2>
                <label htmlFor="email">E-mail</label>
                <input id="email" name="email" value={formData.email} onChange={handleInputChange} type="email" required />
                <label htmlFor="password">Пароль</label>
                <input id="password" name="password" value={formData.password} onChange={handleInputChange} type="password" required />
                <button style={{ margin: "30px 0 20px 0" }} className="register">
                    Войти
                </button>
                <p>{message}</p>
            </form>
        </div>
    );
};

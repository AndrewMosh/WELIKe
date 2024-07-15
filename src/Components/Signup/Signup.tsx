import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/registerSlice";
import { AppDispatch } from "../../store/store";
import { id } from "../../utils/clientId";
import signup from "./signup.svg";
import "../Report/report.css";
import "./signup.css";

interface FormData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    clientId: string;
}

export const Signup: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        clientId: "",
    });
    const [message, setMessage] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.password !== id) {
            setMessage("Введите валидный Id Client");
            return;
        }
        dispatch(registerUser(formData));
        setFormData({
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            clientId: "",
        });
        setMessage("Поздравлем! Вы зарегистрированы!");
    };

    return (
        <div className="report">
            <div className="signup">
                <img src={signup} alt="thief" />
            </div>
            <form className="formPublic" onSubmit={handleSubmit}>
                <h2>Регистрация</h2>
                <label htmlFor="email">E-mail*</label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                <label htmlFor="password">Пароль*</label>
                <input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} required />
                <label htmlFor="firstName">Имя</label>
                <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleInputChange} />
                <label htmlFor="lastName">Фамилия</label>
                <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleInputChange} />
                <label htmlFor="clientId">Client ID*</label>
                <input id="clientId" name="clientId" type="text" value={formData.clientId} onChange={handleInputChange} required />
                <button style={{ width: "200px", marginTop: "15px" }}>Зарегистрироваться</button>
                <p style={{ textAlign: "center", marginTop: "20px" }}>{message}</p>
            </form>
        </div>
    );
};

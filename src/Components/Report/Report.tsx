import { useState } from "react";
import thief from "./thief.svg";
import "./report.css";
import axios from "axios";
import { id } from "../../utils/clientId";
export const Report = () => {
    const [licenseNumber, setLicenseNumber] = useState("");
    const [ownerFullName, setOwnerFullName] = useState("");
    const [color, setColor] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [message, setMessage] = useState("");

    const handleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLicenseNumber(e.target.value);
    };
    const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOwnerFullName(e.target.value);
    };

    const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value);
    };

    const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    const handleInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };
    const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value);
        console.log(type);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        axios
            .post("https://skillfactory-final-project.herokuapp.com/api/public/report", {
                ownerFullName: ownerFullName,
                licenseNumber: licenseNumber,
                type: type,
                clientId: id,
                color: color,
                date: date,
                description: description,
            })
            .then((res) => {
                setLicenseNumber("");
                setOwnerFullName("");
                setColor("");
                setType("");
                setDate("");
                setDescription("");
                setMessage("Заявка отправлена");
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div className="report">
                <div>
                    <img src={thief} alt="thief" />
                </div>
                <form className="formPublic" method="post" onSubmit={handleSubmit}>
                    <p>{message}</p>
                    <h2>Сообщить о краже</h2>
                    <label>Номер лицензии* </label>
                    <input onChange={handleNumber} value={licenseNumber} type="text" required />
                    <label>ФИО клиента* </label>
                    <input onChange={handleName} value={ownerFullName} type="text" required />
                    <label>Цвет велосипеда </label>
                    <input onChange={handleColor} value={color} type="text" />
                    <label>Дата кражи</label>
                    <input onChange={handleDate} value={date} type="date" />
                    <label>Дополнительная информация</label>
                    <input onChange={handleInfo} value={description} type="text" />
                    <label>Тип велосипеда*</label>
                    <select onChange={handleType} value={type} required>
                        <option value="">Выберите тип велосипеда</option>
                        <option value="general">general</option>
                        <option value="sport">sport</option>
                    </select>
                    <button>Отправить</button>
                </form>
            </div>
        </>
    );
};

import React, { useState } from "react";
import "./report.css";
import axios from "axios";
import { useSelector } from "react-redux";
// import { getOfficers } from "../../store/officersSlice";
import { RootState } from "../../store/store";

export interface FormData {
    licenseNumber: string;
    ownerFullName: string;
    color: string;
    date: string;
    description: string;
    type: string;
    officer: string;
}

export const Report = () => {
    const [formData, setFormData] = useState<FormData>({
        licenseNumber: "",
        ownerFullName: "",
        color: "",
        date: "",
        description: "",
        type: "",
        officer: "",
    });
    const [message, setMessage] = useState("");

    const { officers } = useSelector((state: RootState) => state.officers);
    const isAuthenticated = useSelector((state: RootState) => state.auth.token !== null);
    // const dispatch = useDispatch<AppDispatch>();

    const listOfApproved = officers.filter((officer) => officer.approved);

    // useEffect(() => {
    //     dispatch(getOfficers());
    // }, [newMessage, dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://skillfactory-final-project.herokuapp.com/api/cases/", formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setFormData({
                licenseNumber: "",
                ownerFullName: "",
                color: "",
                date: "",
                description: "",
                type: "",
                officer: "",
            });
            setMessage("Заявка отправлена");
            console.log(response);
        } catch (error) {
            console.error(error);
            setMessage("Ошибка при отправке заявки");
        }
    };

    if (!isAuthenticated) {
        return <div style={{ color: "#5288bd", fontSize: "200px", textAlign: "center" }}>404</div>;
    }

    return (
        <form className="modalForm" onSubmit={handleSubmit}>
            <h2>Сообщить о краже</h2>
            <p>{message}</p>
            <div className="modalSubContainer">
                {/* <span onClick={() => setNewMessage(!newMessage)}>X</span> */}

                <div>
                    <label>Ответственный сотрудник </label>
                    <select name="officer" onChange={handleInputChange} value={formData.officer}>
                        <option value="">Выберите сотрудника</option>
                        {listOfApproved.map((officer) => (
                            <option key={officer._id} value={officer._id}>
                                {officer.firstName} {officer.lastName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Номер лицензии</label>
                    <input name="licenseNumber" onChange={handleInputChange} value={formData.licenseNumber} type="text" required />
                    <label>ФИО клиента</label>
                    <input name="ownerFullName" onChange={handleInputChange} value={formData.ownerFullName} type="text" required />
                </div>
                <div>
                    <label>Цвет велосипеда </label>
                    <input name="color" onChange={handleInputChange} value={formData.color} type="text" />
                    <label>Дата кражи</label>
                    <input name="date" onChange={handleInputChange} value={formData.date} type="date" />
                </div>
                <div>
                    <label>Дополнительная информация</label>
                    <input name="description" onChange={handleInputChange} value={formData.description} type="text" />
                    <label>Тип велосипеда </label>
                    <select name="type" onChange={handleInputChange} value={formData.type} required>
                        <option value="">Выберите тип велосипеда</option>
                        <option value="general">general</option>
                        <option value="sport">sport</option>
                    </select>
                </div>
                <button type="submit">Отправить</button>
            </div>
        </form>
    );
};

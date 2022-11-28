import React from "react";
import { useState } from "react";
import "./report.css";
import axios from "axios";
import { useEffect } from "react";

export const ForAuth = ({ newMessage, setNewMessage }) => {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [ownerFullName, setOwnerFullName] = useState("");
  const [color, setColor] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [officer, setOfficer] = useState("");
  const [list, setList] = useState([]);

  const approvedWorkers = async () => {
    const result = await axios.get(
      "https://skillfactory-final-project.herokuapp.com/api/officers/",

      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setList(
      result.data.officers.filter((officer) => officer.approved === true)
    );
  };

  useEffect(() => {
    approvedWorkers();
  }, []);

  const handleNumber = (e) => {
    setLicenseNumber(e.target.value);
  };
  const handleName = (e) => {
    setOwnerFullName(e.target.value);
  };

  const handleColor = (e) => {
    setColor(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleInfo = (e) => {
    setDescription(e.target.value);
  };
  const handleType = (e) => {
    setType(e.target.value);
    console.log(type);
  };
  const handleOfficer = (e) => {
    const chosenId = e.target.value;
    const chosenPerson = list.filter((p) => p._id === chosenId)[0];
    setOfficer(chosenPerson._id);
    console.log(officer);
  };
  useEffect(() => {
    console.log(officer);
  }, [officer]);
  useEffect(() => {
    console.log(type);
  }, [type]);
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://skillfactory-final-project.herokuapp.com/api/cases/",
        {
          ownerFullName: ownerFullName,
          licenseNumber: licenseNumber,
          type: type,
          color: color,
          date: date,
          description: description,
          officer: "bitch",
        },
        {
          Authorization: "Bearer" + localStorage.getItem("token"),
        }
      )
      .then((res) => {
        setLicenseNumber("");
        setOwnerFullName("");
        setColor("");
        setType("");
        setDate("");
        setDescription("");
        setMessage("Заявка отправлена");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className="modal" method="post" onSubmit={handleSubmit}>
      <span onClick={() => setNewMessage(!newMessage)}>X</span>
      <div>
        <p>{message}</p>
        <h2>Сообщить о краже</h2>
        <label>Номер лицензии </label>
        <input
          onChange={handleNumber}
          value={licenseNumber}
          type="text"
          required
        />
        <label>ФИО клиента </label>
        <input
          onChange={handleName}
          value={ownerFullName}
          type="text"
          required
        />
        <label>Цвет велосипеда </label>
        <input onChange={handleColor} value={color} type="text" />
        <label>Дата кражи</label>
        <input onChange={handleDate} value={date} type="date" />
        <label>Дополнительная информация</label>
        <input onChange={handleInfo} value={description} type="text" />
        <label>Тип велосипеда</label>
        <select
          onChange={handleType}
          value={type}
          defaultValue={"default"}
          required
        >
          <option value="default">Выберите тип велосипеда</option>
          <option value="general">general</option>
          <option value="sport">sport</option>
        </select>

        <label>Ответственный сотрудник</label>
        <select
          onChange={handleOfficer}
          defaultValue={"default"}
          value={officer}
        >
          <option value="default">Выберите сотрудника</option>
          {list.map((officer) => (
            <option key={officer._id} value={officer._id}>
              {officer.firstName} {officer.lastName}
            </option>
          ))}
        </select>

        <button type="submit">Отправить</button>
      </div>
    </form>
  );
};

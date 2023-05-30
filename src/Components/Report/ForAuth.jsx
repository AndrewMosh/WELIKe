import React from "react";
import { useState } from "react";
import "./report.css";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { allWorkers } from "../../store/officersSlice";
export const ForAuth = ({ newMessage, setNewMessage }) => {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [ownerFullName, setOwnerFullName] = useState("");
  const [color, setColor] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [officer, setOfficer] = useState("");
  const { officers } = useSelector((state) => state.officers);
  const dispatch = useDispatch();
  let listOfApproved = officers.filter((officer) => officer.approved === true);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

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
  };
  const handleOfficer = (e) => {
    const chosenId = e.target.value;
    const chosenPerson = listOfApproved.filter((p) => p._id === chosenId)[0];
    setOfficer(chosenPerson._id);
  };

  useEffect(() => {
    dispatch(allWorkers());
  }, [newMessage, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://skillfactory-final-project.herokuapp.com/api/cases/",
        {
          licenseNumber,
          ownerFullName,
          color,
          date,
          description,
          type,
          officer,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {(isAuthenticated && (
        <form className="modalForm" method="post" onSubmit={handleSubmit}>
          <h2>Сообщить о краже</h2>
          <p>{message}</p>
          <div className="modalSubContainer">
            <span onClick={() => setNewMessage(!newMessage)}>X</span>

            <div>
              <label>Ответственный сотрудник </label>
              <select onChange={handleOfficer} value={officer}>
                <option>Выберите сотрудника</option>
                {listOfApproved.map((officer) => (
                  <option key={officer._id} value={officer._id}>
                    {officer.firstName} {officer.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Номер лицензии</label>
              <input
                onChange={handleNumber}
                value={licenseNumber}
                type="text"
                required
              />
              <label>ФИО клиента</label>
              <input
                onChange={handleName}
                value={ownerFullName}
                type="text"
                required
              />
            </div>
            <div>
              <label>Цвет велосипеда </label>
              <input onChange={handleColor} value={color} type="text" />
              <label>Дата кражи</label>
              <input onChange={handleDate} value={date} type="date" />
            </div>
            <div>
              <label>Дополнительная информация</label>
              <input onChange={handleInfo} value={description} type="text" />
              <label>Тип велосипеда </label>
              <select onChange={handleType} value={type} required>
                <option value="">Выберите тип велосипеда</option>
                <option value="general">general</option>
                <option value="sport">sport</option>
              </select>
            </div>
            <button type="submit">Отправить</button>
          </div>
        </form>
      )) || (
        <div
          style={{ color: "#5288bd", fontSize: "200px", textAlign: "center" }}
        >
          404
        </div>
      )}
    </>
  );
};

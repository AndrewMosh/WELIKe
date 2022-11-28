import React from "react";
import "./offdetails.css";
import avatar from "./profile.svg";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const OfficerDetails = ({ detail, setDetail, info, allWorkers }) => {
  const { id } = useParams();
  let officer = info.find(({ _id }) => _id === id);
  const [editMode, setEdit] = useState(false);
  const [password, setPassword] = useState(officer.password);
  const [firstName, setName] = useState(officer.firstName);
  const [lastName, setSurname] = useState(officer.lastName);
  const [approved, setApproved] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();
    setEdit(!editMode);
  };
  const handleSave = (e) => {
    e.preventDefault();
    setEdit(!editMode);
    axios
      .put(
        `https://skillfactory-final-project.herokuapp.com/api/officers/${officer._id}`,
        {
          firstName: firstName,
          lastName: lastName,
          password: password.toString,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        allWorkers();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="details">
      <div className="businessCard">
        <div className="detailContainer">
          <img className="avatar" src={avatar} alt="avatar" />

          <div>
            <Link to={`/officers/`}>
              <span className="link" onClick={() => setDetail(!detail)}>
                X
              </span>
            </Link>

            <form className="surname" onSubmit={handleSave}>
              <label htmlFor="">Имя:</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                value={firstName}
                disabled={!editMode ? true : false}
              />
              <label htmlFor="">Фамилия:</label>
              <input
                onChange={(e) => setSurname(e.target.value)}
                type="text"
                value={lastName}
                disabled={!editMode ? true : false}
              />
              <label>Эл.почта:</label>
              <input type="text" value={officer.email} disabled />
              <label>Пароль:</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
                disabled={!editMode ? true : false}
              />
              <label>Идент.номер:</label>
              <input type="text" value={officer._id} disabled />
              {(!editMode && (
                <button className="edit" onClick={handleEdit}>
                  ред.
                </button>
              )) || <button className="edit">сохр.</button>}
              {(officer.approved === true && (
                <button className="cancel">Отозвать</button>
              )) || <button className="approveButton">Одобрить</button>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

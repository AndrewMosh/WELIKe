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
  const [password, setPassword] = useState("password");
  const [firstName, setName] = useState(officer.firstName);
  const [lastName, setSurname] = useState(officer.lastName);
  const [approved, setApproved] = useState(officer.approved);
  const [changePassword, setChangePassword] = useState(false);

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
          approved: approved,
          password: password,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
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
          <div className="avatar">
            <img src={avatar} alt="avatar" />
          </div>
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
                disabled={!editMode ? true : false}
                type="text"
                value={firstName}
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
                onClick={() => setChangePassword(!changePassword)}
                type="password"
                value={password}
                disabled={!editMode ? true : false}
              />
              <label>Идент.номер:</label>
              <input type="text" value={officer._id} disabled />

              <label>Одобрен</label>
              <input
                className="approved"
                type="checkbox"
                value={approved}
                disabled={!editMode ? true : false}
                checked={approved}
                onChange={() => setApproved(!approved)}
              />

              {(!editMode && (
                <button className="edit" onClick={handleEdit}>
                  редактировать
                </button>
              )) || <button className="saveRedact">сохранить</button>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

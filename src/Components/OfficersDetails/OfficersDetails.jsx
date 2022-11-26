import React from "react";
import avatar from "./profile.svg";
import { officers } from "../Store/Store";
import "./offdetails.css";
import staff from "../AllOfficers/officers.svg";
import { Link } from "react-router-dom";

export const OfficersDetails = () => {
  return (
    <div className="details">
      <div className="pic">
        <img src={staff} alt="officers" />
      </div>
      <h2 className="title">Список всех зарегистрированных сотрудников</h2>
      <div className="businessCard">
        <Link className="link" to={"/officers"}>
          <span>X</span>
        </Link>
        <div className="detailContainer">
          <img className="avatar" src={avatar} alt="avatar" />
          <div>
            <h4>Информация о сотруднике</h4>
            <div className="surname">
              {officers[0].firstName + " " + officers[0].lastName}
            </div>
            <p>Email: {officers[0].email}</p>
            <p>ClientId: {officers[0].clientId}</p>
            <button className="edit">ред.</button>
          </div>
          {(officers[0].approved === true && (
            <button className="cancel">
              <strong>Отозвать</strong>
            </button>
          )) || (
            <button className="approveButton">
              <strong>Одобрить</strong>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

import React from "react";
import avatar from "./profile.svg";

import "./offdetails.css";
import { useParams } from "react-router-dom";

export const OfficersDetails = ({ detail, setDetail, info }) => {
  const { id } = useParams();
  let officer = info.find(({ _id }) => _id === id);
  console.log(officer);
  return (
    <div className="details">
      <div className="businessCard">
        <div className="detailContainer">
          <img className="avatar" src={avatar} alt="avatar" />
          <div>
            <span className="link" onClick={() => setDetail(!detail)}>
              X
            </span>
            <h4>Информация о сотруднике</h4>
            <div className="surname">
              {officer.firstName + "         " + officer.lastName}
            </div>
            <p>Email: {officer.email}</p>
            <p>ClientId: {officer.clientId}</p>
            <button className="edit">ред.</button>
          </div>
          {(officer.approved === true && (
            <button className="cancel">Отозвать</button>
          )) || <button className="approveButton">Одобрить</button>}
        </div>
      </div>
    </div>
  );
};

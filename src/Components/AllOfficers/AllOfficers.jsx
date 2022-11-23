import React from "react";
import { officers } from "../Store/Store";
import staff from "./officers.svg";
import "./officers.css";

export const AllOfficers = () => {
  return (
    <div>
      <div className="pic">
        <img src={staff} alt="officers" />
      </div>
      <div className="officerContainer">
        <h2 className="title">Список всех зарегистрированных сотрудников</h2>
        <ol className="officers">
          {officers.map((officer) => (
            <div className="approve">
              <li>
                {officer.firstName +
                  " " +
                  officer.lastName +
                  " , эл. почта: " +
                  officer.email}
              </li>{" "}
              <button>
                <strong>Удалить</strong>
              </button>{" "}
            </div>
          ))}
        </ol>
      </div>
    </div>
  );
};

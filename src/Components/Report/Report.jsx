import React from "react";
import thief from "./thief.svg";
import "./report.css";

export const Report = () => {
  return (
    <div className="report">
      <div>
        <img src={thief} alt="thief" />
      </div>
      <form>
        <h2>Сообщить о краже</h2>
        <label htmlFor="">Номер лицензии </label>
        <input type="text" required />
        <label htmlFor="">ФИО клиента </label>
        <input type="text" required />
        <label htmlFor="">Цвет велосипеда </label>
        <input type="text" required />
        <label htmlFor="">Дата кражи</label>
        <input type="date" required />
        <label htmlFor="">Дополнительная информация</label>
        <input type="text" required />
        <label htmlFor="">Тип велосипеда</label>
        <select required>
          <option value="">обычный</option>
          <option value="">спортивный</option>
        </select>
        <button>Отправить</button>
      </form>
    </div>
  );
};

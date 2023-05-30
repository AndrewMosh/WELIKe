import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { allWorkers } from "../../store/officersSlice";
import { useSelector, useDispatch } from "react-redux";

export const ReportDetail = ({ setDetail, detail }) => {
  const { messages } = useSelector((state) => state.messages);
  const { officers } = useSelector((state) => state.officers);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  const { id } = useParams();
  let report = messages.find(({ _id }) => _id === id);
  const [editMode, setEdit] = useState(false);
  const [status, setStatus] = useState(report.status);
  const [licenseNumber, setLicenseNumber] = useState(report.licenseNumber);
  const [ownerFullName, setOwnerFullName] = useState(report.ownerFullName);
  const [type, setType] = useState(report.type);
  const [color, setColor] = useState(report.color);
  const [date, setDate] = useState(report.date);
  const [description, setDescription] = useState(report.description);
  const [officer, setOfficer] = useState(report.officer);
  const [resolution, setResolution] = useState(report.resolution);

  let listOfApproved = officers.filter((officer) => officer.approved === true);

  useEffect(() => {
    dispatch(allWorkers());
  }, [editMode, dispatch]);

  useEffect(() => {
    console.log(detail);
  }, [detail]);

  const handleOfficer = (e) => {
    const chosenId = e.target.value;
    const chosenPerson = listOfApproved.filter((p) => p._id === chosenId)[0];
    setOfficer(chosenPerson._id);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setEdit(!editMode);
    axios
      .put(
        `https://skillfactory-final-project.herokuapp.com/api/cases/${report._id}`,
        {
          status,
          licenseNumber,
          ownerFullName,
          type,
          color,
          date,
          description,
          officer,
          resolution,
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //удаляем заявку
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(
        `https://skillfactory-final-project.herokuapp.com/api/cases/${report._id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setDetail(!detail);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="modalDetail">
      {(isAuthenticated && (
        <>
          <div className="modalContainer">
            <h3>Детали кражи</h3>

            <Link to={`/cases/`}>
              <span onClick={() => setDetail(!detail)}>X</span>
            </Link>

            <div>
              <label>
                Номер заявки <br />
                <input type="text" value={report._id} disabled />
              </label>
              <label>
                Цвет
                <br />
                <input
                  type="text"
                  onChange={(e) => setColor(e.target.value)}
                  value={color}
                  disabled={!editMode ? true : false}
                  style={{
                    color: editMode && "black",
                    backgroundColor: editMode && "white",
                  }}
                />
              </label>
              <label>
                Создано
                <br />
                <input type="text" value={report.createdAt} disabled />
              </label>
              <label>
                Дата кражи
                <br />
                <input
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                  style={{
                    color: editMode && "black",
                    backgroundColor: editMode && "white",
                  }}
                  disabled={!editMode ? true : false}
                />
              </label>
            </div>
            <div>
              <label>
                Описание
                <br />
                <input
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  style={{
                    color: editMode && "black",
                    backgroundColor: editMode && "white",
                  }}
                  disabled={!editMode ? true : false}
                />
              </label>
              <label>
                Номер велосипеда
                <br />
                <input
                  type="text"
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  value={licenseNumber}
                  style={{
                    color: editMode && "black",
                    backgroundColor: editMode && "white",
                  }}
                  disabled={!editMode ? true : false}
                />
              </label>
              <label>
                Сотрудник
                <br />
                <select
                  value={officer}
                  onChange={handleOfficer}
                  style={{
                    color: editMode && "black",
                    backgroundColor: editMode && "white",
                  }}
                  disabled={!editMode ? true : false}
                >
                  <option value="">{officer}</option>
                  {listOfApproved.map((officer) => (
                    <option key={officer._id} value={officer._id}>
                      {officer.firstName} {officer.lastName}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Имя владельца
                <br />
                <input
                  type="text"
                  onChange={(e) => setOwnerFullName(e.target.value)}
                  value={ownerFullName}
                  style={{
                    color: editMode && "black",
                    backgroundColor: editMode && "white",
                  }}
                  disabled={!editMode ? true : false}
                />
              </label>
            </div>
            <div>
              {status === "done" && (
                <label>
                  Решение
                  <br />
                  <input
                    onChange={(e) => setResolution(e.target.value)}
                    type="text"
                    value={resolution}
                    style={{
                      color: editMode && "black",
                      backgroundColor: editMode && "white",
                    }}
                    disabled={!editMode ? true : false}
                    required
                  />
                </label>
              )}

              <label>
                Статус
                <br />
                <select
                  onChange={(e) => setStatus(e.target.value)}
                  defaultValue={"default"}
                  value={status}
                  style={{
                    color: editMode && "black",
                    backgroundColor: editMode && "white",
                  }}
                  disabled={!editMode ? true : false}
                >
                  <option value="new">new</option>

                  <option value="in_progress">in_progress</option>
                  <option value="done">done</option>
                </select>
              </label>
              <label>
                Тип
                <br />
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  style={{
                    color: editMode && "black",
                    backgroundColor: editMode && "white",
                  }}
                  disabled={!editMode ? true : false}
                >
                  <option value="sport">sport</option>
                  <option value="general">general</option>
                </select>
              </label>
              <label>
                Обновлено
                <br />
                <input type="text" value={report.updatedAt} disabled />
              </label>
            </div>
            {(!editMode && (
              <div
                onClick={() => setEdit(!editMode)}
                className="editDetail"
                role="button"
              >
                Редактировать
              </div>
            )) || (
              <div onClick={handleSubmit} className="saveDetail" role="button">
                Сохранить
              </div>
            )}
            <Link to={`/cases/`}>
              <div
                onClick={handleDelete}
                className="deleteDetail"
                role="button"
              >
                Удалить
              </div>
            </Link>
          </div>
        </>
      )) || (
        <div
          style={{ color: "#5288bd", fontSize: "200px", textAlign: "center" }}
        >
          404
        </div>
      )}
    </div>
  );
};

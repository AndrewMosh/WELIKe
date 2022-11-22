import React from "react";
import home from "./home.svg";
import bike1 from "./bike1.svg";
import bike2 from "./bike2.svg";
import bike3 from "./bike3.svg";
import "./home.css";

export const Home = () => {
  return (
    <div className="home">
      <img className="ride" src={home} alt="bike" />
      <div className="blob">
        <div>
          <span>
            Велосипед – это самый экологичный вид транспорта. Вы проявляете
            заботу об экологии и приносите пользу своему организму.
          </span>
        </div>
        <img src={bike2} alt="bike" />
        <div>
          <span>
            В наших велопрокатах Вас ждут отличные велосипеды всех типов:
            горные, городские, шоссейные, женские, подростковые и детские.{" "}
          </span>
        </div>
        <img src={bike1} alt="bike" />
        <div>
          <span>
            Если Вы не хотите тратиться на покупку велосипеда или Вам негде его
            хранить, то Velik – это то, что Вам нужно!
          </span>
        </div>
        <img src={bike3} alt="bike" />
      </div>
    </div>
  );
};

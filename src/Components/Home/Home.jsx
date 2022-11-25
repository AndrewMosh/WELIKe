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
            Украли Велик? <br />
            Постарайтесь взять себя в руки и не отчаивайтесь.
          </span>
        </div>
        <img src={bike2} alt="bike" />
        <div>
          <span>
            Внимательно осмотрите место угона на наличие каких-либо существенных
            улик.
          </span>
        </div>
        <img src={bike1} alt="bike" />
        <div>
          <span>
            Cообщитe о краже велосипеда заполнив форму на нашем сайте.
          </span>
        </div>
        <img src={bike3} alt="bike" />
      </div>
    </div>
  );
};

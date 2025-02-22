import React from "react";
import "./HomeInfo.css";
import { Link } from "react-router-dom";

function HomeInfo() {
  return (
    <article className="home-info">
      <div className="info-txt">
        <h2>
        Experience The Height of Fashion        </h2><br />
        <p>
        Where style meets sophistication. Discover our curated collection of exquisite designer pieces that define modern luxury.
        </p>
      </div>
      <button className="explore-clothing_btn">
        <Link to="explore/all">Discover Our Products </Link>
      </button>
    </article>
  );
}

export default HomeInfo;

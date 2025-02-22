import React from "react";
import HomePhotoShoot from "./HomePhotoShoot";
import HomeInfo from "./HomeInfo";
import "./HomeMain.css";
import FeaturedCategories from "./FeaturesCategories";

function HomeMain() {
  return (
    <main className="home-main container">
      <HomeInfo />
      <HomePhotoShoot />
      <FeaturedCategories/>
    </main>
  );
}

export default HomeMain;

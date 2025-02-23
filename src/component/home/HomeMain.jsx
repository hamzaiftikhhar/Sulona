import HomePhotoShoot from "./HomePhotoShoot"
import HomeInfo from "./HomeInfo"
import FeaturedCategories from "./FeaturesCategories"
import "./HomeMain.css"

function HomeMain() {
  return (
    <>
      <main className="home-main container">
        <HomeInfo />
        <HomePhotoShoot />
      </main>
      <FeaturedCategories />
    </>
  )
}

export default HomeMain


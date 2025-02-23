import HomeInfo from "./HomeInfo"
import ProductSlider from "./ProductSlider"
import "./HomeMain.css"
import FeaturedCategories from "./FeaturesCategories"

function HomeMain() {
  return (
    <>
    <main className="home-main">
      <div className="container">
        <div className="hero-section">
          <HomeInfo />
          <ProductSlider />
        </div>
      </div>
    </main>
    <FeaturedCategories/>
    </>
  )
}

export default HomeMain


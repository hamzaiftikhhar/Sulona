import { Link } from "react-router-dom"
import { ArrowRight } from "phosphor-react"
import "./HomeInfo.css"

function HomeInfo() {
  return (
    <article className="home-info parallax" data-speed="0.2">
      <div className="info-txt">
        <div className="heading-wrapper">
          <h1 className="split-heading">
            <span className="line">Experience</span>
            <span className="line">The Height of</span>
            <span className="line accent-text">Fashion</span>
          </h1>
        </div>
        <p className="fade-in-up">
          Where style meets sophistication. Discover our curated collection of exquisite designer pieces that define
          modern luxury.
        </p>
        <div className="cta-container fade-in-up">
          <Link to="explore/all" className="primary-button">
            <span className="button-text">Discover Our Products</span>
            <span className="button-icon">
              <ArrowRight weight="bold" />
            </span>
          </Link>
          <Link to="/lookbook" className="secondary-button">
            View Lookbook
          </Link>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="scroll-text">Scroll to explore</div>
      </div>
    </article>
  )
}

export default HomeInfo


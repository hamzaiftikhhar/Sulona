import { Link } from "react-router-dom"
import { ArrowRight } from "phosphor-react"
import "./HomeInfo.css"

function HomeInfo() {
  return (
    <article className="home-info">
      <div className="info-txt">
        <h2>
          Experience
          <br />
          The Height
          <br />
          of
          <br />
          Fashion
        </h2>
        <p>
          Where style meets sophistication. Discover our curated collection of exquisite designer pieces that define
          modern luxury.
        </p>
      </div>
      <div className="button-container">
        <Link to="explore/all" className="explore-clothing_btn">
          Discover Our Products
          <ArrowRight size={20} weight="bold" />
        </Link>
        <Link to="/lookbook" className="lookbook-btn">
          View Lookbook
        </Link>
      </div>
    </article>
  )
}

export default HomeInfo


import { Link } from "react-router-dom"
import { ArrowRight } from "phosphor-react"
import "./HomeInfo.css"

function HomeInfo() {
  return (
    <article className="home-info">
      <div className="info-txt">
        <h1>
          Experience
          <br />
          The Height
          <br />
          of
          <br />
          Fashion
        </h1>
        <p>
          Where style meets sophistication. Discover our curated collection of exquisite designer pieces that define
          modern luxury.
        </p>
        <div className="button-group">
          <Link to="/explore/all" className="explore-clothing_btn">
            <span>Discover Our Products</span>
            <ArrowRight size={20} weight="bold" />
          </Link>
          <Link to="/lookbook" className="lookbook-btn">
            View Lookbook
          </Link>
        </div>
      </div>
    </article>
  )
}

export default HomeInfo


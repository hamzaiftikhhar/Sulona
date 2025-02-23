import { Link } from "react-router-dom"
import { ArrowRight } from "phosphor-react"
import "./HomeInfo.css"

function HomeInfo() {
  return (
    <div className="home-info">
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
        <Link to="/explore/all" className="primary-button">
          Discover Our Products
          <ArrowRight size={20} weight="bold" />
        </Link>
        <Link to="/lookbook" className="secondary-button">
          View Lookbook
        </Link>
      </div>
    </div>
  )
}

export default HomeInfo


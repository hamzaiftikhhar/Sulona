import { Link } from "react-router-dom"
import { ArrowRight } from "phosphor-react"
import "./HomeInfo.css"

function HomeInfo() {
  return (
    <article className="home-info">
      <div className="info-txt">
        <h1 className="font-['Bebas_Neue'] text-[clamp(3.4rem,4vw+1rem,5.2rem)] leading-[0.9] tracking-tight">
          Experience
          <br />
          The Height
          <br />
          of
          <br />
          Fashion
        </h1>
        <p className="text-[1.8rem] text-gray-600 mt-6 mb-8 leading-relaxed max-w-[600px]">
          Where style meets sophistication. Discover our curated collection of exquisite designer pieces that define
          modern luxury.
        </p>
      </div>
      <div className="flex gap-4">
        <Link
          to="explore/all"
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md text-[1.6rem] font-medium transition-transform hover:-translate-y-0.5"
        >
          Discover Our Products
          <ArrowRight size={20} weight="bold" />
        </Link>
        <Link
          to="/lookbook"
          className="inline-flex items-center px-6 py-3 border border-black rounded-md text-[1.6rem] font-medium hover:bg-black/5 transition-colors"
        >
          View Lookbook
        </Link>
      </div>
    </article>
  )
}

export default HomeInfo


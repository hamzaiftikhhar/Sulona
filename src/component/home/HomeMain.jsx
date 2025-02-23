"use client"

import { useEffect } from "react"
import HomePhotoShoot from "./HomePhotoShoot"
import HomeInfo from "./HomeInfo"
import "./HomeMain.css"

function HomeMain() {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const parallaxElements = document.querySelectorAll(".parallax")

      parallaxElements.forEach((element) => {
        const speed = element.dataset.speed || 0.5
        const yPos = -(scrolled * speed)
        element.style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])


  return (
    <>
    
    <main className="home-main">
      <div className="hero-background">
        <div className="hero-pattern"></div>
        <div className="hero-gradient"></div>
      </div>
      <div className="hero-content container">
        <HomeInfo />
        <HomePhotoShoot />
      </div>
    </main>
    </>
  )
}

export default HomeMain


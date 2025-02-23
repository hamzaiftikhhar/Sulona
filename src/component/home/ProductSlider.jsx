"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight } from "phosphor-react"
import "./ProductSlider.css"

const products = [
  {
    id: 1,
    image: "/images/shoe1.jpg",
    title: "Nike Free Run",
  },
  {
    id: 2,
    image: "/images/shoe2.jpg",
    title: "New Balance X-90",
  },
  {
    id: 3,
    image: "/images/shoe3.jpg",
    title: "Nike Air Max",
  },
]

function ProductSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length)
  }

  return (
    <div className="product-slider">
      <div className="slider-container">
        <div className="slider-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {products.map((product) => (
            <div key={product.id} className="slide">
              <img src={product.image || "/placeholder.svg"} alt={product.title} className="slide-image" />
            </div>
          ))}
        </div>
      </div>

      <div className="slider-controls">
        <button onClick={prevSlide} className="slider-button prev">
          <ArrowLeft size={24} weight="bold" />
        </button>
        <div className="slider-dots">
          {products.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
        <button onClick={nextSlide} className="slider-button next">
          <ArrowRight size={24} weight="bold" />
        </button>
      </div>
    </div>
  )
}

export default ProductSlider


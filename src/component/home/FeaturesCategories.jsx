import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "phosphor-react";
import "./FeaturedCategories.css";

const categories = [
  {
    title: "New Arrivals",
    image: "/images/collection-item4.jpg", // Update with your image path
    link: "/category/new-arrivals"
  },
  {
    title: "Trending Now",
    image: "/images/card-large-item1.jpg", // Update with your image path
    link: "/category/trending"
  },
  {
    title: "Accessories",
    image: "/images/card-large-item7.jpg", // Update with your image path
    link: "/category/accessories"
  }
];

function FeaturedCategories() {
  return (
    <section className="featured-categories">
      <div className="container">
        <div className="featured-header">
          <h2>Featured Categories</h2>
          <p>Explore our curated collection of premium fashion pieces.</p>
        </div>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="category-card"
            >
              <Link to={category.link} className="category-link">
                <img
                  src={category.image || ""}
                  alt={category.title}
                  className="category-image"
                />
                <div className="category-overlay">
                  <div className="category-content">
                    <h3>{category.title}</h3>
                    <p className="shop-now">
                      Shop Now
                      <ArrowRight size={16} weight="bold" />
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCategories;
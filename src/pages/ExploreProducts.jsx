// pages/ExploreProducts.jsx
import { useEffect, useState } from "react";
import ProductCard from "../component/explore/ProductCard";
import fetchFromApi from "../utils/fetchFromApi";
import SelectCategory from "../component/explore/SelectCategory";
import PriceFilter from "../component/explore/PriceFilter";
import "./ExploreProducts.css";
import { useParams } from "react-router-dom";
import Shimmer from "../component/shimmer/Shimmer";
import Footer from "../component/Footer/Footer";

function ExploreProduct() {
  const [products, setProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState("default");
  const [checkBoxState, setCheckBoxState] = useState({
    electronics: false,
    clothing: false,
    books: false,
    // Add other categories as needed
  });
  let { category } = useParams();

  useEffect(() => {
    let resetCheckBoxState = {
      electronics: false,
      clothing: false,
      books: false,
      // Reset other categories as needed
    };
    if (category === "all") {
      setCheckBoxState(resetCheckBoxState);
      return;
    }
    setCheckBoxState({ ...resetCheckBoxState, [category]: true });
  }, [category]);

  useEffect(() => {
    async function getData() {
      try {
        let res = await fetchFromApi("api/products");
        function getFilteredData() {
          // If no category is selected, show all products
          const selectedCategories = Object.entries(checkBoxState)
            .filter(([_, isSelected]) => isSelected)
            .map(([category]) => category);

          if (selectedCategories.length === 0) {
            return res;
          }

          // Filter products by selected categories
          return res.filter((product) => 
            selectedCategories.includes(product.category.toLowerCase())
          );
        }
        setProducts(getFilteredData());
        setPriceFilter("default");
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    }
    getData();
  }, [checkBoxState]);

  function handleCategoryCheckBox(e) {
    let { name, checked } = e.target;
    setCheckBoxState({ ...checkBoxState, [name]: checked });
  }

  function handlePriceFilter(e) {
    let filter = e.target.value;
    if (filter === "low-to-high") {
      let priceFilteredData = products
        .slice()
        .sort((a, b) => a.price - b.price);
      setProducts(priceFilteredData);
    }
    if (filter === "high-to-low") {
      let priceFilteredData = products
        .slice()
        .sort((a, b) => b.price - a.price);
      setProducts(priceFilteredData);
    }
    setPriceFilter(filter);
  }

  return (
    <>
    <main className="product-main">
      <PriceFilter
        priceFilter={priceFilter}
        handlePriceFilter={handlePriceFilter}
        />
      <SelectCategory
        checkBoxState={checkBoxState}
        handleCheckBox={handleCategoryCheckBox}
        />
      <div className="products-container">
        <AllProducts products={products} />
      </div>
    </main>
    <Footer/>
        </>
  );
}

function AllProducts({ products }) {
  let productCards = products.length ? (
    products?.map((product) => {
      return <ProductCard product={product} key={product._id} />;
    })
  ) : (
    <Skeleton />
  );

  return productCards;
}

function Skeleton() {
  let a = [];
  for (let i = 0; i < 4; i++) {
    a.push(<Shimmer key={i} />);
  }
  return a;
}

export default ExploreProduct;
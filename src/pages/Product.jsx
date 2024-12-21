// pages/Product.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchFromApi from "../utils/fetchFromApi";
import ProductView from "../component/product/ProductView";
import "./Product.css";

function Product() {
  const [productData, setProductData] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        let data = await fetchFromApi(`products/${productId}`); // This will be converted to 'api/products/:id'
        setProductData(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    getData();
  }, [productId]);

  if (!productData) return <div>Loading...</div>;

  return (
    <main className="product-view_main container">
      <ProductView productData={productData} />
    </main>
  );
}

export default Product;
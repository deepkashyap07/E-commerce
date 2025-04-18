import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      // Create a copy of the products array
      let productsCopy = products.slice();
      
      // Filter products that match either category or subcategory
      // This is more flexible than requiring both to match
      productsCopy = productsCopy.filter(
        (item) => 
          (category && item.category === category) || 
          (subCategory && item.subCategory === subCategory)
      );
      
      // If we don't have enough related products, we can fall back to just category
      if (productsCopy.length < 2 && category) {
        productsCopy = products.filter(item => item.category === category);
      }
      
      // Limit to 5 products and set state
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.length > 0 ? (
          related.map((item, index) => {
            return (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-500">No related products found</p>
        )}
      </div>
    </div>
  );
};

export default RelatedProduct;

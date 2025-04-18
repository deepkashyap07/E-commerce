import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("Men");
  const [productSubCategory, setProductSubCategory] = useState("Topwear");
  const [productPrice, setProductPrice] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);
      formData.append("name", productName);
      formData.append("description", productDescription);
      formData.append("category", productCategory);
      formData.append("subCategory", productSubCategory);
      formData.append("price", productPrice);

      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );
      if(response.data.success){
        toast.success(response.data.message);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setProductName("");
        setProductDescription("");
        setProductCategory("Men");
        setProductSubCategory("Topwear");
        setProductPrice("");
        setBestseller(false);
        setSizes([]);}

      } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <form
      onSubmit={onsubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20 "
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              hidden
              id="image1"
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20 "
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              hidden
              id="image2"
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20 "
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              hidden
              id="image3"
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20 "
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              hidden
              id="image4"
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          onChange={(e) => setProductName(e.target.value)}
          value={productName}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product Descriptione</p>
        <textarea
          onChange={(e) => setProductDescription(e.target.value)}
          value={productDescription}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="write content here"
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">product Category</p>
          <select
            onChange={(e) => setProductCategory(e.target.value)}
            value={productCategory}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">product SubCategory</p>
          <select
            onChange={(e) => setProductSubCategory(e.target.value)}
            value={productSubCategory}
            className="w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">product Price</p>
          <input
            onChange={(e) => setProductPrice(e.target.value)}
            value={productPrice}
            className="w-full  px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
            required
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"
              }  px-3 py-1 cursor-pointer`}
            >
              S
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"
              }  px-3 py-1 cursor-pointer`}
            >
              M
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"
              }  px-3 py-1 cursor-pointer`}
            >
              L
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"
              }  px-3 py-1 cursor-pointer`}
            >
              XL
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"
              }  px-3 py-1 cursor-pointer`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          name=""
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to Bestsellers
        </label>
      </div>
      <button type="submit" className="w-28 py-2 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;

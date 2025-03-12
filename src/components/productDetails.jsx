import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../store/card";
import { ToastContainer, toast } from "react-toastify";

function Details() {
  let [data, setData] = useState([]);
  let [id, setId] = useState();
  let [counter, setCounter] = useState(0);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    setId(localStorage.getItem("id"));
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://dummyjson.com/product/${id}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  function card() {
    navigate("/card");
  }
  function notify() {
    toast.success("mahsulot savatga qoshildi");
  }
  console.log(data);
  function hom() {
    navigate("/");
  }

  return (
    <div>
      {data && (
        <div className="mx-auto container gap-5 w-[1240px]">
          <div className="w-[100%] flex items-center justify-center">
            <div>
              <h2 className="text-xl w-[450px] font-semibold">{data.description}</h2>
              <div className="mt-5 flex items-center">
                <div className="flex mr-6 gap-1">
                  <i className="fa-solid fa-star text-[#F5A623]"></i>
                  <i className="fa-solid fa-star text-[#F5A623]"></i>
                  <i className="fa-solid fa-star text-[#F5A623]"></i>
                  <i className="fa-solid fa-star text-[#F5A623]"></i>
                </div>
                <div className="text-[#7E818C] flex">
                  <p>
                    {data.rating} ({data?.reviews && data.reviews.length} sharh)
                  </p>
                  <p className="ml-2">
                    {data?.images && data.images.length} fotosurat
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[400px] flex justify-center items-center mt-5 mb-5 ">
              <div className="border rounded-xl">
                <img src={data?.images?.[0]} className="w-[300px]" alt="" />
                <button
                  onClick={() => {
                    dispatch(addToCart(data));
                    notify();
                  }}
                  className="w-3xs bg-green-500 h-10 mt-5 rounded-md cursor-pointer text-white ml-[25px]
                  mb-10"
                >
                  Savatga qoʻshish
                </button>
                <ToastContainer />
              </div>
            </div>
          </div>
          <div className="w-[35%]"></div>
        </div>
      )}
    </div>
  );
}

export default Details;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/card";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { FaCartPlus } from "react-icons/fa";

function Card() {
  let cart = useSelector((state) => state.cart.cartItems);
  let dispatch = useDispatch();
  let [data, setData] = useState([]);

  let navigate = useNavigate();
  useEffect(function () {
    axios
      .get(`https://dummyjson.com/products`)
      .then((response) => {
        return setData(response.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function details(id) {
    navigate(`/product/${id}`);
    localStorage.setItem("id", id);
  }
  function notify() {
    // event.stopPropagation();
    toast.success("mahsulot savatga qoshildi");
  }

  return (
    <div>
      <div className="max-w-[1240px] mx-auto p-6 space-y-4">
        <h2 className="text-2xl font-bold">Savat</h2>

        <div className="flex gap-5 relative w-full">
          <div>
            {cart?.length > 0 ? (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white w-3xl mt-8 hover:shadow-lg p-4 rounded-lg h-[170px] shadow-md flex items-center gap-4"
                >
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-purple-600"
                    defaultChecked
                  />
                  <img
                    src={item.images?.[0]}
                    alt={item.title}
                    className="w-26 h-26 rounded"
                  />

                  <div className="flex flex-col flex-1">
                    <span className="text-gray-500 text-sm">
                      Uzum Market omborida
                    </span>
                    <span className="font-semibold text-lg">{item.title}</span>
                    <span className="text-gray-500 text-sm">
                      Sotuvchi: {item.seller || "Noma'lum"}
                    </span>
                  </div>

                  <div>
                    <span className="text-lg font-bold text-purple-600">
                      {item.price} so'm
                    </span>
                    {item.oldPrice && (
                      <span className="block text-gray-400 line-through">
             
                        {item.oldPrice} so'm
                      </span>
                    )}
                    <button
                      className="ml-4 text-white py-3 px-5  cursor-pointer border rounded-xl bg-red-500"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Savat bo'sh</p>
            )}
          </div>
          {cart?.length > 0 && (
            <div className="w-[30%] right-32">
              <div className="bg-white p-4 rounded-lg shadow-md mt-5">
                <div className="flex items-center gap-1">
                  <i class="fa-regular fa-thumbs-up text-2xl text-[#8B5EFF] mr-1.5"></i>
                  <p className="font-medium">
                    Topshirish punktiga yoki kuryer orqali bepul yetkazib berish
                  </p>
                  <div className="">
                    <i class="fa-solid fa-question"></i>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md mt-5">
                <h3 className="text-lg font-semibold">Buyurtmangiz</h3>
                <div className="flex justify-between text-gray-600 mt-2">
                  <span>Mahsulotlar ({cart.length}):</span>
                  <span>
                    {cart
                      .reduce((total, item) => total + item.price, 0)
                      .toLocaleString()}{" "}
                    so'm
                  </span>
                </div>
                <div className="flex justify-between font-bold text-xl mt-2">
                  <span>Jami:</span>
                  <span className="text-purple-600">
                    {cart
                      .reduce((total, item) => total + item.price, 0)
                      .toLocaleString()}{" "}
                    so'm
                  </span>
                </div>
                <button className="w-full bg-purple-600 text-white py-2 rounded-lg mt-4 cursor-pointer transition">
                  Rasmiylashtirishga o'tish
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mx-auto container w-[1240px]">
        <ToastContainer />
        <div className="p-6 flex flex-wrap">
          {data.map((data) => (
            <div
              onClick={() => details(data.id)}
              key={data.id}
              className="mx-auto scale-3d relative bg-white rounded-2xl hover:shadow-xl w-[250px] mb-6 shadow cursor-pointer border-gray-200"
            >
              <img src={data.images[0]} alt="" className="w-full h-[200px]" />
              <i className="fa-regular absolute top-5 right-5 fa-heart"></i>

              <div className="p-4">
                <p className="text-xs mt-2 line-clamp-2">{data.description}</p>
                <div className="text-[12px] flex items-center gap-1">
                  <i className="fa-solid fa-star text-[#FFB54C]"></i>
                  <p className="text-gray-600">
                    {data.rating} ({data.stock} otziv)
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="items-center justify-between mt-3">
                    <p className="text-gray-400 text-sm line-through">
                      {data.price} so'm
                    </p>
                    <p className="text-lg font-bold">
                      {(
                        data.price -
                        data.price * (data.discountPercentage / 10)
                      ).toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      dispatch(addToCart(data));
                      notify(event);
                    }}
                    className="border mt-4 rounded-full w-8 h-8 text-[#BDBEC4]"
                  >
                    <img className="ml-[3px]" src={<FaCartPlus />} alt="" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;

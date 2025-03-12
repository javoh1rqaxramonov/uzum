import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { addToCart } from "../store/card";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { FaCartPlus } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

function Home() {
  let [data, setData] = useState([]);
  let [skip, setSkip] = useState(12);
  let [like, setLike] = useState([]);
  let navigation = useNavigate();
  let dispatch = useDispatch();

  useEffect(
    function () {
      axios
        .get(`https://dummyjson.com/products?limit=${skip}&skip=10`)
        .then((response) => {
          return setData(response.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [skip]
  );
  console.log(data);
  function skipp() {
    setSkip((skip += 12));
  }
  function cart() {
    navigation("/card");
  }
  function lik(e, id) {
    if (like.includes(id)) {
      setLike((prevLike) => prevLike.filter((item) => item !== id));
    } else {
      setLike((prevLike) => [...prevLike, id]);
    }
  }
  function details(id) {
    navigation(`/product/${id}`);
    localStorage.setItem("id", id);
  }
  function notify() {
    // event.stopPropagation();
    toast.success("mahsulot savatga qoshildi");
  }

  return (
    <div>
      <div className="mb-5">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          loop={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="w-full select-none rounded-2xl mb-4"
        >
          <SwiperSlide>
            <img
              src="https://static.uzum.uz/landing_universal/mmain-1.jpg"
              alt=""
              className="w-full h-[450px]"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.uzum.uz/cug7q9tht56sc95cis1g/main_page_banner.jpg"
              alt=""
              className="w-full h-[450px]"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.uzum.uz/cule2v6i4n324lr9f34g/main_page_banner.jpg"
              alt=""
              className="w-full h-[450px]"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.uzum.uz/cv45osmi4n36ls3t6m4g/main_page_banner.jpg"
              alt=""
              className="w-full h-[450px]"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.uzum.uz/cv4o265pb7f9qcng1frg/main_page_banner.jpg"
              alt=""
              className="w-full h-[450px]"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.uzum.uz/cv0qn6ui4n36ls3s9urg/main_page_banner.jpg"
              alt=""
              className="w-full h-[450px]"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.uzum.uz/cv3ehmtpb7f9qcnfmdsg/main_page_banner.jpg"
              alt=""
              className="w-full h-[450px]"
              height={513}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.uzum.uz/curg18tpb7f8r31vrhr0/main_page_banner.jpg"
              alt=""
              className="w-full h-[450px]"
            />
          </SwiperSlide>
        </Swiper>
        <div className="grid grid-cols-4 gap-3">
          <button className="flex items-center justify-center gap-2.5 bg-[#efefef] pt-2.5 pl-[12px] pb-2.5 pr-2 rounded-2xl cursor-pointer">
            <img
              justify-center
              src="https://static.uzum.uz/static/promo_images/f2ed316f-e096-4c91-8d4e-9ff50e4c8889"
              alt=""
              className="w-[40px] h-[40px] rounded-full"
            />
            <span>Ваша красота</span>
          </button>
          <button className="flex items-center justify-center gap-2.5 bg-[#efefef] pt-2.5 pl-[12px] pb-2.5 pr-2 rounded-2xl cursor-pointer">
            <img
              src="https://static.uzum.uz/static/promo_images/8fc205bf-b226-4068-aa1f-8399deb9f422"
              alt=""
              className="w-[40px] h-[40px] rounded-full"
            />
            <span>Все для авто</span>
          </button>
          <button className="flex items-center justify-center gap-2.5 bg-[#efefef] pt-2.5 pl-[12px] pb-2.5 pr-2 rounded-2xl cursor-pointer">
            <img
              src="https://static.uzum.uz/static/promo_images/358748a3-cb30-47eb-86b8-94fdd385d4d0"
              alt=""
              className="w-[40px] h-[40px] rounded-full"
            />
            <span>Для юных леди</span>
          </button>
          <button className="flex items-center justify-center gap-2.5 bg-[#efefef] pt-2.5 pl-[12px] pb-2.5 pr-2 rounded-2xl cursor-pointer">
            <img
              src="https://static.uzum.uz/static/promo_images/d4b53b3b-2f13-4de8-8ffa-c46b36b40649"
              alt=""
              className="w-[40px] h-[40px] rounded-full"
            />
            <span>Обновляем гардероб</span>
          </button>
        </div>
      </div>
      <div className="mx-auto container w-[1200px]">
        <ToastContainer />
        <div className="p-6 flex flex-wrap">
          {data.map((data) => (
            <div
              onClick={() => details(data.id)}
              key={data.id}
              className="mx-auto scale-3d relative bg-white rounded-2xl hover:shadow-xl w-[250px] mb-6 shadow cursor-pointer border-gray-200"
            >
              <img src={data.images[0]} alt="" className="w-full h-[200px]" />
              {like.includes(data.id) ? (
                <i className="fa-solid fa-heart absolute top-5 right-5 text-red-500"></i>
              ) : (
                <i
                  onClick={(event) => {
                    lik(data.id);
                    // event.stopPropagation();
                  }}
                  className="fa-regular absolute top-5 right-5 fa-heart"
                ></i>
              )}
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
      <div className="mx-auto container flex justify-center">
        <button
          onClick={skipp}
          className="w-[600px] font-semibold hover:bg-[#D0D3D9] cursor-pointer transition-all rounded-md p-4 mb-10 bg-[#E6E8ED]"
        >
          Show more
        </button>
      </div>
    </div>
  );
}

export default Home;

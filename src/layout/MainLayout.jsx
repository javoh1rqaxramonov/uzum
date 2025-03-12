import React from "react";
import logo from "../image/logo.svg";
import katalog from "../image/katalog.svg";
import search from "../image/search.svg";
import place from "../image/location.svg";
import flag from "../image/flag.svg";
import user from "../image/user.svg";
import like from "../image/like.svg";
import pack from "../image/package.svg";
import sale from "../image/sale.jpg";
import category from "../image/category.jpg";
import arrow from "../image/arrow.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function mainLay({children}) {
  const [location, setLocation] = useState("Joylashuv aniqlanmoqda...");
  const navigate = useNavigate()
  const {cartItems} = useSelector((state)=> state.cart)
  console.log(cartItems);
  
  function cart() {
    navigate("/card");
  }
  function hom() {
    navigate("/");
  }
  function lik(e,id) {
    // e.stopPropagation();

    if (like.includes(id)) {
      setLike((prevLike) => prevLike.filter((item) => item !== id));
    } else {
      setLike((prevLike) => [...prevLike, id]);
    }
  }
  function details(id) {
    navigate(`/product/${id}`)
    localStorage.setItem('id',id)
  }
  function notify() {
    toast.success("mahsulot savatga qoshildi");
  }
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            setLocation(
              data.address.city,
              data.address.town,
              data.address.village || "Joylashuv aniqlanmadi"
            );
          } catch (error) {
            setLocation("Joylashuvni aniqlashda xatolik yuz berdi");
          }
        },
        () => {
          setLocation("Joylashuvga ruxsat berilmadi");
        }
      );
    } else {
      setLocation("Brauzeringiz geolokatsiyani qo‘llab-quvvatlamaydi");
    }
  }, []);
  return (
    <div>
      <div>
        <header>
          <div className="bg-[#f2f4f7]">
            <div className="max-w-[1240px] mx-auto items-center mb-[17px]">
              <div className="flex justify-between ">
                <div className="flex items-center">
                  <img className="w-6 h-6" src={place} alt="" />
                  <h3 className="text-[#1F2026] font-normal text-[14px]">
                    Shahar:{" "}
                    <span className="text-[#1F2026] font-medium text-[14px] border-b-2 mr-6">
                      {location}
                    </span>
                  </h3>
                  <div>
                    <h3 className="text-[#1F2026] font-medium text-[14px]">
                      Topshirish punktlari
                    </h3>
                  </div>
                </div>
                <div>
                  <h3 className="text-[#8B8E99] font-normal text-[14px]">
                    Buyurtmangizni 1 kunda bepul yetkazib beramiz!
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex  items-center gap-4">
                    <h3 className="text-[#595B66] font-medium text-[14px] hover:text-black transition-all duration-200 cursor-pointer">
                      Savol-javoblar
                    </h3>
                    <h3 className="text-[#595B66] font-medium text-[14px] hover:text-black transition-all duration-200 cursor-pointer">
                      Buyurtmalarim
                    </h3>
                  </div>
                  <button className="flex items-center gap-[6px] cursor-pointer">
                    <img src={flag} alt="" />
                    <h3>Оʻzbekcha</h3>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex max-w-[1240px] mx-auto items-center">
            <div>
              <img onClick={hom} className="cursor-pointer" src={logo} alt="" />
            </div>
            <button className="mr-2 ml-8 py-2 px-[18px] bg-[#F0F0FF] cursor-pointer rounded-[4px]">
              <div className="flex items-center gap-1">
                <img src={katalog} alt="" />
                <h3 className="text-[#7000FF] text-[14px] font-medium">
                  Katalog
                </h3>
              </div>
            </button>
            <div className="flex flex-grow rounded-[4px]">
              <input
                className="outline-none border-2 border-[#D7D7D9] border-r-0 rounded-tr-[0px] rounded-br-[0px] rounded-l-[4px] py-1.5 h-[41px] pl-4 flex-grow"
                type="text"
                placeholder="Mahsulotlarni izlash"
              />
              <button className="py-1 border-2 border-[#D7D7D9] border-l-0 rounded-tl-[0px] rounded-bl-[0px] bg-[#F2F4F7] cursor-pointer rounded-sm px-6">
                <img src={search} alt="" />
              </button>
            </div>
            <div className="flex items-center gap-4 ml-6">
              <div className="flex items-center gap-[6px] cursor-pointer">
                <img src={user} alt="" />
                <h3 className="text-[#1F2026] font-medium text-[14px]">
                  Kirish
                </h3>
              </div>
              <div className="flex items-center gap-[6px] cursor-pointer">
                <img src={like} alt="" />
                <h3 className="text-[#1F2026] font-medium text-[14px]">
                  Saralangan
                </h3>
              </div>
              <div className="flex items-center gap-[6px] cursor-pointer">
                <img src={pack} alt="" />
                <h3 className="text-[#1F2026] font-medium text-[14px]" onClick={cart}>
                  Savat
                  <span className="py-1 px-1 bg-purple-500 rounded-md text-white">{cartItems.length}</span>
                </h3>
              </div>
            </div>
          </div>
          <nav className="max-w-[1240px] mx-auto items-center py-[10px]">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex items-center gap-1 mx-[10px]">
                    <img className="w-6 h-6" src={sale} alt="" />
                    <h3 className="font-[600] text-[#1F2026]">
                      Hafta tovarlari
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 mx-[10px]">
                    <img className="w-6 h-6" src={category} alt="" />
                    <h3 className="font-[600] text-[#1F2026]">
                      Har kuni foyda
                    </h3>
                  </div>
                </div>
                <div className="flex items-center">
                  <h3 className="text-[#595B66] font-normal text-[14px] mx-[10px] hover:text-black transition-all duration-200">
                    Elektronika
                  </h3>
                  <h3 className="text-[#595B66] font-normal text-[14px] mx-[10px] hover:text-black transition-all duration-200">
                    Maishiy texnika
                  </h3>
                  <h3 className="text-[#595B66] font-normal text-[14px] mx-[10px] hover:text-black transition-all duration-200">
                    Kiyim
                  </h3>
                  <h3 className="text-[#595B66] font-normal text-[14px] mx-[10px] hover:text-black transition-all duration-200">
                    Poyabzallar
                  </h3>
                  <h3 className="text-[#595B66] font-normal text-[14px] mx-[10px] hover:text-black transition-all duration-200">
                    Aksessuarlar
                  </h3>
                  <h3 className="text-[#595B66] font-normal text-[14px] mx-[10px] hover:text-black transition-all duration-200">
                    Goʻzallik va parvarish
                  </h3>
                  <h3 className="text-[#595B66] font-normal text-[14px] mx-[10px] hover:text-black transition-all duration-200">
                    Salomatlik
                  </h3>
                  <h3 className="text-[#595B66] font-normal text-[14px] mx-[10px] hover:text-black transition-all duration-200">
                    Uy-roʻzgʻor buyumlari
                  </h3>
                </div>
                <div>
                  <div className="flex">
                    <h3>Yana</h3>
                    <img src={arrow} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
        {children}
      </div>
    </div>
  );
}

export default mainLay;

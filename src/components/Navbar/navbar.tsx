import { Link } from "react-router-dom";
import { FaHouse, FaUserPlus, FaUsersLine, FaPerson, FaOutdent } from "react-icons/fa6";
import { useState } from "react";
import Close from "../Close/close";
import { useContext } from "react";
import { Context } from "../Context/context";
import { GiHamburgerMenu } from "react-icons/gi";



const Navbar = () => {
  const [isNavbarVisible, setNavbarVisible] = useState(false);

  const { userData }: any = useContext(Context);
  const [activete, setActive] = useState(null);

  const handleBg = (l: any) => {
    setActive(l);
        setNavbarVisible(false);
      
  };

  const toggleNavbar = () => {
    setNavbarVisible(!isNavbarVisible);

  };

  return (
    <>
      <GiHamburgerMenu className="absolute top-3 left-3 text-3xl text-white cursor-pointer sm:block md:block lg:hidden xl:hidden" onClick={toggleNavbar} />
      
      {/* القاءمه المنسدله */}
{isNavbarVisible && 

      <div className={`bg-black fixed inset-0 z-10 border-gray-800 text-white h-[100vh] w-[40%] sm:block md:block lg:hidden xl:hidden`}>
        <h1 className="border-l-4 border-orange-300 font-semibold px-2 m-5">UMS</h1>

        <div className="flex flex-col items-center">
          <div className="text-center mt-12">
            <img src={userData.image} alt="img" className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-40 lg:h-40 xl:w-40 xl:h-40 rounded-full mb-2 px-2" />
            <h1 className="font-bold text-lg">{userData.firstName} {userData.lastName}</h1>
            <h3 className="text-yellow-500 font-semibold">Admin</h3>
          </div>

          <ul className="flex flex-col font-semibold gap-4 mt-12 ">
            <li className={`flex gap-2 py-2 rounded-full ${activete === "home" && "bg-yellow-500"}`} onClick={() => handleBg("home")}>
              <FaHouse size={22} className="ml-2" />
              <Link to="home" className="text-md sm:text-md md:text-lg lg:text-lg xl:text-lg"> home</Link>
            </li>

            <li className={`flex gap-2 py-2 rounded-full ${activete === "users" && "bg-yellow-500"}`} onClick={() => handleBg("users")}>
              <FaUsersLine size={22} className="ml-2" />
              <Link to="users" className="text-md sm:text-md md:text-lg lg:text-lg xl:text-lg"> users</Link>
            </li>

            <li className={`flex gap-2 py-2 rounded-full ${activete === "addUser" && "bg-yellow-500"}`} onClick={() => handleBg("addUser")}>
              <FaUserPlus size={22} className="ml-2" />
              <Link to="addUser" className="text-md sm:text-md md:text-lg lg:text-lg xl:text-lg"> addUser</Link>
            </li>

            <li className={`flex gap py-2 rounded-full ${activete === "profile" && "bg-yellow-500"}`} onClick={() => handleBg("profile")}>
              <FaPerson size={22} className="ml-2" />
              <Link to="profile" className="text-md sm:text-md md:text-lg lg:text-lg xl:text-lg"> profile</Link>
            </li>
          </ul>
          <button
            onClick={toggleNavbar}
            className="text-red-500 font-bold text-xl absolute top-4 right-4"
          >
           ✖
          </button>
          <div className="flex gap-2 mt-10 cursor-pointer">
            <h2 className="font-semibold">
              <Link to='' onClick={() => toggleNavbar}><Close/></Link>
            </h2>
            <FaOutdent size={22} />
          </div>
        </div>
      </div>
    }



{/* القاءمه العاديه */}

      <div className={`bg-gray-900 border-r-2 h-[100vh] border-gray-800 text-white hidden sm:hidden md:hidden lg:block xl:block`}>
        <h1 className="border-l-4 border-orange-300 font-semibold px-2 m-5">UMS</h1>

        <div className="flex flex-col items-center">
          <div className="text-center mt-6">
            <img src={userData.image} alt="img" className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-40 lg:h-40 xl:w-40 xl:h-40 rounded-full mb-2 px-2" />
            <h1 className="font-bold text-lg">{userData.firstName} {userData.lastName}</h1>
            <h3 className="text-yellow-500 font-semibold">Admin</h3>
          </div>

          <ul className="flex flex-col font-semibold gap-4 mt-12 ">
            <li className={`flex gap-2 py-2 rounded-full ${activete === "home" && "bg-yellow-500"}`} onClick={() => handleBg("home")}>
              <FaHouse size={22} className="ml-2" />
              <Link to="home" className="text-md sm:text-md md:text-lg lg:text-lg xl:text-lg"> home</Link>
            </li>

            <li className={`flex gap-2 py-2 rounded-full ${activete === "users" && "bg-yellow-500"}`} onClick={() => handleBg("users")}>
              <FaUsersLine size={22} className="ml-2" />
              <Link to="users" className="text-md sm:text-md md:text-lg lg:text-lg xl:text-lg"> users</Link>
            </li>

            <li className={`flex gap-2 py-2 rounded-full ${activete === "addUser" && "bg-yellow-500"}`} onClick={() => handleBg("addUser")}>
              <FaUserPlus size={22} className="ml-2" />
              <Link to="addUser" className="text-md sm:text-md md:text-lg lg:text-lg xl:text-lg"> addUser</Link>
            </li>

            <li className={`flex gap py-2 rounded-full ${activete === "profile" && "bg-yellow-500"}`} onClick={() => handleBg("profile")}>
              <FaPerson size={22} className="ml-2" />
              <Link to="profile" className="text-md sm:text-md md:text-lg lg:text-lg xl:text-lg"> profile</Link>
            </li>
          </ul>

          <div className="flex gap-2 mt-10 cursor-pointer">
            <h2 className="font-semibold">
              <Link to=''><Close /></Link>
            </h2>
            <FaOutdent size={22} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

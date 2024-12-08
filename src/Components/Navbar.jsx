import { FaCartShopping } from "react-icons/fa6";
import { RiAccountCircle2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Pizza_Max_Logo from "../Assets/Images/pizza-max-logo.png";
import Button from "./Button";

const NavbarComp = () => {
  return (
    <div className="navbar flex justify-between items-center bg-navbarColor px-4 py-4 sm:px-10 ">
      <div className="left-side-navbar flex justify-center items-center">
        <div className="logo">
          <Link to={"/"}>
            <img
              src={Pizza_Max_Logo}
              loading="lazy"
              alt="Pizza-Max"
              className="h-12 w-12 sm:w-16 sm:h-16 cursor-pointer"
            />
          </Link>
        </div>
      </div>
      <div className="right-side-navbar flex justify-center items-center gap-4 sm:gap-8">
        <div className="cart-container relative">
          <div className="cart-status absolute bottom-7 left-8 text-center font-bold text-white h-6 w-6 border-2 border-white rounded-md">
            {"0"}
          </div>
          <div className="cart-icon">
            <FaCartShopping size={35} color="white" cursor={"pointer"} />
          </div>
        </div>
        <div className="account-btn">
          <RiAccountCircle2Fill
            size={35}
            color="white"
            className="sm:hidden"
            cursor={"pointer"}
          />
          <Button
            className={
              "hidden sm:flex border-2 border-white rounded-md px-4 py-2 text-white font-semibold"
            }
            title={"Login/Register"}
            type={"button"}
            name={"login/register"}
            id={"login/register"}
          />
        </div>
      </div>
    </div>
  );
};

export default NavbarComp;
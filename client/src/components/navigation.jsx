import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {  AiOutlineUser } from "react-icons/ai";
import styles from "../styles";
const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { _id } = userInfo;
  return (
    <div
      className={`absolute top-0 left-0 right-0 z-50 bg-black px-5 py-3 mx-auto  flex justify-center items-center flex-col md:flex-row md:justify-between ${styles.boxWidth}`}>
      <div className=" text-2xl font-bold mb-4 md:mb-0">
        <Link to={"/"} className=" cursor-pointer">
          Onlypipe
        </Link>
      </div>

      <div className="flex justify-center items-center gap-6">
        <Link to="/" className="cursor-pointer md:text-xl text-base">
          Blog
        </Link>
        <Link to="/" className="cursor-pointer md:text-xl text-base">
          Create
        </Link>
        <Link to="/" className="cursor-pointer md:text-xl text-base">
          About
        </Link>

        {_id ? (
          <Link to="/profile">
            <AiOutlineUser size={18} />
          </Link>
        ) : (
          <Link to="/login" className="cursor-pointer md:text-xl text-base">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navigation;

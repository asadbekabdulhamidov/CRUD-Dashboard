//rrd
import { Link } from "react-router-dom";

//react icons
import { AiFillProduct } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

function Sidebar() {
  return (
    <div className="h-screen w-[306px] bg-gray-100 px-5 py-6">
      <div className="mb-10 flex w-full justify-start">
        <Link
          to="/"
          className="btn btn-primary px-10 py-6 text-[1.4rem] font-medium leading-[2.1rem]"
        >
          PremiumSoft
        </Link>
      </div>
      <div className="flex flex-col gap-10">
        <Link
          to="/users"
          className="group flex items-center rounded-md p-3 transition-all duration-300 hover:translate-x-[10px] hover:bg-[#5932ea]"
        >
          <FaUsers className="mr-10 h-6 w-6 text-gray-500 group-hover:text-white" />
          <span className="text-[14px] font-medium leading-[21px] group-hover:text-white">
            Users
          </span>
          <IoIosArrowForward className="ml-auto h-4 w-4 text-gray-500 group-hover:text-white" />
        </Link>
        <Link
          to="/products"
          className="group flex items-center rounded-md p-3 transition-all duration-300 hover:translate-x-[10px] hover:bg-[#5932ea]"
        >
          <AiFillProduct className="mr-10 h-6 w-6 text-gray-500 group-hover:text-white" />
          <span className="text-[14px] font-medium leading-[21px] group-hover:text-white">
            Products
          </span>
          <IoIosArrowForward className="ml-auto h-4 w-4 text-gray-500 group-hover:text-white" />
        </Link>
        <Link
          to="/carts"
          className="group flex items-center rounded-md p-3 transition-all duration-300 hover:translate-x-[10px] hover:bg-[#5932ea]"
        >
          <FaCartShopping className="mr-10 h-6 w-6 text-gray-500 group-hover:text-white" />
          <span className="text-[14px] font-medium leading-[21px] group-hover:text-white">
            Carts
          </span>
          <IoIosArrowForward className="ml-auto h-4 w-4 text-gray-500 group-hover:text-white" />
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;

//  <li className="group flex items-center rounded-md p-3 transition-all duration-300 hover:translate-x-[10px] hover:bg-[#5932ea]">
//           <AiFillProduct className="mr-10 h-6 w-6 text-gray-500 group-hover:text-white" />
//           <Link
//             className="text-[14px] font-medium leading-[21px] group-hover:text-white"
//             to="/products"
//           >
//             Products
//           </Link>
//           <IoIosArrowForward className="ml-auto h-4 w-4 text-gray-500 group-hover:text-white" />
//         </li>
//         <li className="group flex items-center rounded-md p-3 transition-all duration-300 hover:translate-x-[10px] hover:bg-[#5932ea]">
//           <FaUsers className="mr-10 h-6 w-6 text-gray-500 group-hover:text-white" />
//           <Link
//             className="text-[14px] font-medium leading-[21px] group-hover:text-white"
//             to="/users"
//           >
//             Users
//           </Link>
//           <IoIosArrowForward className="ml-auto h-4 w-4 text-gray-500 group-hover:text-white" />
//         </li>
//         <li className="group flex items-center rounded-md p-3 transition-all duration-300 hover:translate-x-[10px] hover:bg-[#5932ea]">
//           <FaCartShopping className="mr-10 h-6 w-6 text-gray-500 group-hover:text-white" />
//           <Link
//             className="text-[14px] font-medium leading-[21px] group-hover:text-white"
//             to="/carts"
//           >
//             Carts
//           </Link>
//           <IoIosArrowForward className="ml-auto h-4 w-4 text-gray-500 group-hover:text-white" />
//         </li>

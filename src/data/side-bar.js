import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import { TiUserAddOutline } from "react-icons/ti";

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Add Product",
    icon: <BiImageAdd />,
    path: "/add-product",
  },
  {
    title: "Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
        icon: <TiUserAddOutline size={35} color="#999" />,
      },
      {
        title: "Edit Profile",
        path: "/profile-update",
        icon: <TiUserAddOutline size={35} color="#999" />,
      },
    ],
  },
  {
    title: "Contact Us",
    icon: <FaCommentAlt />,
    path: "/contact-us",
  },
];

export default menu;

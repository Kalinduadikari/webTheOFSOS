import { FaTh } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";

import { GiCannedFish } from "react-icons/gi";
import { BsFillChatRightDotsFill } from "react-icons/bs";
import { FcComboChart, FcPositiveDynamic } from "react-icons/fc";


const navmenu = [
  {
    title: "Dashboard",
    icon: <FaTh  color='#00bcd4' />,
    path: "/dash",
  },
  {
    title: "Add Product",
    icon: <BiImageAdd  color='#00bcd4' />,
    path: "/add-product",
  },
  {
    title: "Orders",
    icon: <GiCannedFish  color='#00bcd4' />,
    path: "/order",
  },
  {
    title: "Chat",
    icon: <BsFillChatRightDotsFill  color='#00bcd4'  />,
    path: "/chat",
  },
  {
    title: "Best Selling",
    icon: <FcPositiveDynamic/>,
    childrens: [
      {
        title: "Products",
        path: "/bestpr",
      },
      {
        title: "Combinations",
        path: "/best",
      },
    ],
  },
  {
    title: "Forecast Demand",
    icon: <FcComboChart />,
    childrens: [
      {
        title: "PARAW",
        path: "/besr",
      },
      {
        title: "TUNA",
        path: "/tu",
      },
    ],
  },
  
];

export default navmenu;
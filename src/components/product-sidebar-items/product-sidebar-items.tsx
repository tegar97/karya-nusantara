import React, { useState } from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { Card, CardContent } from "@material-ui/core";
import Link from "next/link";
import { motion, useCycle } from "framer-motion";
function ProductSideBarItems({ product }) {
  const [ItemOnClick, setItemOnClick] = useState(null);
  const [animation, cycleAnimation] = useCycle("animationOne", "animationTwo");

  const dropCategory = (id) => {
    setItemOnClick(!ItemOnClick);
    cycleAnimation();
  };
  const DropDownAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  const loaderVariants = {
    animationOne: {
      rotate: 180,
    },
    animationTwo: {
      rotate: 0,
    },
  };

  return (
    <div className="mt-4 mb-2">
      <div
        className="flex items-center"
        onClick={() => dropCategory(product.id)}
      >
        <motion.button
          variants={loaderVariants}
          animate={animation}
          className="outline-none "
          style={{ outline: "none" }}
        >
          <KeyboardArrowDownIcon
            style={{ fontSize: "1.2rem" }}
            fontSize="inherit"
          />
        </motion.button>
        <Link href={`/product/?category=${product.id}`}>
          <span className="ml-2 cursor-pointer text-md hover:text-blue-100">
            {product.name}
          </span>
        </Link>
      </div>
      {ItemOnClick
        ? product.subCategory.map((data) => (
            <motion.ul
              variants={DropDownAnimation}
              animate="visible"
              initial="hidden"
              className="ml-5 cursor-pointer"
              style={{ padding: "0.2rem" }}
            >
              <li className="text-sm">
                <Link href={`/product/?category=${product.id}&sc=${data.id}`}>
                  {data.name}
                </Link>
              </li>
            </motion.ul>
          ))
        : ""}
    </div>
  );
}

export default ProductSideBarItems;

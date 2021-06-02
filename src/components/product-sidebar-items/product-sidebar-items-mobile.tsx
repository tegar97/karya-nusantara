import React, { useState } from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { Card, CardContent, List, ListItem } from "@material-ui/core";
import Link from "next/link";
import { motion, useCycle } from "framer-motion";
import { useRouter } from "next/router";
import useSWR from "swr";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const fetcher = (
  ...args: [input: RequestInfo, init?: RequestInit | undefined]
): any => fetch(...args).then((res) => res.json());
function ProductSideBarItemsMobile({
  getData,
  product,
  setGetData,
  handleClose,
}) {
  const router = useRouter();
  const [ItemOnClick, setItemOnClick] = useState(null);
  const [animation, cycleAnimation] = useCycle("animationOne", "animationTwo");
  const { category } = router.query;
  const { data: ProductData, error } = useSWR(
    `${process.env.API_LARAVEL}/api/product/${getData}`,
    fetcher
  );
  const dropCategory = (id) => {
    setItemOnClick(!ItemOnClick);
    if (id == getData) {
      setGetData(0);
    } else {
      setGetData(id);
      handleClose();
    }
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
      <div className="flex items-center">
        <motion.button
          variants={loaderVariants}
          animate={animation}
          className="outline-none "
          style={{ outline: "none" }}
          onClick={() => dropCategory(product.id)}
        >
          <KeyboardArrowDownIcon
            style={{ fontSize: "1.2rem" }}
            fontSize="inherit"
          />
        </motion.button>
        <List>
          <Link href={`/product/?category=${product.id}`}>
            <ListItem
              onClick={() => dropCategory(product.id)}
              className={`ml-2  cursor-pointer text-md hover:text-blue-100  ${
                category == product.id && ItemOnClick ? "text-blue-100  " : ""
              }`}
            >
              {product.name}
            </ListItem>
          </Link>
        </List>
      </div>
      {getData == product.id ? (
        !ProductData ? (
          <SkeletonTheme color="#fffff" highlightColor="#ffff">
            <p>
              <Skeleton count={3} />
            </p>
          </SkeletonTheme>
        ) : (
          ProductData.data.product.data.map((data) => (
            <motion.ul
              variants={DropDownAnimation}
              animate="visible"
              initial="hidden"
              className="ml-5 cursor-pointer"
              style={{ padding: "0.2rem" }}
            >
              <ListItem>
                <Link href={`/product/${data.slug}`}>{data.name}</Link>
              </ListItem>
            </motion.ul>
          ))
        )
      ) : (
        ""
      )}
    </div>
  );
}

export default ProductSideBarItemsMobile;

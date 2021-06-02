import React, { useEffect } from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { Card, CardContent } from "@material-ui/core";
import Link from "next/link";
function ProductSideBar({ children }) {
  return (
    <Card className="p-2 text-lg ">
      <CardContent>
        <span className="hidden lg:text-lg">Katalog</span>
        {children}
      </CardContent>
    </Card>
  );
}

export default ProductSideBar;

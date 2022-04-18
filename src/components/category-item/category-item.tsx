import { Checkbox } from "@material-ui/core";
import React, { useState } from "react";

function CategoryItem({ data, setSubCategory, subCategoryFilter }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <li className="cursor-pointer mb-2">
      <div className="flex flex-row" onClick={() => setExpanded(!expanded)}>
        <span className="text-sm text-gray-500">{data.categoryName}</span>
        {expanded ? (
          <img
            src={"/assets/icon/arrow_up.svg"}
            alt="dropdown icon"
            className="lg:w-4 ml-2 fill-gray-500 rotate-90	"
          />
        ) : (
          <img
            src={"/assets/icon/arrow_dash.svg"}
            alt="dropdown icon"
            className="lg:w-4 ml-2 fill-gray-500 rotate-90	"
          />
        )}
      </div>
      {expanded &&
        data.sub_category.map((subCategory) => {
          return (
            <ul className="ml-2 mt-1">
              <li className="flex flex-row items-center">
                {" "}
                <input
                  className=""
                  type="checkbox"
                  name={subCategory.id}
                  onChange={(val) => subCategoryFilter(val)}
                />
                <span
                  className="text-sm text-gray-500 ml-1"
                  onClick={() => setSubCategory(subCategory.id)}
                >
                  {subCategory.subCategoryName}
                </span>
              </li>
            </ul>
          );
        })}
    </li>
  );
}

export default CategoryItem;

import { useEffect, useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { useGetCategoriesQuery } from "../../features/categories/categoriesApi";
import TreeView, { flattenTree } from "react-accessible-treeview";
import cx from "classnames";
import "./tree.css";

const ArrowIcon = ({ isOpen, className }) => {
  console.log(isOpen);
  const baseClass = "arrow";
  const classes = cx(
    baseClass,
    { [`${baseClass}--closed`]: !isOpen },
    { [`${baseClass}--open`]: isOpen },
    className
  );
  return <IoMdArrowDropright className={classes} />;
};

const Categories = () => {
  const { isLoading, data } = useGetCategoriesQuery();
  const [catTree, setCatTree] = useState({});
  const [expandedIds, setExpandedIds] = useState();

  useEffect(() => {
    if (data?.data) {
      setCatTree({ name: "", children: data?.data || [] });
    }
  }, [data]);

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      getAndSetIds();
    }
  };

  const getAndSetIds = () => {
    setExpandedIds(
      document
        .querySelector("#txtIdsToExpand")
        .value.split(",")
        .filter((val) => !!val.trim())
        .map((x) => {
          if (isNaN(parseInt(x.trim()))) {
            return x;
          }
          return parseInt(x.trim());
        })
    );
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <TreeView
      data={flattenTree(catTree)}
      className="basic"
      aria-label="category tree"
      expandedIds={expandedIds}
      defaultExpandedIds={[1]}
      nodeRenderer={({
        element,
        getNodeProps,
        level,
        handleSelect,
        isBranch,
        isExpanded,
      }) => (
        <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1) }}>
          <div
            className={`flex items-center space-x-2 p-2 ${
              isExpanded ? "bg-gray-300" : ""
            }`}
          >
            {isBranch && <ArrowIcon isOpen={isExpanded} />}
            {element.name}
          </div>
        </div>
      )}
    />
  );
};

export default Categories;

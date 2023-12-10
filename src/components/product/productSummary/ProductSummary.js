import React, { useEffect } from "react";
import "./ProductSummary.scss";
import InfoBox from "../../infoBox/InfoBox";
import { FaNairaSign } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { BsCart4, BsCartX } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_STORE_VALUE,
  CALC_OUTOFSTOCK,
  CALC_CATEGORY,
  selectTotalStoreValue,
  selectTotalOutOfStock,
  selectCategory,
} from "../../../redux/features/product/productSlice";

//ICONS
const earnIcon = <FaNairaSign size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const catIcon = <BiCategory size={40} color="#fff" />;
const stockIcon = <BsCartX size={40} color="#fff" />;

export const formatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
});

const ProductSummary = ({ products }) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
  const totalOutOfStock = useSelector(selectTotalOutOfStock);
  const totalCategory = useSelector(selectCategory);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUTOFSTOCK(products));
    dispatch(CALC_CATEGORY(products));
  }, [dispatch, products]);
  return (
    <div className="product-summary">
      <h3 className="--mt">Inventory Stats</h3>
      {
        <div className="info-summary">
          <InfoBox
            icon={productIcon}
            title={"Total Products"}
            count={products ? products.length : 0}
            bgColor={"card1"}
          />
          <InfoBox
            icon={earnIcon}
            title={"Total Store Value"}
            count={formatter.format(totalStoreValue)}
            bgColor={"card2"}
          />
          <InfoBox
            icon={stockIcon}
            title={"Out of Stock"}
            count={totalOutOfStock}
            bgColor={"card3"}
          />
          <InfoBox
            icon={catIcon}
            title={"All Categories"}
            count={totalCategory}
            bgColor={"card4"}
          />
        </div>
      }
    </div>
  );
};

export default ProductSummary;

import React, { useEffect } from "react";
import "./ProductDetail.scss";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getProduct } from "../../../redux/features/product/productSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/loader";
import { formatter } from "../productSummary/ProductSummary";
import DOMPurify from "dompurify";

const ProductDetail = () => {
  useRedirectLoggedOutUser("/login");
  const { id } = useParams();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const stockStatus = (product) => {
    if (product.quantity > 0) {
      return <span className="--color-success"> In Stock</span>;
    } else {
      return <span className="--color-danger"> Not Available</span>;
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProduct(id));
    }
    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch, id]);

  return (
    <div className="product-detail">
      <h3 className="--mt">Product Detail: {product?.name}</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {product && (
          <div className="detail">
            <Card cardClass="group">
              {product?.image ? (
                <img
                  src={product.image.filePath}
                  alt={product.image.fileName}
                />
              ) : (
                <p>No Image set for this product</p>
              )}{" "}
            </Card>
            <h4>Product Availability: {stockStatus(product)}</h4>
            <hr />
            <h4>
              <span className="badge">Name:</span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; SKU: </b> {product.sku}
            </p>
            <p>
              <b>&rarr; Category: </b> {product.category}
            </p>
            <p>
              <b>&rarr; Price: </b> {formatter.format(product.price)}
            </p>
            <p>
              <b>&rarr; Quantity in Stock: </b> {product.quantity}
            </p>
            <p>
              <b>&rarr; Total Value in Stock: </b>{" "}
              {formatter.format(product.quantity * product.price)}
            </p>
            <hr />
            <p>
              <b>&rarr; Description: </b>
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            ></div>
            <hr />
            <code className="--color-dark">
              Created on: {product.createdAt}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {product.updatedAt}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductDetail;

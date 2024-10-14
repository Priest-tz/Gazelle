import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/shop/productActions";

export const ProductProvider = ({ children }) => {
	const dispatch = useDispatch();
	const { status } = useSelector((state) => state.products);

	useEffect(() => {
		if (status === "idle") {
			dispatch(getAllProducts());
		}
	}, [status, dispatch]);

	return <>{children}</>;
};

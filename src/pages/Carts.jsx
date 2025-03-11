import React from "react";
//hooks
import useAxios from "../hooks/useAxios";

function Carts() {
  const { data, loading, error } = useAxios("https://fakestoreapi.com/carts");
  console.log(data);

  return <div>Carts</div>;
}

export default Carts;

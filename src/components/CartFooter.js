import React from "react";
import currentYear from "./currentYear";

const CartFooter = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        &copy; {currentYear}
      </a>
    </nav>
  );
};

export default CartFooter;

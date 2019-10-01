import React from "react";

const Loader = ({ isVisible, gif }) => {
  return <div>{isVisible && <img alt="loader" src={gif} />}</div>;
};

export default Loader;

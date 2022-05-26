import React, { useState } from "react";
import Login from "./Login"
import Signup from "./Signup";

const Auth = () => {
  const [index, setIndex] = useState(false);
  const toggleIndex = () => {
    setIndex((prevState) => !prevState);
  };
  return (
    <div className="container">
      {!index ? <Login /> : <Signup />}
      <p onClick={toggleIndex}>
        {!index ? "New user? Click here " : "Already have an account?"}
      </p>
    </div>
  );
};

export default Auth;
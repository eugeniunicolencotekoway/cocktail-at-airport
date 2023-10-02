import React from 'react';
import {useSelector} from "react-redux";
import {isLoggedIn} from "../../Store";
import {Navigate} from "react-router-dom";

const Home = () => {
  const authenticated = useSelector(isLoggedIn);

  if (!authenticated) {
    return <Navigate to="/login" />
  }

  return (
    <>
      Home
    </>
  )
}


export default Home;

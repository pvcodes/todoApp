import Form from "@/Components/Form";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function page() {
  return (
    <>
      <Form />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        theme="dark"
      />
    </>
  );
}

export default page;

"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FirebaseContext, firestore } from "@/config/Firebase";
import { useRouter } from "next/navigation";

const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
    status: yup.boolean().required().default(false),
  })
  .required();

const AddToList = () => {
  const router = useRouter();
  const { authchange, signout, fetch, craeteTodo, toggleStatus, deleteTodo } =
    useContext(FirebaseContext);
  const { user, logedin } = authchange();

  useEffect(() => {
    console.log(logedin);
    if (!logedin) {
      router.replace("/");
    }
  }, [logedin]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addtolist = (values) => {
    console.log({ userId: user.uid, ...values });
    craeteTodo({ userId: user.uid, ...values });
  };

  return (
    <div className="z-index-3 min-vh-25">
      <div className="d-flex justify-content-between px-3   py-2 shadow-sm">
        <h3 className="text-warning ">Todo App</h3>
        <button
          className="btn btn-primary"
          onClick={() => {
            signout();
          }}
        >
          Logout
        </button>
      </div>
      <div className=" d-flex justify-content-center text-white">
        <form
          onSubmit={handleSubmit(addtolist)}
          className="form d-flex flex-column w-25"
        >
          <input
            {...register("title")}
            className="form-control bg-transparent text-white a"
            placeholder="Title"
          />
          <p>{errors.title?.message}</p>

          <textarea
            {...register("description")}
            className="form-control bg-transparent text-white a"
            placeholder="Description"
          />
          <p>{errors.description?.message}</p>
          <button type="submit" className="btn btn-dark btn-outline-light">
            Add
          </button>
        </form>
      </div>
      <div className=" my-3 text-white opacity-50 d-flex justify-content-center align-items-center">
        Sticky Wall
      </div>
    </div>
  );
};

export default AddToList;

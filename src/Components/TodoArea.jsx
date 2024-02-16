"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Card from "./Card";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { FirebaseContext, firestore } from "@/config/Firebase";

const TodoArea = () => {
  const ref = useRef(null);

  const [todos, setTodos] = React.useState([]);
  const { authchange } = useContext(FirebaseContext);
  const { user, logedin } = authchange();

  const refreshData = () => {
    if (!user) {
      setTodos([]);
      return;
    }
    const q = query(
      collection(firestore, "todos"),
      where("user", "==", user.uid)
    );

    onSnapshot(q, (querySnapchot) => {
      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setTodos(ar);
    });
  };

  useEffect(() => {
    refreshData();
  }, [user]);
  return (
    <div>
      <div
        ref={ref}
        className="position-relative z-inxdex-3 min-vh-80 d-flex overflow-hidden p-3 gap-3 flex-row flex-wrap "
      >
        {todos &&
          todos?.map((item, key) => (
            <Card refernce={ref} key={key} data={item} />
          ))}
      </div>
    </div>
  );
};

export default TodoArea;

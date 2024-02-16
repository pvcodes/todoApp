"use client";
import React, { useContext, useRef, useState } from "react";
import { motion } from "framer-motion";
import { TiTickOutline } from "react-icons/ti";
import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { FirebaseContext } from "@/config/Firebase";
const Card = ({ refernce, data }) => {
	const { toggleStatus, deleteTodo, editTodo } = useContext(FirebaseContext);
	return (
		<motion.div
			drag
			dragConstraints={refernce}
			whileDrag={{ scale: 1.02 }}
			whileHover={{ scale: 1.01 }}
			dragElastic={0.1}
			className={"bg-dark text-white p-3 cardset"}
		>
			<div className="d-flex flex-column">
				<div className="d-flex justify-content-end gap-2">
					{data.status ? (
						<>
							{" "}
							<div className="badge bg-success">
								Completed
							</div>{" "}
						</>
					) : (
						<>
							<div className="badge bg-warning ">pending</div>{" "}
						</>
					)}
					<TiTickOutline
						size={"1em"}
						color="yellow"
						onClick={() => {
							toggleStatus({
								docId: data.id,
								status: !data.status,
							});
						}}
					/>
					<FaRegTrashAlt
						size={"1em"}
						color="red"
						// className="rounded-circle p-2 bg-dark"
						onClick={() => {
							deleteTodo(data.id);
						}}
					/>
					<CiEdit
						size={"1em"}
						color="red"
						// className="rounded-circle p-2 bg-dark"
						onClick={() => {
							const title = prompt("Edit todo name");
							const description = prompt(
								"Edit the descripition, else press enter"
							);
							if (description !== "") {
								editTodo(data.id, { title, description });
							} else {
								editTodo(data.id, { title });
							}
						}}
					/>
				</div>
				<div className={`${data.status ? "opacity-50 " : ""} `}>
					<p className="fs-6 ">{data.title}</p>
					<p className="overflow-auto">{data.description}</p>
				</div>
			</div>
		</motion.div>
	);
};

export default Card;

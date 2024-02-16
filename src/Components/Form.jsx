"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FirebaseContext } from "@/config/Firebase";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const schema = yup
	.object({
		email: yup.string().email().required(),
		password: yup.string().required().min(6),
	})
	.required();

const Form = () => {
	const [login, setlogin] = useState(true);
	const { signupUser, signinUser, authchange } = useContext(FirebaseContext);
	const { logedin } = authchange();
	const router = useRouter();
	useEffect(() => {
		console.log(logedin);
		if (logedin) {
			toast.success("Login Successful");
			router.push("/home", { scroll: false });
		}
	}, [logedin]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	return (
		<div>
			<div className=" container flex flex-row min-h-screen justify-center items-center h-100vh">
				<h2>Todo App</h2>
				<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
					{login ? (
						<div className="d-flex flex-column gap-3 justify-content-center align-items-center min-vh-100">
							<div className="d-flex justify-content-center align-items-center flex-column border-bottom ">
								{/* <button className=" btn btn-outline-light text-dark px-5 mb-4">
									{" "}
									<FaGoogle className="mx-4" />
									with Google
								</button> */}
							</div>
							<div className="d-flex justify-content-center align-items-center flex-column ">
								<div className=" d-flex justify-content-center text-dark">
									<form
										onSubmit={handleSubmit(signinUser)}
										className=" d-flex flex-column"
									>
										<label> Email Address</label>
										<input
											{...register("email")}
											className="form-control"
											placeholder="email"
										/>
										<p>{errors.email?.message}</p>
										<label>Password</label>
										<input
											{...register("password")}
											className="form-control"
											placeholder="Password"
										/>
										<p>{errors.password?.message}</p>

										<button
											type="submit"
											className="btn btn-primary "
										>
											Login Now
										</button>
									</form>
								</div>
							</div>
							<div className="">
								<button
									onClick={() => setlogin(!login)}
									className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
								>
									{" "}
									Don&apos;t have a account ?{" "}
								</button>
							</div>
						</div>
					) : (
						<div className=" max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <h5 className="m-1 w-100 text-center">Signup here</h5>
							<form
								onSubmit={handleSubmit(signupUser)}
								className="form d-flex flex-column "
							>
								<input
									{...register("email")}
									className="form-control"
									placeholder="Email"
								/>
								<p>{errors.email?.message}</p>

								<input
									{...register("password")}
									className="form-control"
									placeholder="Password"
								/>
								<p>{errors.password?.message}</p>

								<input
									type="submit"
									className="btn btn-outline-warning  w-25"
								/>
							</form>

							<button
								onClick={() => setlogin(!login)}
								className="btn "
							>

							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Form;

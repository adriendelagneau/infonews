"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify"; // Import react-toastify


const Login = () => {

  const {data: session, status, update} = useSession()
const tpsBool = false
  
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter()

  const submit = async (data) => {
    const { email, password } = data;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        console.log(res.error);

        // Display an error toast with the error message
        toast.error(res.error); // Display an error toast with the error message
        return;
      }

      // Login was successful
      toast.success("Login successful!"); // Display a success toast
      router.push("/");
    } catch (error) {
      console.error(error);

      // Display a generic error toast for unexpected errors
      toast.error("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div className="pt-[300px] w-[300px] min-h-screen flex flex-col items-center mx-auto">
      <h1 className="pb-8 text-5xl">Login</h1>
      <div className="p-4 border shadow-xl">
        
      <form className="w-[300px] mx-auto h-auto" onSubmit={handleSubmit(submit)}>

        <div className="relative mt-6">
          <input
            type="email"
            className="relative z-10 w-full p-2 bg-transparent border-2 rounded-lg outline-none peer focus:border-blue-900 placeholder:text-transparent"
            id="email"
            placeholder="email"
            name='email'
            {...register("email", {
              required: "Email is required",
              minLength: {
                value: 8,
                message: "Min length is 8"
              },
              maxLength: {
                value: 32,
                message: "Max length is 32"
              }
            })}
            />
          <label htmlFor="email" className="absolute z-20 px-1 text-sm text-gray-600 transition-all bg-white left-2 peer-placeholder-shown:top-3 peer-focus:-top-2 -top-2 peer-focus:text-blue-800 peer-placeholder-shown:-z-10 peer-focus:z-20 peer-placeholder-shown:text-base peer-focus:text-sm">Email</label>
          <p className='w-full h-5 pt-1 text-red-800'>{errors.email?.message}</p>
        </div>

        <div className="relative mt-6">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            className="relative z-10 w-full p-2 pr-8 bg-transparent border-2 rounded-lg outline-none peer focus:border-blue-900 placeholder:text-transparent"
            id="password"
            placeholder="password"
            name='password'
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Min length is 8"
              },
              maxLength: {
                value: 32,
                message: "Max length is 32"
              }
            })}
            />
          <label htmlFor="password" className="absolute z-20 px-1 text-sm text-gray-600 transition-all bg-white left-2 peer-placeholder-shown:top-3 peer-focus:-top-2 -top-2 peer-focus:text-blue-800 peer-placeholder-shown:-z-10 peer-focus:z-20 peer-placeholder-shown:text-base peer-focus:text-sm">Password</label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="absolute w-4 h-4 top-3.5 right-3 hover:cursor-pointer z-10"
            onMouseDown={(e) => {
              e.preventDefault()
              setIsPasswordVisible(prevState => !prevState);
            }}
            >
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="w-full h-5 pt-1 text-red-800 ">{errors.password?.message}</p>
        </div>

        <button className="w-full mt-10 text-xl rounded-md">Login</button>

      </form>

      <div className="my-6 text-center">- OR -</div>

      <div className="w-full">
        <button onClick={() => { signIn("google") }} className="flex items-center justify-center w-full gap-5 text-lg rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32px" height="32px"><path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" /></svg>
          <span>
            Login with Google
          </span>
        </button>
      </div>
      </div>

      <Link className="mt-9 hover:text-blue-900 text-md" href="/register">No account yet, REGISTER</Link>


      {/*
        session?.user.name && (
          <div onClick={() => update({name: "patrick"})} className="cursor-pointer">
          click 
          </div>
          )
        */}
      
      
    </div>
  )
}


export default Login;

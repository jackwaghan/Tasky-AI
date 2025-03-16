import React from "react";
import Form from "./Form";
import Link from "next/link";

const Page = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="text-4xl font-bold">Sign Up</div>
      <div className="text-gray-500 mt-5">Create an account to get started</div>
      <div className="mt-10" />

      <Form />
      <div className="text-center mt-5">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;

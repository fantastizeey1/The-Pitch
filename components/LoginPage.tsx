import { handleGithubSignIn, handleGoogleSignIn } from "@/lib/actions";
import { signIn } from "next-auth/react";
import { FaSquareGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
const LoginPage = () => {
  return (
    <div className="login-container w-[40%] rounded-xl">
      <h1 className="login-title">Welcome Back!</h1>
      <p className="login-subtitle">Please log in to continue</p>
      <div className="button-container">
        {/* GitHub Login Button */}
        <form action={handleGithubSignIn} className="bg-slate-500 rounded-lg ">
          <button
            type="submit"
            className="flex justify-center items-center gap-2 p-4"
          >
            Login with <FaSquareGithub />
          </button>
        </form>

        {/* Google Login Button */}

        <form
          action={handleGoogleSignIn}
          className="bg-slate-500 rounded-lg  mt-4"
        >
          <button
            type="submit"
            className="flex justify-center items-center gap-2 p-4"
          >
            Login with <FcGoogle />
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthProvider";
import { loginFormValidationSchema } from "../schema/LoginFormValidation";
import { userLoginApi } from "../services/AuthApi";
import { jwtTokenDecoder } from "../uitls/tokenDecoder";

const Login = () => {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginFormValidationSchema) });
  const onSubmit = async (data) => {
    const id = toast.loading("Logging in...", {
      position: "top-center",
    });
    try {
      const response = await userLoginApi(data);
      const token = response?.data?.data?.token;
      const decodedToken = jwtTokenDecoder(token);
      //call functin from authContext for save token to local storage and context
      login(token, decodedToken);
      // Redirect to original destination
      navigate(from, { replace: true });
     reset({email: "", password:""})
      toast.success(response?.data?.message, {
        id,
        position: "top-center",
        style: { color: "green" },
      });
    } catch (error) {
      console.log("Login failed:", error?.response?.data?.message);
      toast.error(error?.response?.data?.message, {
        id,
        position: "top-center",
        style: { color: "red" },
      });
    }
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
              <div>
                <p className="text-center">
                  Are you not register yet! <Link to={"/register"}>Signup</Link>
                </p>
              </div>
              <button type="submit" className="btn btn-neutral mt-4">
                Login
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

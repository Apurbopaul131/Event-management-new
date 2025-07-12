import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { registerFormValidationSchema } from "../schema/RegisterValidation";
import { userRegistrationApi } from "../services/AuthApi";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerFormValidationSchema) });
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const toastId = toast.loading("Registering...", { position: "top-center" });
    try {
      const res = await userRegistrationApi(data);
      navigate("/login");
      toast.success(res?.data?.message, {
        id: toastId,
        position: "top-center",
        style: { color: "green" },
      });
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        id: toastId,
        position: "top-center",
        style: { color: "red" },
      });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 w-full shrink-0 max-w-sm shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Name:</legend>
            <input
              type="text"
              className="input"
              placeholder="Type your name..."
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email:</legend>
            <input
              type="email"
              className="input"
              placeholder="Type your email..."
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password:</legend>
            <input
              type="password"
              className="input"
              placeholder="Type your password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">PhotoUrl:</legend>
            <input
              type="url"
              className="input"
              placeholder="Type your photoUrl.."
              {...register("photoUrl", { required: true })}
            />
            {errors.photoUrl && (
              <P className="text-red-500 text-sm">
                {errors?.photoUrl?.message}
              </P>
            )}
          </fieldset>
          <button type="submit" className="btn btn-neutral mt-4">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useAuth } from "../contexts/AuthProvider";
import { createEventApi } from "../services/EventApi";

const AddEvents = () => {
  const EventValidationSchema = z.object({
    title: z.string().min(1, "Title is required"),
    dateandTime: z.coerce
      .date()
      .refine((date) => date.getTime() > Date.now(), {
        message: "Date and time must be in future",
      }),
    location: z.string().min(1, "Location is required"),
    description: z.string().min(1, "Description is required"),
  });
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(EventValidationSchema) });
  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating event...", {
      position: "top-center",
    });
    // Here you would typically send the data to your backend API
    try {
      const response = await createEventApi(data, token);
      toast.success(response?.data?.message, {
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
            <legend className="fieldset-legend">Title:</legend>
            <input
              type="text"
              className="input"
              placeholder="Type event title..."
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Date and Time:</legend>
            <input
              type="datetime-local"
              className="input"
              placeholder="Type date and Time..."
              {...register("dateandTime")}
            />
            {errors?.dateandTime && (
              <p className="text-red-500 text-sm">
                {errors.dateandTime.message}
              </p>
            )}
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Location:</legend>
            <input
              type="text"
              className="input"
              placeholder="Type event location..."
              {...register("location")}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Description:</legend>
            <textarea
              {...register("description")}
              className="textarea"
              placeholder="Type event description..."
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </fieldset>
          <button type="submit" className="btn btn-neutral mt-4">
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvents;

import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "sonner";
import { deleteUserEvent } from "../services/EventApi";

const MyEvents = () => {
  const myEvents = useLoaderData();
  const [Events, setEvents] = useState(myEvents?.data || []);
  const handleEventDelete = async (eventId) => {
    const toastId = toast.loading("Deleting event...", {
      position: "top-center",
    });
    // Call the API to delete the event
    try {
      const response = await deleteUserEvent(eventId);
        if (response.status === 200) {
          setEvents((prevEvents) => prevEvents.filter(event => event._id !== eventId));
          toast.success("Event deleted successfully", {
            id: toastId,
            position: "top-center",
            style: { color: "green" },
          });
        }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete event", {
        id: toastId,
        position: "top-center",
        style: { color: "red" },
      });
    }
  };
  return (
    <div className="mt-8">
      {Events?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Events?.map((event) => (
            <div key={event._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{event.title}</h2>
                <p>{event.description}</p>
                <p>
                  <strong>Date and Time:</strong>{" "}
                  {new Date(event.dateandTime).toLocaleString()}
                </p>
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
                <div className="flex justify-between">
                  <button className="btn btn-primary">Upadate</button>
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_1").showModal()
                    }
                    className="btn btn-secondary"
                  >
                    Delete
                  </button>
                </div>
                {/* Modal for confirmation */}
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <p>Are you want to sure delete the Event!</p>
                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button
                          onClick={() => handleEventDelete(event?._id)}
                          className="btn btn-secondary"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold">No Events Found</h2>
          <p className="text-gray-500">You have not created any events yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyEvents;

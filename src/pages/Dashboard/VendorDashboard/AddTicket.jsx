import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import imageUpload from "../../../utlis/imageUpload";
import { addTicket } from "../../../api/ticketsApi";
import { useNavigate } from "react-router";

const AddTicket = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (!user) return null;

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const image = data.image[0];
      const imageURL = await imageUpload(image);

      if (!imageURL) {
        throw new Error("Image upload failed");
      }

      const ticketInfo = {
        title: data.title,
        from: data.from,
        to: data.to,
        transport: data.transport,
        price: Number(data.price),
        quantity: Number(data.quantity),
        departure: data.departure,
        perks: data.perks || [],
        image: imageURL,
        vendorName: user.displayName,
        vendorEmail: user.email,
        verificationStatus: "pending",
        status: "published",
        sold: 0,
        createdAt: new Date().toISOString(),
      };

      const result = await addTicket(ticketInfo);

      if (result.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Ticket Added Successfully",
          text: "Waiting for Admin Approval",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/dashboard/my-added-tickets");
        reset();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Add New Ticket
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Ticket Title */}
        <div>
          <input
            className="input input-bordered w-full"
            placeholder="Ticket Title"
            {...register("title", {
              required: "Ticket title is required",
            })}
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.title?.message}
          </p>
        </div>

        {/* From */}
        <div>
          <input
            className="input input-bordered w-full"
            placeholder="From"
            {...register("from", {
              required: "From location is required",
            })}
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.from?.message}
          </p>
        </div>

        {/* To */}
        <div>
          <input
            className="input input-bordered w-full"
            placeholder="To"
            {...register("to", {
              required: "Destination is required",
            })}
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.to?.message}
          </p>
        </div>

        {/* Transport */}
        <div>
          <select
            className="select select-bordered w-full"
            {...register("transport", {
              required: "Select transport",
            })}
          >
            <option value="">Select Transport</option>
            <option value="Bus">Bus</option>
            <option value="Train">Train</option>
            <option value="Launch">Launch</option>
            <option value="Plane">Plane</option>
          </select>
          <p className="text-red-500 text-sm mt-1">
            {errors.transport?.message}
          </p>
        </div>

        {/* Price */}
        <div>
          <input
            type="number"
            className="input input-bordered w-full"
            placeholder="Price"
            {...register("price", {
              required: "Price is required",
              min: {
                value: 1,
                message: "Price must be greater than 0",
              },
            })}
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.price?.message}
          </p>
        </div>

        {/* Quantity */}
        <div>
          <input
            type="number"
            className="input input-bordered w-full"
            placeholder="Quantity"
            {...register("quantity", {
              required: "Quantity is required",
              min: {
                value: 1,
                message: "Quantity must be at least 1",
              },
            })}
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.quantity?.message}
          </p>
        </div>

        {/* Departure */}
        <div>
          <input
            type="datetime-local"
            className="input input-bordered w-full"
            {...register("departure", {
              required: "Departure time is required",
            })}
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.departure?.message}
          </p>
        </div>

        {/* Image */}
        <div>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            {...register("image", {
              required: "Ticket image is required",
            })}
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.image?.message}
          </p>
        </div>

        {/* Vendor Name */}
        <input
          value={user?.displayName || ""}
          readOnly
          className="input input-bordered"
        />

        {/* Vendor Email */}
        <input
          value={user?.email || ""}
          readOnly
          className="input input-bordered"
        />

        {/* Perks */}
        <div className="md:col-span-2">
          <label className="font-semibold mb-2 block">
            Ticket Perks
          </label>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {["AC", "WiFi", "Breakfast", "Charging Point"].map((perk) => (
              <label
                key={perk}
                className="label cursor-pointer justify-start gap-2"
              >
                <input
                  type="checkbox"
                  value={perk}
                  {...register("perks")}
                  className="checkbox checkbox-primary"
                />
                <span>{perk}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary md:col-span-2"
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Adding Ticket...
            </>
          ) : (
            "Add Ticket"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddTicket;
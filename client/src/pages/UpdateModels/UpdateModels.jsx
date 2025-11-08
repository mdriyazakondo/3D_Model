import React from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateModels = () => {
  const models = useLoaderData();
  const model = models.data;
  // const location = useLocation();

  // const model = location?.state?.model;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const category = e.target.category.value;
    const description = e.target.description.value;
    const thumbnail = e.target.thumbnail.value;
    const updateNewData = { name, category, description, thumbnail };
    fetch(`http://localhost:3000/models/${model._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateNewData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount) {
          Swal.fire({
            title: "Success!",
            text: "Model updated successfully 🎉",
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "No Changes!",
            text: result.message || "No data was updated.",
            icon: "info",
            confirmButtonColor: "#3085d6",
          });
        }
        navigate(`/model-details/${model._id}`);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
      <div className="card-body p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6">Update Model</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="label font-medium">Name</label>
            <input
              type="text"
              defaultValue={model?.name}
              name="name"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter name"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="label font-medium">Category</label>
            <select
              defaultValue={model?.category}
              name="category"
              required
              className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Vehicles">Vehicles</option>
              <option value="Plants">Plants</option>
              <option value="Foods">Foods</option>
              <option value="Home & Living">Home & Living</option>
              <option value="Characters">Characters</option>
              <option value="Space">Space</option>
              <option value="Animals">Animals</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Description Textarea */}
          <div>
            <label className="label font-medium">Description</label>
            <textarea
              defaultValue={model?.description}
              name="description"
              required
              rows="3"
              className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[250px]"
              placeholder="Enter description"
            ></textarea>
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="label font-medium">Thumbnail URL</label>
            <input
              type="url"
              name="thumbnail"
              defaultValue={model?.thumbnail}
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full text-white mt-6 rounded-full bg-linear-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700"
          >
            Update Model
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModels;

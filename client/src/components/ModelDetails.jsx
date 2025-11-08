import React, { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { FaEdit } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { AuthContext } from "../context/ContextProvider";
import Loading from "../pages/Loading/Loading";

const ModelDetails = () => {
  const { id } = useParams();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refecth, setRefecth] = useState(false);
  const navigate = useNavigate();
  const { user } = use(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:3000/models/${id}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch model details");
        return res.json();
      })
      .then((data) => {
        setModel(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [user, id, refecth]);

  // const handleClick = () => {
  //   navigate(`/update-models/${_id}`, { state: { model } });
  // };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/models/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire("Deleted!", "Model has been deleted.", "success");
            navigate("/all-models");
          });
      }
    });
  };

  const handleDownload = (model) => {
    const finarModel = {
      name: model.name,
      downloads: model.downloads,
      thumbnail: model.thumbnail,
      category: model.category,
      description: model.description,
      created_by: model.created_by,
      created_at: new Date(),
      downloaded_by: user.email,
    };
    fetch(`http://localhost:3000/downloads/${model._id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(finarModel),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.downloadCount.acknowledged) {
          return Swal.fire("Deleted!", "Model has been deleted.", "success");
        }
        setRefecth(!refecth);
      });
  };

  if (loading) return <Loading />;

  if (error)
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        {error}
      </div>
    );

  if (!model)
    return (
      <div className="text-center text-gray-500 font-semibold mt-10">
        No model found.
      </div>
    );

  const { name, thumbnail, category, description, created_by, _id, downloads } =
    model;

  // console.log(model);
  return (
    <div className="max-w-6xl mx-auto p-6 mt-8">
      <div className="bg-white flex flex-col lg:flex-row gap-8 shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 h-80 lg:h-auto overflow-hidden">
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Info Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 space-y-4">
          <h2 className="text-3xl font-extrabold text-gray-800">{name}</h2>

          <div className="flex items-center  gap-6">
            <p className="inline-block text-sm font-semibold text-pink-600 border border-pink-500 rounded-full px-4 py-1 uppercase tracking-wide w-[150px] text-center">
              {category}
            </p>
            <p className="inline-block text-sm font-semibold text-pink-600 border border-pink-500 rounded-full px-4 py-1 uppercase tracking-wide w-[150px] text-center">
              Download ({downloads})
            </p>
          </div>

          <p className="text-gray-600 leading-relaxed">{description}</p>

          <p className="text-sm text-gray-400">
            <span className="font-medium text-gray-500">Created by:</span>{" "}
            {created_by || "Unknown"}
          </p>

          <div className="flex items-center gap-4 pt-6">
            <Link
              to={`/update-models/${_id}`}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-2.5 px-6 rounded-full shadow-md hover:opacity-90 transition-all cursor-pointer flex items-center gap-1"
            >
              <FaEdit className="w-5 h-5" /> Update Model
            </Link>
            {/* <button
              onClick={handleClick}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-2.5 px-6 rounded-full shadow-md hover:opacity-90 transition-all cursor-pointer flex items-center gap-1"
            >
              <FaEdit className="w-5 h-5" /> Update Model
            </button> */}
            <button
              onClick={() => handleDownload(model)}
              className="btn bg-pink-600 text-white rounded-full flex items-center gap-1"
            >
              <FaDownload /> Download
            </button>

            <button
              onClick={() => handleDelete(_id)}
              className="bg-gray-200 text-gray-700 font-semibold py-2.5 px-6 rounded-full shadow-md hover:bg-gray-300 transition-all  cursor-pointer flex items-center gap-1"
            >
              <MdDelete className="w-5 h-5" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetails;

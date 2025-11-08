import React from "react";
import { useLoaderData } from "react-router";
import { ModelCard } from "../../components/ModelCard";
import { useState } from "react";
import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Loading from "../Loading/Loading";

const AllModels = () => {
  const allModles = useLoaderData();
  const [searchModels, setSerchModles] = useState(allModles);
  const [loading, setLoading] = useState(false);

  const handleOnsubmit = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    setLoading(true);
    fetch(`https://3d-model-server-eight.vercel.app/search?search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setSerchModles(data), setLoading(false);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-4 max-w-[1500px] mx-auto px-4 lg:px-0">
      <div className="text-2xl text-center font-bold "> All Models</div>
      <p className=" text-center ">Explore 3d models.</p>
      <form
        onSubmit={handleOnsubmit}
        className="flex items-center gap-2 relative justify-center w-full md:w-1/2 lg:w-1/3"
      >
        <FaSearch className="absolute left-5 top-1/2 -translate-1/2 w-5 h-5 text-gray-500" />
        <input
          type="search"
          name="search"
          placeholder="Search....."
          className="py-2 px-9 rounded-full border border-pink-600 outline-none w-full "
        />
        <button
          type="submit"
          className="btn btn-secondary rounded-r-full absolute right-0"
        >
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {searchModels?.map((model) => (
          <ModelCard key={model._id} model={model} />
        ))}
      </div>
    </div>
  );
};

export default AllModels;

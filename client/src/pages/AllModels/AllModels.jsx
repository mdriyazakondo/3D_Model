import React from "react";
import { useLoaderData } from "react-router";
import { ModelCard } from "../../components/ModelCard";

const AllModels = () => {
  const allModles = useLoaderData();

  return (
    <div className="mt-4 max-w-[1500px] mx-auto ">
      <div className="text-2xl text-center font-bold "> All Models</div>
      <p className=" text-center ">Explore 3d models.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {allModles.map((model) => (
          <ModelCard key={model._id} model={model} />
        ))}
      </div>
    </div>
  );
};

export default AllModels;

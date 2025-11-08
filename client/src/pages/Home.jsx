import { useLoaderData } from "react-router";
import { ModelCard } from "../components/ModelCard";
import Banner from "../components/Banner";

const Home = () => {
  const data = useLoaderData();

  return (
    <div className="max-w-[1500px] mx-auto">
      <Banner />

      <p className="text-center text-2xl font-bold  mb-12">Latest Model</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
        {data.map((model) => (
          <ModelCard key={model._id} model={model} />
        ))}
      </div>
    </div>
  );
};

export default Home;

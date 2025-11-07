import { useLoaderData } from "react-router";
import { ModelCard } from "../components/ModelCard";
import Banner from "../components/Banner";

const Home = () => {
  const data = useLoaderData();

  return (
    <div className="max-w-[1500px] mx-auto">
      <Banner />

      <div className="text-center text-xl font-bold mt-10">Latest Model</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-16">
        {data.map((model) => (
          <ModelCard key={model._id} model={model} />
        ))}
      </div>
    </div>
  );
};

export default Home;

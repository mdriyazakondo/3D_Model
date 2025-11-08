import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ModelCard } from "../../components/ModelCard";
import { use } from "react";
import { AuthContext } from "../../context/ContextProvider";
import Loading from "../Loading/Loading";

const MyDownloads = () => {
  const [models, setModles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = use(AuthContext);
  useEffect(() => {
    fetch(`http://localhost:3000/downloads?email=${user.email}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setModles(data), setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-[1500px] mx-auto my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {models.map((model) => (
          <ModelCard key={model._id} model={model} />
        ))}
      </div>
    </div>
  );
};

export default MyDownloads;

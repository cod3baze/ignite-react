import React, { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useCan } from "../hooks/useCan";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user } = useAuthContext();

  const userCanSeeMetrics = useCan({
    roles: ["administrator"],
  });

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response))
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div>
      <h1>bem vindo, {user?.email}</h1>

      {userCanSeeMetrics && (
        <div>
          <h4>metrics: true</h4>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get("/me");
  console.log(response.data);

  return { props: {} };
});

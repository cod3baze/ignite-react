import React, { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { api } from "../services/api";

export default function Dashboard() {
  const { user } = useAuthContext();

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response))
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div>
      <h1>bem vindo, {user?.email}</h1>
    </div>
  );
}

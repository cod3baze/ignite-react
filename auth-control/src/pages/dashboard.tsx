import React from "react";
import { useAuthContext } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuthContext();

  return (
    <div>
      <h1>bem vindo, {user?.email}</h1>
    </div>
  );
}

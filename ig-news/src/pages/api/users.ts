import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: "elias" },
    { id: 2, name: "mayk" },
    { id: 2, name: "victor" },
  ];

  return response.json(users);
};

import { createContext, useEffect, useState } from "react";
import { api } from "./services/api";

type ITransaction = {
  id: string;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: string;
};

interface TransactionsContextProps {
  transactions: ITransaction[];
}

interface TransactionsProviderProps {
  children: React.ReactNode;
}

export const TransactionsContext = createContext(
  {} as TransactionsContextProps
);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    api
      .get("/transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};

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

type TransactionInput = Omit<ITransaction, "id" | "createdAt">;

interface TransactionsContextData {
  transactions: ITransaction[];
  createTransaction: (transactions: TransactionInput) => void;
}

interface TransactionsProviderProps {
  children: React.ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextData);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  async function createTransaction(transactions: TransactionInput) {
    await api.post("/transactions", transactions);
  }

  useEffect(() => {
    api
      .get("/transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

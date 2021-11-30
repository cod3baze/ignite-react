import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

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
  createTransaction: (transactions: TransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
  children: React.ReactNode;
}

const TransactionsContext = createContext({} as TransactionsContextData);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });

    const { transaction } = response.data;

    setTransactions((oldTransactions) => [transaction, ...oldTransactions]);
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

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}

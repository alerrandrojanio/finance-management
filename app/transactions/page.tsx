import { auth } from "@clerk/nextjs/server";
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import { redirect } from "next/navigation";
import { AddTransactionButton } from "../_components/add-transaction-button";
import { Navbar } from "../_components/navbar";

export default async function Transactions() {
  const { userId } = await auth();

  if (!userId) redirect("/login");

  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });

  return (
    <>
      <Navbar />

      <div className="space-y-6 p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>

        <DataTable columns={transactionColumns} data={transactions} />
      </div>
    </>
  );
}

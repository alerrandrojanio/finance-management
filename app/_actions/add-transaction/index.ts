"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  TransactionPaymentMethod,
  TransactionCard,
  TransactionCategory,
  TransactionType,
} from "@prisma/client";
import { AddTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface AddTransactionParams {
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
  paymentCard?: TransactionCard | null;
}

export async function AddTransaction(params: AddTransactionParams) {
  AddTransactionSchema.parse(params);

  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  await db.transaction.create({
    data: { ...params, userId },
  });

  revalidatePath("/transactions");
}

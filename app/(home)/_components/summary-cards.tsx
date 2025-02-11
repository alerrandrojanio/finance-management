import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import { SummaryCard } from "./summary-card";
import { db } from "@/app/_lib/prisma";
import { MONTH_OPTIONS, YEAR_OPTIONS } from "@/app/_contants/time";
import { redirect } from "next/navigation";

interface SummaryCardsProps {
  month?: string;
  year?: string;
}

export async function SummaryCards({
  month = new Date().toLocaleString("pt-BR", { month: "long" }),
  year = new Date().getFullYear().toString(),
}: SummaryCardsProps) {
  const selectedMonth = MONTH_OPTIONS.find(
    (item) => item.label.toLocaleLowerCase() === month,
  );

  const selectedYear = YEAR_OPTIONS.find((item) => item.label === year);

  if (selectedMonth == null || selectedYear == null)
    redirect(
      `?month=${new Date().toLocaleString("pt-BR", { month: "long" })}&year=${new Date().getFullYear().toString()}`,
    );

  const where = {
    date: {
      gte: new Date(`${year}-${selectedMonth?.value}-01`),
      lt: new Date(`${year}-${selectedMonth?.value}-31`),
    },
  };

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: "EXPENSE" },
        _sum: { amount: true },
      })
    )?._sum?.amount,
  );

  const balance = depositsTotal - investmentsTotal - expensesTotal;

  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
      />

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={investmentsTotal}
        />

        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={depositsTotal}
        />

        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesas"
          amount={expensesTotal}
        />
      </div>
    </div>
  );
}

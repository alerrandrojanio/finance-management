import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Navbar } from "../_components/navbar";
import { SummaryCards } from "./_components/summary-cards";
import { TimeSelect } from "./_components/time-select";
import { MONTH_OPTIONS, TimeType, YEAR_OPTIONS } from "../_contants/time";

interface HomeProps {
  searchParams: {
    month?: string;
    year?: string;
  };
}

export default async function Home({
  searchParams: { month, year },
}: HomeProps) {
  const { userId } = await auth();

  if (!userId) redirect("/login");

  return (
    <>
      <Navbar />

      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex gap-4">
            <TimeSelect placeholder={TimeType.MONTH} options={MONTH_OPTIONS} />
            <TimeSelect placeholder={TimeType.YEAR} options={YEAR_OPTIONS} />
          </div>
        </div>

        {await SummaryCards({ month, year })}
      </div>
    </>
  );
}

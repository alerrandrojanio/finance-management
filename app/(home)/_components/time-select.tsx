"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { TimeType, type TimeOptions } from "@/app/_contants/time";
import { useRouter } from "next/navigation";

interface TimeSelectProps {
  options: TimeOptions[];
  placeholder: string;
}

export function TimeSelect({ options, placeholder }: TimeSelectProps) {
  const router = useRouter();

  function handleMonthChange(value: string) {
    const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams(currentUrl.search);

    if (placeholder === TimeType.MONTH)
      params.set("month", value.toLocaleLowerCase());
    else params.set("year", value);

    router.push(`/?${params.toString()}`);
  }

  return (
    <Select onValueChange={(value) => handleMonthChange(value)}>
      <SelectTrigger className="w-[150px] rounded-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.label}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

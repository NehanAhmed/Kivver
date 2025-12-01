"use client"

import * as React from "react"
import { DateRange } from "react-day-picker"

import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DateRangeSelector() {
  const [open, setOpen] = React.useState(false)
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2025, 5, 12),
    to: new Date(2025, 6, 15),
  })

  const handleSelect = (range: DateRange | undefined) => {
    setDateRange(range)

    // Optional: close modal when both dates are selected
    if (range?.from && range?.to) {
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>Open Date Range Selector</button>
      </DialogTrigger>

      <DialogContent className="max-w-fit p-4">
        <DialogHeader>
          <DialogTitle>Select Date Range</DialogTitle>
        </DialogHeader>

        <Calendar
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={handleSelect}
          numberOfMonths={1}
          className="rounded-lg border shadow-sm"
        />
      </DialogContent>
    </Dialog>
  )
}

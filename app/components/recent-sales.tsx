"use client"

import * as React from "react"
import {
  ColumnDef
} from "@tanstack/react-table"

import { DataTable } from "@/components/ui/custom/data-table"

const data: Logs[] = [
  {
    user: "Alice",
    action: "vote",
    createdAt: "2024-03-02T11:50:19Z",
    updatedAt: "2024-03-02T12:30:45Z"
  },
  {
    user: "Bob",
    action: "comment",
    createdAt: "2024-03-02T13:15:00Z",
    updatedAt: "2024-03-02T13:20:30Z"
  },
  {
    user: "Carol",
    action: "view",
    createdAt: "2024-03-02T14:00:10Z",
    updatedAt: "2024-03-02T14:00:10Z"
  },
  {
    user: "Charlie",
    action: "Deleted item from cart",
    createdAt: "2024-03-06T10:00:00Z",
    updatedAt: "2024-03-06T10:00:00Z"
  },
  {
    user: "David",
    action: "Updated settings",
    createdAt: "2024-03-06T11:15:00Z",
    updatedAt: "2024-03-06T11:15:00Z"
  },
  {
    user: "Emily",
    action: "Performed a search",
    createdAt: "2024-03-06T12:30:00Z",
    updatedAt: "2024-03-06T12:30:00Z"
  },
  {
    user: "Frank",
    action: "Published a blog post",
    createdAt: "2024-03-06T13:45:00Z",
    updatedAt: "2024-03-06T13:45:00Z"
  },
  {
    user: "Grace",
    action: "Added item to wishlist",
    createdAt: "2024-03-06T14:00:00Z",
    updatedAt: "2024-03-06T14:00:00Z"
  },
  {
    user: "Henry",
    action: "Downloaded a file",
    createdAt: "2024-03-06T15:15:00Z",
    updatedAt: "2024-03-06T15:15:00Z"
  },
  {
    user: "Ivy",
    action: "Sent a message",
    createdAt: "2024-03-06T16:30:00Z",
    updatedAt: "2024-03-06T16:30:00Z"
  },
  {
    user: "Jack",
    action: "Opened a ticket",
    createdAt: "2024-03-06T17:45:00Z",
    updatedAt: "2024-03-06T17:45:00Z"
  }
]

export type Logs = {
  user: string
  action:string
  createdAt: string
  updatedAt: string

}

export const columns: ColumnDef<Logs>[] = [
  {
    accessorKey:"user",
    header:"User"
  },
  {
    accessorKey:"action",
    header:"Action"
  },
  {
    accessorKey:"createdAt",
    header:"Created At"
  },
  {
    accessorKey:"updatedAt",
    header:"Updated At"
  },
]

export function RecentActions() {
  return (
    <div className="w-full">
      <DataTable data={data} columns={columns} ></DataTable>
    </div>
  )
}

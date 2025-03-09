import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

const tasks = [
  {
    id: 1,
    title: "Fix bug #123",
    priority: "High",
    dueDate: "2025-03-15",
    status: "Pending",
  },
  {
    id: 2,
    title: "Implement Auth",
    priority: "Medium",
    dueDate: "2025-03-18",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Refactor UI",
    priority: "Low",
    dueDate: "2025-03-20",
    status: "Completed",
  },
  {
    id: 4,
    title: "Add new feature",
    priority: "High",
    dueDate: "2025-03-22",
    status: "Pending",
  },
  {
    id: 5,
    title: "Update dependencies",
    priority: "Medium",
    dueDate: "2025-03-25",
    status: "In Progress",
  },
  {
    id: 6,
    title: "Write tests",
    priority: "Low",
    dueDate: "2025-03-28",
    status: "Completed",
  },
  {
    id: 7,
    title: "Optimize performance",
    priority: "High",
    dueDate: "2025-03-30",
    status: "Pending",
  },
  {
    id: 8,
    title: "Fix bug #456",
    priority: "Medium",
    dueDate: "2025-04-02",
    status: "In Progress",
  },
  {
    id: 9,
    title: "Refactor code",
    priority: "Low",
    dueDate: "2025-04-05",
    status: "Completed",
  },
  {
    id: 10,
    title: "Add new feature",
    priority: "High",
    dueDate: "2025-04-08",
    status: "Pending",
  },
  {
    id: 11,
    title: "Update dependencies",
    priority: "Medium",
    dueDate: "2025-04-10",
    status: "In Progress",
  },
  {
    id: 12,
    title: "Write tests",
    priority: "Low",
    dueDate: "2025-04-12",
    status: "Completed",
  },
  {
    id: 13,
    title: "Optimize performance",
    priority: "High",
    dueDate: "2025-04-15",
    status: "Pending",
  },
  {
    id: 14,
    title: "Fix bug #789",
    priority: "Medium",
    dueDate: "2025-04-18",
    status: "In Progress",
  },
  {
    id: 15,
    title: "Refactor code",
    priority: "Low",
    dueDate: "2025-04-20",
    status: "Completed",
  },
  {
    id: 16,
    title: "Add new feature",
    priority: "High",
    dueDate: "2025-04-22",
    status: "Pending",
  },
  {
    id: 17,
    title: "Update dependencies",
    priority: "Medium",
    dueDate: "2025-04-25",
    status: "In Progress",
  },
  {
    id: 18,
    title: "Write tests",
    priority: "Low",
    dueDate: "2025-04-28",
    status: "Completed",
  },
  {
    id: 19,
    title: "Optimize performance",
    priority: "High",
    dueDate: "2025-04-30",
    status: "Pending",
  },
  {
    id: 20,
    title: "Fix bug #1011",
    priority: "Medium",
    dueDate: "2025-05-02",
    status: "In Progress",
  },
  {
    id: 21,
    title: "Refactor code",
    priority: "Low",
    dueDate: "2025-05-05",
    status: "Completed",
  },
  {
    id: 22,
    title: "Add new feature",
    priority: "High",
    dueDate: "2025-05-08",
    status: "Pending",
  },
  {
    id: 23,
    title: "Update dependencies",
    priority: "Medium",
    dueDate: "2025-05-10",
    status: "In Progress",
  },
  {
    id: 24,
    title: "Write tests",
    priority: "Low",
    dueDate: "2025-05-12",
    status: "Completed",
  },
  {
    id: 25,
    title: "Optimize performance",
    priority: "High",
    dueDate: "2025-05-15",
    status: "Pending",
  },
  {
    id: 26,
    title: "Fix bug #1213",
    priority: "Medium",
    dueDate: "2025-05-18",
    status: "In Progress",
  },
  {
    id: 27,
    title: "Refactor code",
    priority: "Low",
    dueDate: "2025-05-20",
    status: "Completed",
  },
  {
    id: 28,
    title: "Add new feature",
    priority: "High",
    dueDate: "2025-05-22",
    status: "Pending",
  },
  {
    id: 29,
    title: "Update dependencies",
    priority: "Medium",
    dueDate: "2025-05-25",
    status: "In Progress",
  },
  {
    id: 30,
    title: "Write tests",
    priority: "Low",
    dueDate: "2025-05-28",
    status: "Completed",
  },
];

const columns: ColumnDef<(typeof tasks)[number]>[] = [
  { accessorKey: "title", header: "Task" },
  { accessorKey: "priority", header: "Priority" },
  { accessorKey: "dueDate", header: "Due Date" },
  { accessorKey: "status", header: "Status" },
];

export default function TaskTable() {
  const [data] = useState(tasks);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="p-4">
      {/* <input
        type="text"
        placeholder="Search tasks..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="mb-4 px-4 py-2 border rounded-md focus:outline-none"
      /> */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-foreground/10 ">
          <thead className="bg-background">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={() => header.column.toggleSorting()}
                    className="px-4 py-2 border border-foreground/10 text-left cursor-pointer"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 border border-foreground/10"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 border border-foreground/30 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 border border-foreground/30 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

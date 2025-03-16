import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  RowSelectionState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { ChevronUp } from "lucide-react";
export default function TaskTable({
  tasks,
  globalFilter,
  setGlobalFilter,
}: {
  tasks: {
    id: number;
    title: string;
    priority: string;
    dueDate: string;
    status: string;
  }[];
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  const columns: ColumnDef<(typeof tasks)[number]>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    },
    { accessorKey: "title", header: "Task" },
    { accessorKey: "priority", header: "Priority" },
    { accessorKey: "dueDate", header: "Due Date" },
    { accessorKey: "status", header: "Status" },
  ];
  const [data, setData] = useState(tasks);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [editingCell, setEditingCell] = useState<{
    rowId: string;
    columnId: string;
  } | null>(null);
  const [editValue, setEditValue] = useState("");

  React.useEffect(() => {
    setData(tasks);
  }, [tasks]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination, rowSelection, globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      return String(row.getValue(columnId))
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    },
  });

  // Handle editing a cell
  const handleEdit = (rowId: string, columnId: string, value: string) => {
    setEditingCell({ rowId, columnId });
    setEditValue(value);
  };

  // Save the new value
  const handleSave = () => {
    if (!editingCell) return;
    const { rowId, columnId } = editingCell;
    setData((prevData) =>
      prevData.map((row) =>
        row.id === Number(rowId) ? { ...row, [columnId]: editValue } : row
      )
    );
    setEditingCell(null);
  };

  const deleteSelectedRows = () => {
    const selectedIds = new Set(
      table.getSelectedRowModel().rows.map((row) => row.original.id)
    );
    setData((prevData) => prevData.filter((row) => !selectedIds.has(row.id)));
    setRowSelection({});
  };

  return (
    <div className="p-4 overflow-y-auto ">
      <button
        onClick={deleteSelectedRows}
        disabled={table.getSelectedRowModel().rows.length === 0}
        className="space-x-2 mb-4 px-3 py-1 bg-red-500 text-white rounded disabled:bg-gray-400 disabled:opacity-0 cursor-pointer hover:scale-95 duration-300 "
      >
        <span>🗑</span>
        <span>Delete</span>
      </button>

      <table className="min-w-full border border-foreground/10 overflow-auto">
        <thead className="bg-foreground/10 select-none">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 border border-foreground/10 text-left cursor-pointer"
                  onClick={() => header.column.toggleSorting()}
                >
                  <div className="flex items-center justify-between">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getCanSort() && (
                      <ChevronUp
                        className={`p-0.5 hover:bg-foreground/10 rounded duration-300 ${
                          header.column.getIsSorted() === "desc"
                            ? "rotate-180"
                            : header.column.getIsSorted() === "asc"
                              ? "rotate-0"
                              : "opacity-0"
                        }`}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                const isEditing =
                  editingCell?.rowId === String(row.original.id) &&
                  editingCell.columnId === cell.column.id;
                return (
                  <td
                    key={cell.id}
                    className="px-4 py-2 border border-foreground/10 cursor-pointer"
                    onClick={() =>
                      cell.column.id === "title" &&
                      handleEdit(
                        String(row.original.id),
                        cell.column.id,
                        cell.getValue() as string
                      )
                    }
                  >
                    {isEditing ? (
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={(e) => e.key === "Enter" && handleSave()}
                        autoFocus
                        className="bg-foreground/10 rounded w-fit focus:outline-none p-1"
                      />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 border border-foreground/30 rounded disabled:opacity-50 cursor-pointer hover:bg-foreground/10 disabled:cursor-not-allowed"
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
          className="px-4 py-2 border border-foreground/30 rounded disabled:opacity-50 cursor-pointer hover:bg-foreground/10 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}

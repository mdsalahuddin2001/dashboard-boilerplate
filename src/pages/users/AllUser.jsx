import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { BiSortAlt2 } from "react-icons/bi";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../features/users/usersApi";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import ConfirmDelete from "../../components/ConfirmDelete";
import { useState } from "react";
import Pagination from "../../components/Pagination";
function AllUser() {
  // sorting state
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({ email: false });

  console.log(columnVisibility);
  // delete modal state
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [deleteLoaderId, setDeleteLoaderId] = useState(null);

  // get users query
  const { isSuccess, data, isLoading, isError } = useGetUsersQuery();
  // delete user mutation
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  // handle user delete

  // elements for react table
  const columnHelper = createColumnHelper();
  const defaultColumns = [
    columnHelper.accessor("name", {
      header: () => (
        <div className="inline-flex items-center space-x-1">
          <BiSortAlt2 />
          <span>Name</span>
        </div>
      ),
      cell: (info) => {
        return (
          <div className="flex items-center justify-start space-x-2">
            <img
              src="https://i.pravatar.cc/40"
              className="w-10 h-10 rounded-full"
              alt=""
            />
            <div className="flex flex-col">
              <span>{info.getValue()}</span>
              <span className="text-xs">{info.row.original.email}</span>
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor("email", {
      header: () => "Email",
      cell: (info) => info.getValue(),
    }),

    columnHelper.accessor("role", {
      header: () => (
        <div className="inline-flex items-center space-x-1">
          <BiSortAlt2 />
          <span>Role</span>
        </div>
      ),
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("isBanned", {
      enableSorting: false,
      header: () => "Status",
      cell: (info) =>
        info.getValue() ? (
          <span className="text-xs px-4 py-1 rounded-full bg-red-100  text-red-600">
            blocked
          </span>
        ) : (
          <span className="text-xs px-4 py-1 rounded-full bg-green-100 text-green-600">
            active
          </span>
        ),
    }),
    columnHelper.accessor("_id", {
      enableSorting: false,
      header: () => "Actions",
      cell: (info) => {
        return (
          <>
            <div className="flex items-center space-x-2">
              <span className="cursor-pointer text-lg text-gray-500">
                <BiEdit />
              </span>

              {deleteLoading && deleteLoaderId === info.row.original._id ? (
                <span className="animate-spin border-2 border-red-400 border-l-transparent rounded-full w-3 h-3 inline-block align-middle m-0 mr-1.5"></span>
              ) : (
                <span
                  className="cursor-pointer text-lg text-gray-500"
                  onClick={() => {
                    setDeleteLoaderId(info.row.original._id);
                    setConfirmDeleteModalOpen(true);
                  }}
                >
                  <MdDelete />
                </span>
              )}
            </div>
            <ConfirmDelete
              isOpen={confirmDeleteModalOpen}
              setIsOpen={setConfirmDeleteModalOpen}
              id={deleteLoaderId}
              deleteUser={deleteUser}
            />
          </>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: data?.data.users || [],
    columns: defaultColumns,
    state: { sorting, globalFilter, columnVisibility },
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableHiding: true,
  });

  if (isLoading) {
    return <h1 className="text-4xl">Loading...</h1>;
  }
  return (
    <>
      <div className="relative overflow-x-auto">
        <div className="relative max-w-[320px] mb-4">
          <input
            type="text"
            className="form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
          />
          <button
            type="button"
            className="absolute w-9 h-9 inset-0 ltr:right-auto rtl:left-auto appearance-none peer-focus:text-primary"
          >
            <svg
              className="mx-auto"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="11.5"
                cy="11.5"
                r="9.5"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity="0.5"
              />
              <path
                d="M18.5 18.5L22 22"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="hover:opacity-80 sm:hidden block absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2"
            onClick={() => setSearch(false)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                opacity="0.5"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <table className="whitespace-nowrap">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: (
                            <div className="inline-flex items-center text-gray-700 ml-1">
                              <TiArrowSortedDown className="inline-block" />
                            </div>
                          ),
                          desc: (
                            <div className="inline-flex items-center text-gray-700 ml-1">
                              <TiArrowSortedUp className="inline-block" />
                            </div>
                          ),
                        }[header.column.getIsSorted()] ?? null}
                      </div>
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
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          totalPage={table.getPageCount()}
          setPage={(page) => table.setPageIndex(page - 1)}
          currentPage={table.getState().pagination.pageIndex + 1}
          limit={table.getState().pagination.pageSize}
          setLimit={(limit) => table.setPageSize(limit ? Number(limit) : 10)}
        />
      </div>
    </>
  );
}

export default AllUser;

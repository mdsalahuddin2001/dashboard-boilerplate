import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
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
} from "@tanstack/react-table";
import ConfirmDelete from "../../components/ConfirmDelete";
import { useState } from "react";
import Pagination from "../../components/Pagination";
function AllUser() {
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
      header: () => "Name",
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
    // columnHelper.accessor("email", {
    //   header: () => "Email",
    //   cell: (info) => info.getValue(),
    // }),
    columnHelper.accessor("role", {
      header: () => "Role",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("isBanned", {
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
                  onClick={() => setConfirmDeleteModalOpen(true)}
                >
                  <MdDelete />
                </span>
              )}
            </div>
            <ConfirmDelete
              isOpen={confirmDeleteModalOpen}
              setIsOpen={setConfirmDeleteModalOpen}
              id={info.row.original._id}
              deleteUser={deleteUser}
              setDeleteLoaderId={setDeleteLoaderId}
            />
          </>
        );
      },
    }),
  ];

  const table = useReactTable({
    data: data?.data.users || [],
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) {
    return <h1 className="text-4xl">Loading...</h1>;
  }
  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="whitespace-nowrap">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
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

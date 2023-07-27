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
import Table from "../../components/BasicDataTable";
function AllUser() {
  // sorting state
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({ email: false });

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
      <Table data={data} columns={defaultColumns} />
    </>
  );
}

export default AllUser;

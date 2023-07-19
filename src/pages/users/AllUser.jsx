import { useEffect } from 'react';
import { useUsersQuery } from '../../features/users/userSlice';
import { createColumnHelper, getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table';

function AllUser() {
	const { isSuccess, data, isLoading, isError } = useUsersQuery();
	const columnHelper = createColumnHelper();
	const defaultColumns = [
		columnHelper.accessor('name', {
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('email', {
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('role', {
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('isBanned', {
			header: () => 'Active',
			cell: (info) => (info.getValue() ? 'in-active' : 'active'),
		}),
	];

	const table = useReactTable({
		data: data?.data.users || [],
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div>
			<table>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(header.column.columnDef.header, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
							))}
						</tr>
					))}
				</tbody>
				<tfoot>
					{table.getFooterGroups().map((footerGroup) => (
						<tr key={footerGroup.id}>
							{footerGroup.headers.map((header) => (
								<th key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(header.column.columnDef.footer, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</tfoot>
			</table>
		</div>
	);
}

export default AllUser;

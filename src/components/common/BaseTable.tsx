import {
  Checkbox,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

import { Cell, Column, useMountedLayoutEffect, usePagination, useRowSelect, useTable } from 'react-table';

interface IPaginationTable {
  pageIndex: number;
  pageSize: number;
  total: number;
}

interface BaseTableProps {
  data: Array<any>;
  columns: Array<Column>;
  pagination: IPaginationTable;
  rowsPerPageOptions?: Array<number>;
  onSelectRow?: (value: number[] | []) => void;
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (rows: number) => void;
  loading?: boolean;
}

export const BaseTable = ({
  columns,
  data,
  pagination,
  rowsPerPageOptions = [10, 15, 20],
  onSelectRow,
  onChangePage,
  onChangeRowsPerPage,
  loading = false,
}: BaseTableProps) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    selectedFlatRows,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: pagination.pageIndex - 1,
        pageSize: pagination.pageSize,
      },
      manualPagination: true,
      pageCount: pagination && pagination.total ? Math.ceil(pagination.total / pagination.pageSize) : -1,
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      {
        onSelectRow &&
          hooks.visibleColumns.push((columns) => [
            {
              id: 'selection',
              Header: ({ getToggleAllRowsSelectedProps }: any) => (
                <Checkbox
                  color='default'
                  inputProps={{ 'aria-label': 'select all desserts' }}
                  {...getToggleAllRowsSelectedProps()}
                />
              ),
              Cell: ({ row }: any) => <Checkbox {...row.getToggleRowSelectedProps()} />,
              width: '30',
            },
            ...columns,
          ]);
      }
    },
  );

  useMountedLayoutEffect(() => {
    const data = selectedFlatRows.map((row: any) => row.original.id);
    onSelectRow && data.length > 0 ? onSelectRow?.(data) : onSelectRow?.([]);
  }, [onSelectRow, selectedFlatRows.length]);

  useMountedLayoutEffect(() => {
    gotoPage(pagination.pageIndex - 1);
  }, [pagination.pageIndex]);

  const handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void = (_, newPage) => {
    onChangePage && onChangePage(newPage + 1);
  };

  const handleChangeRowsPerPage: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (event) => {
    setPageSize(Number(event.target.value));
    onChangePage && onChangePage(1);
    onChangeRowsPerPage && onChangeRowsPerPage(Number(event.target.value));
  };

  return (
    <>
      <Table {...getTableProps()} sx={{ minWidth: 650 }} aria-label='simple table' className='table-container'>
        <TableHead>
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderProps } = headerGroup.getHeaderGroupProps();
            return (
              <TableRow key={key} {...restHeaderProps}>
                {headerGroup.headers.map((column) => {
                  const { key, ...restColumnProps } = column.getHeaderProps();
                  return (
                    <TableCell
                      key={key}
                      className='table-head-cell'
                      padding='normal'
                      width={column.width}
                      {...restColumnProps}
                    >
                      {column.render('Header')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.length > 0 &&
            !loading &&
            page.map((row) => {
              prepareRow(row);
              const { key, ...restRowProps } = row.getRowProps();
              return (
                <TableRow key={key} className='table-row' {...restRowProps}>
                  {row.cells.map((cell: Cell<object, any>) => {
                    const { key, ...restCellProps } = cell.getCellProps();
                    return (
                      <TableCell key={key} {...restCellProps}>
                        {cell.render('Cell')}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          {loading && (
            <TableRow>
              <TableCell
                sx={{
                  textAlign: 'center',
                }}
                colSpan={onSelectRow ? columns.length + 1 : columns.length}
              >
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
          {page.length < 1 && !loading && (
            <TableRow>
              <TableCell
                sx={{
                  textAlign: 'center',
                }}
                colSpan={onSelectRow ? columns.length + 1 : columns.length}
              >
                データーがありません。
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        {pagination && (
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                count={pagination.total || 0}
                rowsPerPage={pageSize}
                page={pageIndex}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage='行数:'
                labelDisplayedRows={({ from, to, count }) => `${count}の${from}～${to}`}
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </>
  );
};

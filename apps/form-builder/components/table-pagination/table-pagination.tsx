import { Table } from '@tanstack/react-table';

import { cn, getVisiblePages } from '@repo/core-ui/lib/utils';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@repo/core-ui/components/pagination';

interface TablePaginationProps<T> {
  table: Table<T>;
}

const TABLE_DISABLED_PAGINATION_ITEM_CLASSNAME =
  'text-muted-foreground pointer-events-none cursor-default hover:bg-transparent';

/**
 * The navigation is handled by the table state, not actual URL routing.
 */
const TablePagination = <T,>({ table }: TablePaginationProps<T>) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => table.previousPage()}
            className={cn({
              [TABLE_DISABLED_PAGINATION_ITEM_CLASSNAME]:
                !table.getCanPreviousPage(),
            })}
          />
        </PaginationItem>
        {getVisiblePages(
          table.getState().pagination.pageIndex,
          table.getPageCount()
        ).map((pageItem, index) => (
          <PaginationItem key={index}>
            {pageItem === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={() => table.setPageIndex(pageItem)}
                isActive={pageItem === table.getState().pagination.pageIndex}
              >
                {pageItem + 1}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => table.nextPage()}
            className={cn({
              [TABLE_DISABLED_PAGINATION_ITEM_CLASSNAME]:
                !table.getCanNextPage(),
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;

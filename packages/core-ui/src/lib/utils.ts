import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getVisiblePages = (currentPage: number, totalPages: number) => {
  const maxVisible = 5;
  const pages: Array<number | 'ellipsis'> = [];

  if (totalPages <= maxVisible) {
    for (let index = 0; index < totalPages; index++) {
      pages.push(index);
    }
    return pages;
  }

  const sidePages = Math.floor((maxVisible - 1) / 2);
  let startPage = Math.max(0, currentPage - sidePages);
  let endPage = Math.min(totalPages - 1, currentPage + sidePages);

  if (endPage - startPage < maxVisible - 1) {
    if (startPage === 0) {
      endPage = Math.min(totalPages - 1, startPage + maxVisible - 1);
    } else if (endPage === totalPages - 1) {
      startPage = Math.max(0, endPage - maxVisible + 1);
    }
  }

  if (startPage > 0) {
    pages.push(0);
    if (startPage > 1) {
      pages.push('ellipsis');
    }
  }

  for (let index = startPage; index <= endPage; index++) {
    pages.push(index);
  }

  if (endPage < totalPages - 1) {
    if (endPage < totalPages - 2) {
      pages.push('ellipsis');
    }
    pages.push(totalPages - 1);
  }

  return pages;
};

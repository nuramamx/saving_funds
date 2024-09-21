import { ArrowLeft, ArrowRight, FastArrowLeft, FastArrowRight, InputField } from "iconoir-react";
import { useState } from "react";

type SFPaginationParams = {
  currentPage: number;
  totalPages: number;
  onChange: (currentPage: number) => void;
}

export default function SFPagination({ currentPage, totalPages, onChange}: SFPaginationParams) {
  const [page, setPage] = useState<number>(currentPage);

  const handlePreviousPage = () => {
    if ((page - 1) <= 1) setPage(1);
    else setPage(page - 1);

    if (onChange) onChange(page);
  };

  const handlePreviousFivePages = () => {
    if ((page - 5) <= 1) setPage(1);
    else setPage(page - 1);

    if (onChange) onChange(page);
  }

  const handleNextPage = () => {
    if ((page + 1) >= totalPages) setPage(totalPages);
    else setPage(page + 1);

    if (onChange) onChange(page);
  };

  const handleNextFivePages = () => {
    if ((page + 5) >= totalPages) setPage(totalPages);
    else setPage(page + 5);

    if (onChange) onChange(page);
  };

  return (
    <nav className="pagination" style={{ fontSize: '11px' }} role="navigation" aria-label="pagination">
      <button className="pagination-previous" disabled={currentPage === 1} onClick={handlePreviousFivePages}><FastArrowLeft /></button>
      <button className="pagination-previous" disabled={currentPage === 1} onClick={handlePreviousPage}><ArrowLeft /></button>
      <button className="pagination-next" disabled={totalPages <= 1} onClick={handleNextPage}><ArrowRight /></button>
      <button className="pagination-next" disabled={totalPages <= 1} onClick={handleNextFivePages}><FastArrowRight /></button>
      P&aacute;gina&nbsp;<strong>{page}</strong>&nbsp;de&nbsp;<strong>{totalPages}</strong>&nbsp;
      <ul className="pagination-list">
      </ul>
    </nav>
  )
}
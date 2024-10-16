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
    const currentPageAux = page - 1;

    if ((currentPageAux) <= 1) setPage(1);
    else setPage(currentPageAux);

    if (onChange) onChange(currentPageAux);
  };

  const handlePreviousFivePages = () => {
    let currentPageAux = page - 5;

    if ((currentPageAux) <= 1) {
      currentPageAux = 1;
      setPage(1);
    }
    else setPage(currentPageAux);

    if (onChange) onChange(currentPageAux);
  }

  const handleNextPage = () => {
    const currentPageAux = page + 1;

    if ((currentPageAux) >= totalPages) setPage(totalPages);
    else setPage(currentPageAux);

    if (onChange) onChange(currentPageAux);
  };

  const handleNextFivePages = () => {
    let currentPageAux = page + 5;

    if ((currentPageAux) >= totalPages) {
      currentPageAux = totalPages;
      setPage(totalPages);
    }
    else setPage(currentPageAux);

    if (onChange) onChange(currentPageAux);
  };

  return (
    <nav className="pagination" style={{ fontSize: '11px' }} role="navigation" aria-label="pagination" data-tg-tour="Paginador con el que podemos desplazarnos entre distintas páginas.">
      <button className="pagination-previous" disabled={page === 1} onClick={handlePreviousFivePages}><FastArrowLeft /></button>
      <button className="pagination-previous" disabled={page === 1} onClick={handlePreviousPage}><ArrowLeft /></button>
      <button className="pagination-next" disabled={page === totalPages} onClick={handleNextPage}><ArrowRight /></button>
      <button className="pagination-next" disabled={page === totalPages} onClick={handleNextFivePages}><FastArrowRight /></button>
      P&aacute;gina&nbsp;<strong>{page}</strong>&nbsp;de&nbsp;<strong>{totalPages}</strong>&nbsp;
      <ul className="pagination-list">
      </ul>
    </nav>
  )
}
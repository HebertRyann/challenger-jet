import React, { useEffect, useState, useMemo } from 'react'
import Pagination from 'react-bootstrap/Pagination'

interface TablePaginationProps {
  total: number
  itemsPerPage: number
  currentPage: number
  onPageChange(page: number): void
}

const PaginationComponent: React.FC<TablePaginationProps> = ({
  total = 0,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange
}) => {
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0) {
    { setTotalPages(Math.ceil(total / itemsPerPage))}
  }, [total, itemsPerPage])

  const paginationItems = useMemo(() => {
    const pages = []

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>
      )
    }

    return pages
  }, [totalPages, currentPage, onPageChange])

  if (totalPages === 0) return null

  return (
    <Pagination>
      {currentPage === 1
? (
        <Pagination.Prev disabled={true} />
      ) : (
        <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} />
          )}
      {paginationItems}
      {currentPage === totalPages
? (
        <Pagination.Next disabled={true} />
      ) : (
        <Pagination.Next onClick={() => onPageChange(currentPage + 1)} />
          )}
    </Pagination>
  )
}

export default PaginationComponent

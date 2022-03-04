import React from 'react'
import classnames from 'classnames'
import { usePagination, DOTS } from './usePagination'
import './pagination.css'

// if siblingcount is not given, this is default
const SIBLINGCOUNT = 1

const Pagination = (props) => {
    // destructure props
    const {
      className,
      currentPage,
      totalPageCount,
      onPageChange,
      siblingCount = SIBLINGCOUNT
    } = props

    const paginationRange = usePagination({
        totalPageCount, siblingCount, currentPage
    })

    // if there are less than 2 times in pagination range, no need to render component
    if (currentPage === 0 || paginationRange.length < 2)
      return null

    const onNext = () => onPageChange(currentPage + 1)
    const onPrevious = () => onPageChange(currentPage - 1)

    let lastPage = paginationRange[paginationRange.length -1]

    return (
      <ul className={classnames('pagination-container', { [className]: className })}>
        
        {/* left navigation arrow */}
        <li 
          className={classnames('pagination-item', { disabled: currentPage === 1 })}
          onClick={onPrevious}
        >
          <div className="arrow left"></div>
        </li>

        {/* range of page numbers displayed */}
        {paginationRange.map((pageNumber, idx) => {

          // if pageItem is a DOTS, render the dots unicode
          if (pageNumber === DOTS)
            return <li key={idx} className='pagination-item dots'>&#8230;</li>

          // render page pills
          return (
            <li
              key={idx}
              className={classnames('pagination-item', { selected: pageNumber === currentPage })}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          )
        })}

        {/* right navigation arrow */}
        <li
          className={classnames('pagination-item', { disabled: currentPage === lastPage })}
          onClick={onNext}
        >
          <div className="arrow right"></div>
        </li>

      </ul>
    )
}

export default Pagination

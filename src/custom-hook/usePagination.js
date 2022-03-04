import React, { useMemo } from 'react'

export const DOTS = '...'

// return an array from start to end
const range = (start, end) => {
    const length = end - start + 1

    // create array of length and set elements from start to end
    return Array.from({ length }, (_, idx) => idx + start)
}

export const usePagination = ({
    totalPageCount,
    siblingCount,
    currentPage
}) => {
    const paginationRange = useMemo(() => {
        // logic implementation 
        //const totalPageCount = Math.ceil(totalCount/pageSize)

        // pages count = siblingCount + 1st page + last page + currentPage + 2*dots
        const totalPageNumbers = siblingCount + 5

        // case1: # of pages is less than pages we want to show in component.
        // we return the range[1..totalPageCount]
        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount)
        }

        // calculate left & right sibling index and make sure they are within
        // range 1 and totalPageCount
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

        // No need to show dots when there is just one page between extremes of siblings and page limits
        const showLeftDots = leftSiblingIndex > 2
        const showRightDots = rightSiblingIndex < totalPageCount - 2

        const firstPageIndex = 1
        const lastPageIndex = totalPageCount

        // case 2: no left dots to show, right dots shown
        if (!showLeftDots && showRightDots) {
            const leftItemCount = 3 + 2 * siblingCount
            const leftRange = range(1, leftItemCount)

            return [...leftRange, DOTS, totalPageCount]
        }

        // case 3: no right dots to show, left dots shown
        if (showLeftDots && !showRightDots) {
            const rightItemCount = 3 + 2 * siblingCount
            const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)

            return [firstPageIndex, DOTS, ...rightRange]
        }

        // case 4: Both let& right dots to be shown
        if(showLeftDots && showRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex)
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
        }

    }, [totalPageCount, siblingCount, currentPage])

    return paginationRange
}

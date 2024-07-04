import React from 'react'
import PropTypes from 'prop-types'
import {
  useTable,
  usePagination,
  useSortBy
} from 'react-table'
import {Paper, Button} from '@mui/material'
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpward,
  ArrowDownward
} from '@mui/icons-material'
import {CircularProgress} from '@mui/material'

import 'stylesheets/components/table.scss'

const Table = ({status, ...props}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: {pageIndex, pageSize},
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage
  } = useTable(props, useSortBy, usePagination)

  const renderTH = ({className, render, isSorted, isSortedDesc, ...col}) => {
    const {key, ...rest} = col.getHeaderProps(col.getSortByToggleProps())
    return (
      <th
        className={className ? className : ''}
        key={key}
        {...rest}
      >
        {render('Header')}
        {isSorted ? (isSortedDesc ? <ArrowDownward />  : <ArrowUpward />) : ''}
      </th>
    )
  }

  const renderHeaderRow = (header) => {
    const {key, ...rest} = header.getHeaderGroupProps()
    return (
      <tr key={key} {...rest}>
        {header.headers.map(renderTH)}
      </tr>
    )
  }

  const renderCell = (cell) => {
    const {key, ...rest} = cell.getCellProps()
    return (
      <td className={cell.column.className} key={key} {...rest}>
        {cell.render('Cell')}
      </td>
    )
  }

  const renderRow = (row) => {
    prepareRow(row)
    const {key, ...rest} = row.getRowProps()
    return (
      <tr key={key} {...rest}>
        {row.cells.map(renderCell)}
      </tr>
    )
  }

  const renderPageControls = () => {
    const end = pageSize * (pageIndex + 1)
    const start = end - pageSize + 1
    const actualEnd = end > props.data.length ? props.data.length : end
    return (
      <div className='table--footer'>
        <span>{start}-{actualEnd} of {props.data.length}</span>
        <Button onClick={previousPage} disabled={!canPreviousPage}>
          <ChevronLeft />
        </Button>
        <Button onClick={nextPage} disabled={!canNextPage}>
          <ChevronRight />
        </Button>
      </div>
    )
  }


  return (
    <Paper elevation={2} className='table'>
      <div className='table-wrapper'>
        {status === 'loading' ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              height: '100%',
              width: '100%',
              backgroundColor: '#99bc6a09'
            }}
          >
            <CircularProgress color='primary' />
          </div>
        ) : (
          <table
            id={props.id}
            className='component-table'
            {...getTableProps()}
          >
            <thead>{headerGroups.map(renderHeaderRow)}</thead>
            <tbody {...getTableBodyProps()}>{page.map(renderRow)}</tbody>
          </table>
        )}
      </div>
      {renderPageControls()}
    </Paper>
  )
}

Table.propTypes = {
  id: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    Header: PropTypes.string,
    accessor: PropTypes.string
  })).isRequired,
  status: PropTypes.string,
  data: PropTypes.array.isRequired
}

export default Table

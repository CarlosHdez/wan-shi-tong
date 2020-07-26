import React from 'react'
import PropTypes from 'prop-types'
import {useTable} from 'react-table'

import 'stylesheets/components/table.scss'

const Table = (props) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows
  } = useTable(props)

  const renderTH = (col) => {
    return (
      <th {...col.getHeaderProps()}>
        {col.render('Header')}
      </th>
    )
  }

  const renderHeaderRow = (header) => {
    return (
      <tr {...header.getHeaderGroupProps()}>
        {header.headers.map(renderTH)}
      </tr>
    )
  }

  const renderCell = (cell) => {
    return (
      <td className={cell.column.className} {...cell.getCellProps()}>
        {cell.render('Cell')}
      </td>
    )
  }

  const renderRow = (row) => {
    prepareRow(row)
    return (
      <tr {...row.getRowProps()}>
        {row.cells.map(renderCell)}
      </tr>
    )
  }

  return (
    <div className='table-wrapper'>
      <table
        id={props.id}
        className='component-table'
        {...getTableProps()}
      >
        <thead>{headerGroups.map(renderHeaderRow)}</thead>
        <tbody {...getTableBodyProps()}>{rows.map(renderRow)}</tbody>
      </table>
    </div>
  )
}

Table.propTypes = {
  id: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    Header: PropTypes.string,
    accessor: PropTypes.string
  })).isRequired,
  data: PropTypes.array.isRequired
}

export default Table

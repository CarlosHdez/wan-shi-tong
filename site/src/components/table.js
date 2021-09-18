import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {
  useTable,
  usePagination,
  useSortBy
} from 'react-table'
import {Paper, Button} from '@material-ui/core'
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpward,
  ArrowDownward,
  Add
} from '@material-ui/icons'

import FilterRow from 'components/filter/filter_row'
import 'stylesheets/components/table.scss'

const Table = (props) => {
  const [data, setData] = useState(props.data)

  useEffect(() => {
    // TODO: Apply filters when data changes
    setData(props.data)
  }, [props.data])

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
  } = useTable({...props, data}, useSortBy, usePagination)

  const renderTH = ({className, render, isSorted, isSortedDesc, ...col}) => {
    return (
      <th
        className={className ? className : ''}
        {...col.getHeaderProps(col.getSortByToggleProps())}
      >
        {render('Header')}
        {isSorted ? (isSortedDesc ? <ArrowDownward />  : <ArrowUpward />) : ''}
      </th>
    )
  }

  const filterData = (filters) => {
    let newData = props.data
    filters.forEach(({column, value, type, ...rest}) => {
      newData = newData.filter((item) => {
        if (type === 'number' || type === 'percentage') {
          switch(rest.constraint) {
            case 'gt':
              return item[column] >= value
            case 'lt':
              return item[column] <= value
            case 'eq':
            default:
              return item[column] === value
          }
        }
        if (type === 'range') {
          const {min, max} = item[column]
          return min <= value &&  max >= value
        }
        let test = item[column]
        if (type === 'object') {
          test = Object.values(item[column]).join(' ')
        }
        const reg = new RegExp(value, 'i')
        return reg.test(test)
      })
    })
    setData(newData)
  }

  const renderFilterRow = () => {
    const {onAdd, filterable} = props
    return (
      <div className='table--filters'>
        {onAdd && <Button size='small' onClick={onAdd}><Add /></Button>}
        {filterable && <FilterRow tableFilters={props.columnFilters} applyFilters={filterData}/>}
      </div>
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

  const renderPageControls = () => {
    const end = pageSize * (pageIndex + 1)
    const start = end - pageSize + 1
    const actualEnd = end > data.length ? data.length : end
    return (
      <div className='table--footer'>
        <span>{start}-{actualEnd} of {data.length}</span>
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
      {(props.filterable || props.onAdd) && renderFilterRow()}
      <div className='table-wrapper'>
        <table
          id={props.id}
          className='component-table'
          {...getTableProps()}
        >
          <thead>{headerGroups.map(renderHeaderRow)}</thead>
          <tbody {...getTableBodyProps()}>{page.map(renderRow)}</tbody>
        </table>
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
  data: PropTypes.array.isRequired,
  columnFilters: PropTypes.array,
  onAdd: PropTypes.func,
  filterable: PropTypes.bool
}

Table.defaultTypes = {
  columnFilters: [],
  onAdd: null,
  filterable: false
}

export default Table

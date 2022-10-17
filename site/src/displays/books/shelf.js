import React, {useMemo, useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Add} from '@material-ui/icons'
import {Button} from '@material-ui/core'

import Table from 'components/table'
import FilterRow from 'components/filter/filter_row'
import StarRating from 'components/star_rating'
import DeleteIcon from 'components/delete_icon'
import {TableTagCell} from 'components/table/tag_cell'
import {deleteBook} from 'api/books'
import {BOOK_FILTERS} from 'lib/constants'
import {filterData} from 'lib/utils'
import {useStorage} from 'hooks/useStorage'

const BOOK_STORAGE_KEY = 'book-table-filters'
const BooksShelf = ({collection}) => {
  const {push} = useHistory()
  const [tableData, setTableData] = useState(collection.data)
  const {value, storage} = useStorage(BOOK_STORAGE_KEY)
  const [filters, setFilters] = useState(value || [])

  useEffect(() => {
    if (filters.length) {
      storage.setItem(BOOK_STORAGE_KEY, JSON.stringify(filters))
    } else {
      storage.removeItem(BOOK_STORAGE_KEY)
    }
  }, [filters, storage])

  useEffect(() => {
    setTableData(filterData(collection.data, filters))
  }, [filters, collection.data])

  const columns = useMemo(() => {
    const onDeleteClick = async (id) => {
      const {data} = await deleteBook(id)
      collection.dispatch({type: 'success', data})
    }

    return [
      {
        Header: 'Title',
        accessor: 'title',
        Cell: ({value, row}) => {
          return <Link to={`/books/${row.original.id}`}>{value}</Link>
        }
      },
      {
        Header: 'Author',
        accessor: 'author',
        Cell: ({value}) => <div>{value.surname}, {value.name}</div>,
        sortType: (rowA, rowB) => {
          return rowA.original.author.surname > rowB.original.author.surname ? -1 : 1
        }
      },
      {Header: 'Description', accessor: 'description', disableSortBy: true},
      {
        Header: 'Rating',
        accessor: 'rating',
        Cell: ({value}) => {
          return (
            <StarRating
              value={value}
              label=''
              className='book-rating'
              editable={false}
            />
          )
        }
      },
      {
        Header: 'Tags',
        accessor: 'tags',
        disableSortBy: true,
        className: 'cell__tags',
        Cell: ({value}) => (
          <>
            {value.map((val, i) => (
              <TableTagCell
                key={i}
                label={val}
                filters={filters}
                setFilters={setFilters}
              />
            ))}
          </>
        )
      },
      {
        Header: 'Link',
        accessor: 'goodreads_link',
        disableSortBy: true,
        Cell: ({value}) => (
          <a href={value} rel='noopener noreferrer' target='_blank'>Goodreads</a>
        )
      },
      {Header: 'Genre', accessor: 'genre'},
      {Header: 'Type', accessor: 'type'},
      {Header: 'Language', accessor: 'language'},
      {
        Header: 'ISBN',
        accessor: 'ISBN',
        disableSortBy: true,
        className: 'cell__number'
      },
      {
        Header: '',
        accessor: '',
        id: 'actions',
        className: 'cell__action',
        disableSortBy: true,
        Cell: ({row}) => (
          <DeleteIcon
            id={row.original.id}
            name={row.original.title}
            onDelete={onDeleteClick}
          />
        )
      },
      // {Header: 'DDC', accessor: 'code', className: 'cell__number'}
    ]
  }, [collection, filters])

  const filterRow = (
    <FilterRow
      filters={filters}
      setFilters={setFilters}
      filterOptions={BOOK_FILTERS}
    />
  )

  //TODO: Find a better way to render when loadind data or empty
  return (
    <>
      <div className='table--filters'>
        <Button size='small' onClick={() => push('/books/new')}><Add /></Button>
        {filterRow}
      </div>
      <Table
        id='books-table'
        columns={columns}
        data={tableData}
        initialState={{pageSize: 20, sortBy: [{id: 'title', desc: false}]}}
      />
    </>
  )
}

export default BooksShelf

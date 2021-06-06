import React, {useMemo} from 'react'
import {Button, IconButton} from '@material-ui/core'
import {Link, useHistory} from 'react-router-dom'

import Table from 'components/table'
import StarRating from 'components/star_rating'

const BooksShelf = ({collection}) => {
  const {push} = useHistory()

  const onDeleteClick = ({target}) => {
    const {id} = target.dataset
    console.log(id)
  }

  const columns = useMemo(() => [
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
    // {
    //   Header: 'Tags',
    //   accessor: 'tags',
    //   disableSortBy: true,
    //   Cell: ({value}) => value.join(', ')
    // },
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
        <IconButton
          aria-label='delete'
          className='cell__action--delete'
          data-id={row.original.id}
          onClick={onDeleteClick}
        >
          <span className='material-icons'>delete</span>
        </IconButton>
      )
    },
    // {Header: 'DDC', accessor: 'code', className: 'cell__number'}
  ], [])

  const columnFilters = [{
    column: 'title',
    label: 'Title',
    type: 'string'
  }, {
    column: 'author',
    label: 'Author',
    type: 'object'
  }, {
    column: 'rating',
    label: 'Rating',
    type: 'number'
  }, {
    column: 'genre',
    label: 'Genre',
    type: 'string'
  }, {
    column: 'type',
    label: 'Type',
    type: 'string'
  }, {
    column: 'language',
    label: 'Language',
    type: 'string'
  }]

  const initialState = {
    pageSize: 20,
    sortBy: [{id: 'title', desc: false}]
  }

  return (
    <>
      <Button
        className='books-new-button'
        color='primary'
        size='medium'
        variant='contained'
        onClick={() => push('/books/new')}
      >
        New
      </Button>
      {/* TODO: Find a better way to render when loadind data or empty */}
      <Table
        id='books-table'
        columns={columns}
        data={collection.data}
        initialState={initialState}
        columnFilters={columnFilters}
        filterable
      />
    </>
  )
}

export default BooksShelf

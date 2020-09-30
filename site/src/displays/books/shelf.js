import React, {useMemo} from 'react'
import {Button} from '@material-ui/core'
import {Link, useHistory} from 'react-router-dom'

import Table from 'components/table'
import StarRating from 'components/star_rating'

const BooksShelf = ({collection}) => {
  const {push} = useHistory()

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
      Cell: ({value}) => <div>{value.name} {value.surname}</div>
    },
    {Header: 'Description', accessor: 'description'},
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
      Cell: ({value}) => value.join(', ')
    },
    {
      Header: 'Link',
      accessor: 'goodreads_link',
      Cell: ({value}) => (
        <a href={value} rel='noopener noreferrer' target='_blank'>Goodreads</a>
      )
    },
    {Header: 'Type', accessor: 'type'},
    {Header: 'Language', accessor: 'language'},
    {Header: 'ISBN', accessor: 'ISBN', className: 'cell__number'},
    {Header: 'DDC', accessor: 'code', className: 'cell__number'},
    // {Header: 'Country', accessor: 'country', },
    // {Header: 'Year', accessor: 'year', className: 'cell__number'}
  ], [])

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
        id='board-games-table'
        columns={columns}
        data={collection.data}
      />
    </>
  )
}

export default BooksShelf

import React, {useState, useMemo, useEffect} from 'react'

import Table from 'components/table'
import {listBooks} from 'api/books'

const MAX_RATING = new Array(5).fill(0)

const BooksShelf = (props) => {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchBooks = async () => {
      const books = await listBooks()
      setData(books)
    }
    fetchBooks()
  }, [])

  const renderRatingStart = (idx, value) => {
    const icon = idx <= value ? 'star' : 'star_border'
    return <span key={idx} className='material-icons'>{icon}</span>
  }

  const columns = useMemo(() => [
    {Header: 'Title', accessor: 'title'},
    {Header: 'Author', accessor: 'author'},
    {Header: 'Description', accessor: 'description'},
    {Header: 'Type', accessor: 'type'},
    {Header: 'Language', accessor: 'language'},
    {
      Header: 'Rating',
      accessor: 'rating',
      Cell: ({value}) => {
        return (
          <div className='book-rating'>
            {MAX_RATING.map((_, i) => renderRatingStart(i, value))}
          </div>
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
    {Header: 'ISBN', accessor: 'ISBN', className: 'cell__number'},
    {Header: 'DDC', accessor: 'code', className: 'cell__number'},
    {Header: 'Country', accessor: 'country', },
    {Header: 'Year', accessor: 'year', className: 'cell__number'}
  ], [])

  return (
    <Table
      id='board-games-table'
      columns={columns}
      data={data}
    />
  )
}

export default BooksShelf

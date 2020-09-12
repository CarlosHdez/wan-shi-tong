import React, {useState, useMemo, useEffect} from 'react'

import Table from 'components/table'
import StarRating from 'components/star_rating'
import {listBooks} from 'api/books'

const BooksShelf = (props) => {
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchBooks = async () => {
      const books = await listBooks()
      setData(books)
    }
    fetchBooks()
  }, [])

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

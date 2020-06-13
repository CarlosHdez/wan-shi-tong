import React, {useState, useMemo, useEffect} from 'react'

import Table from 'components/table'
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
    // {Header: 'Author', accessor: 'author'},
    {Header: 'Description', accessor: 'description'},
    {Header: 'Type', accessor: 'type'},
    {Header: 'Language', accessor: 'language'},
    {Header: 'Rating', accessor: 'rating'},
    {Header: 'Tags', accessor: 'tags'},
    {Header: 'Link', accessor: 'goodreads_link'},
    {Header: 'ISBN', accessor: 'ISBN'},
    {Header: 'DDC', accessor: 'code'},
    {Header: 'Country', accessor: 'country'},
    {Header: 'Year', accessor: 'year'}
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

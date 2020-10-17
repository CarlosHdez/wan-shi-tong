import React, {useMemo} from 'react'

import Table from 'components/table'
import StarRating from 'components/star_rating'

const data = [{
  name: 'Zelda',
  company: 'Nintendo',
  genre: 'Action/Adventure',
  platform: 'Wii',
  completion: 1,
  rating: 5,
  tags: ['dark', 'midna'],
  notes: 'Completed the story at least 5 times'
}]

const VideogamesShelf = () => {
  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: ({value, row}) => {
        return value
        // return <Link to={`/books/${row.original.id}`}>{value}</Link>
      }
    },
    {Header: 'Company', accessor: 'company'},
    {Header: 'Platform', accessor: 'platform'},
    {Header: 'Genre', accessor: 'genre'},
    {
      Header: 'Rating',
      accessor: 'rating',
      Cell: ({value}) => {
        return (
          <StarRating
            value={value}
            label=''
            className='videogame-rating'
            editable={false}
          />
        )
      }
    },
    {
      Header: 'Completion',
      accessor: 'completion',
      className: 'cell__number',
      Cell: ({value}) => `${value * 100}%` // TODO: Add a better formatting
    },
    {
      Header: 'Tags',
      accessor: 'tags',
      disableSortBy: true,
      Cell: ({value}) => value.join(', ')
    },
    {Header: 'Notes', accessor: 'notes', disableSortBy: true}
  ], [])

  const initialState = {
    pageSize: 20,
    sortBy: [{id: 'title', desc: false}]
  }

  return (
    <Table
      id='video-games-table'
      initialState={initialState}
      columns={columns}
      data={data}
    />
  )
}

export default VideogamesShelf

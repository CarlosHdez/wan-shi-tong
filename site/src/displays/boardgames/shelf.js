import React, {useMemo} from 'react'
import {Button} from '@material-ui/core'
import {Link, useHistory} from 'react-router-dom'

import Table from 'components/table'
import StarRating from 'components/star_rating'

const VideogamesShelf = ({collection}) => {
  const {push} = useHistory()

  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: ({value, row}) => {
        return <Link to={`/boardgames/${row.original.id}`}>{value}</Link>
      }
    },
    {
      Header: 'Designer',
      accessor: 'designer',
      Cell: ({value}) => <div>{value.name} {value.surname}</div>,
      sortType: (rowA, rowB) => {
        return rowA.original.designer.surname > rowB.original.designer.surname ? -1 : 1
      }
    },
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
      Header: '# Players',
      accessor: 'players',
      Cell: ({value}) => <div>{value.min}-{value.max}</div>,
      sortType: (rowA, rowB) => {
        return rowA.original.players.min > rowB.original.players.min ? -1 : 1
      }
    },
    {Header: 'Type', accessor: 'type'},
    {
      Header: 'Mechanics',
      accessor: 'mechanics',
      Cell: ({value}) => value.join(', ')
    },
    {Header: 'Language', accessor: 'language'},
    {
      Header: 'Link',
      accessor: 'bgg_link',
      disableSortBy: true,
      Cell: ({value}) => (
        <a href={value} rel='noopener noreferrer' target='_blank'>BGG</a>
      )
    },
  ], [])

  const columnFilters = [{
    column: 'name',
    label: 'Name',
    type: 'string'
  }, {
    column: 'designer',
    label: 'Designer',
    type: 'object'
  }, {
    column: 'rating',
    label: 'Rating',
    type: 'number'
  }, {
    column: 'type',
    label: 'Type',
    type: 'string'
  }, {
    column: 'mechanics',
    label: 'Mechanics',
    type: 'string'
  }, {
    column: 'language',
    label: 'Language',
    type: 'string'
  }, {
    column: 'publisher',
    label: 'Publisher',
    type: 'string'
  }]

  const initialState = {
    pageSize: 20,
    sortBy: [{id: 'name', desc: false}]
  }

  return (
    <>
      <Button
        className='books-new-button'
        color='primary'
        size='medium'
        variant='contained'
        onClick={() => push('/boardgames/new')}
      >
        New
      </Button>
      <Table
        id='boardgames-table'
        columns={columns}
        data={collection.data}
        initialState={initialState}
        columnFilters={columnFilters}
        filterable
      />
    </>
  )
}

export default VideogamesShelf

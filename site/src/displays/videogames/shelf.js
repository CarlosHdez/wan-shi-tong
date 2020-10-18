import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import {Button} from '@material-ui/core'
import {Link, useHistory} from 'react-router-dom'

import Table from 'components/table'
import StarRating from 'components/star_rating'
import {PLATFORMS} from 'lib/constants'

const VideogamesShelf = ({collection}) => {
  const {push} = useHistory()
  const columns = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name',
      Cell: ({value, row}) => {
        return <Link to={`/videogames/${row.original.id}`}>{value}</Link>
      }
    },
    {Header: 'Company', accessor: 'company'},
    {
      Header: 'Platform',
      accessor: 'platform',
      Cell: ({value}) => PLATFORMS.find(({id}) => id === value).name
    },
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
    <>
      <Button
        className='new-button'
        color='primary'
        size='medium'
        variant='contained'
        onClick={() => push('/videogames/new')}
      >
        New
      </Button>
      <Table
        id='video-games-table'
        initialState={initialState}
        columns={columns}
        data={collection.data}
      />
    </>
  )
}

VideogamesShelf.propTypes = {
  collection: PropTypes.shape({
    data: PropTypes.array
  }).isRequired
}

export default VideogamesShelf

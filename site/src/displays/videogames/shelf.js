import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import {Button} from '@material-ui/core'
import {Link, useHistory} from 'react-router-dom'

import Table from 'components/table'
import StarRating from 'components/star_rating'
import DeleteIcon from 'components/delete_icon'
import {deleteVideogame} from 'api/videogames'
import {PLATFORMS} from 'lib/constants'

const VideogamesShelf = ({collection}) => {
  const {push} = useHistory()
  const columns = useMemo(() => {
    const onDeleteClick = async (id) => {
      const {data} = await deleteVideogame(id)
      collection.dispatch({type: 'success', data})
    }
    return [
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
        Cell: ({value}) => value.toLocaleString(undefined, {style: 'percent'})
      },
      {
        Header: 'Tags',
        accessor: 'tags',
        disableSortBy: true,
        Cell: ({value}) => value.join(', ')
      },
      {Header: 'Notes', accessor: 'notes', disableSortBy: true},
      {
        Header: '',
        accessor: '',
        id: 'actions',
        className: 'cell__action',
        disableSortBy: true,
        Cell: ({row}) => (
          <DeleteIcon
            id={row.original.id}
            name={row.original.name}
            onDelete={onDeleteClick}
          />
        )
      }
    ]
  }, [collection])

  const initialState = {
    pageSize: 20,
    sortBy: [{id: 'name', desc: false}]
  }

  const columnFilters = [{
    column: 'name',
    label: 'Name',
    type: 'string'
  }, {
    column: 'company',
    label: 'Company',
    type: 'string'
  }, {
    column: 'platform',
    label: 'Platform',
    type: 'enum',
    options: PLATFORMS
  }, {
    column: 'genre',
    label: 'Genre',
    type: 'string'
  }, {
    column: 'rating',
    label: 'Rating',
    type: 'number'
  }, {
    column: 'completion',
    label: 'Completion',
    type: 'percentage'
  // }, {
  // TODO: Check how to index all tags and use them as filter opionts
  //   column: 'tags',
  //   type: 'string'
  }]

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
        columnFilters={columnFilters}
        filterable
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

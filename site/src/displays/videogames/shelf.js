import React, {useMemo, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Add} from '@material-ui/icons'
import {Link, useHistory} from 'react-router-dom'
import {Button} from '@material-ui/core'

import Table from 'components/table'
import FilterRow from 'components/filter/filter_row'
import StarRating from 'components/star_rating'
import DeleteIcon from 'components/delete_icon'
import {deleteVideogame} from 'api/videogames'
import {PLATFORMS, VIDEOGAME_FILTERS} from 'lib/constants'
import {filterData} from 'lib/utils'

const VideogamesShelf = ({collection}) => {
  const [tableData, setTableData] = useState(collection.data)
  const [filters, setFilters] = useState([])
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

  useEffect(() => {
    setTableData(filterData(collection.data, filters))
  }, [filters, collection.data])

  const filterRow = (
    <FilterRow
      filters={filters}
      setFilters={setFilters}
      filterOptions={VIDEOGAME_FILTERS}
    />
  )

  return (
    <>
      <div className='table--filters'>
        <Button size='small' onClick={() => push('/videogames/new')}><Add /></Button>
        {filterRow}
      </div>
      <Table
        id='video-games-table'
        initialState={{pageSize: 20, sortBy: [{id: 'name', desc: false}]}}
        columns={columns}
        data={tableData}
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

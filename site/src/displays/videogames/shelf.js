import React, {useMemo, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Add} from '@mui/icons-material'
import {debounce} from 'lodash'
import {Link, useHistory} from 'react-router-dom'
import {Button, TextField} from '@mui/material'

import Table from 'components/table'
import FilterRow from 'components/filter/filter_row'
import StarRating from 'components/star_rating'
import DeleteIcon from 'components/delete_icon'
import {TableTagCell} from 'components/table/tag_cell'
import {deleteVideogame} from 'api/videogames'
import {PLATFORMS, VIDEOGAME_FILTERS} from 'lib/constants'
import {filterData} from 'lib/utils'
import {useStorage} from 'hooks/useStorage'

const VIDEOGAMES_STORAGE_KEY = 'video-table-storage'
const VideogamesShelf = ({collection}) => {
  const [tableData, setTableData] = useState(collection.data)
  const {push} = useHistory()
  const {value, storage} = useStorage(VIDEOGAMES_STORAGE_KEY)
  const [filters, setFilters] = useState(value || [])
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
        className: 'cell__tags',
        Cell: ({value = []}) => (
          <>
            {value.map((val, i) => (
              <TableTagCell
                key={val.id}
                label={val.name}
                filters={filters}
                setFilters={setFilters}
              />
            ))}
          </>
        )
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
  }, [collection, filters])

  useEffect(() => {
    const value = filters.filter(({column}) => column !== 'search') // Don't save the search column
    if (value.length) {
      storage.setItem(VIDEOGAMES_STORAGE_KEY, JSON.stringify(value))
    } else {
      storage.removeItem(VIDEOGAMES_STORAGE_KEY)
    }
  }, [filters, storage])

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

  const doSearch = debounce(({target}) => {
    const newFilters = filters
      .filter(({column}) => column !== 'search') // Remove old search
    newFilters.push({ value: target.value, column: 'search', key: 'name' })
    setFilters(newFilters)
  }, 500)
  const search = (e) => {
    e.persist();
    doSearch(e);
  }

  return (
    <>
      <div className='table--filters'>
        <Button size='small' onClick={() => push('/videogames/new')}><Add /></Button>
        <TextField
          label='Search'
          className='search-box'
          variant='standard'
          size="small"
          onChange={search}
        />
        {filterRow}
      </div>
      <Table
        id='video-games-table'
        status={collection.status}
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

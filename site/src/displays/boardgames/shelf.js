import React, {useMemo, useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Add} from '@material-ui/icons'
import {Button} from '@material-ui/core'

import Table from 'components/table'
import FilterRow from 'components/filter/filter_row'
import StarRating from 'components/star_rating'
import DeleteIcon from 'components/delete_icon'
import {deleteBoardgame} from 'api/boardgames'
import {BOARDGAME_FILTERS} from 'lib/constants'
import {filterData} from 'lib/utils'
import {useStorage} from 'hooks/useStorage'

const BOARDGAMES_STORAGE_KEY = 'board-table-storage'
const BoardgamesShelf = ({collection}) => {
  const [tableData, setTableData] = useState(collection.data)
  const {value, storage} = useStorage(BOARDGAMES_STORAGE_KEY)
  const [filters, setFilters] = useState(value || [])
  const {push} = useHistory()

  const columns = useMemo(() => {
    const onDeleteClick = async (id) => {
      const {data} = await deleteBoardgame(id)
      collection.dispatch({type: 'success', data})
    }
    return [
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
        accessor: 'link',
        disableSortBy: true,
        Cell: ({value}) => (
          <a href={value} rel='noopener noreferrer' target='_blank'>BGG</a>
        )
      },
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
    if (filters.length) {
      storage.setItem(BOARDGAMES_STORAGE_KEY, JSON.stringify(filters))
    } else {
      storage.removeItem(BOARDGAMES_STORAGE_KEY)
    }
  }, [filters, storage])

  useEffect(() => {
    setTableData(filterData(collection.data, filters))
  }, [filters, collection.data])

  const filterRow = (
    <FilterRow
      filters={filters}
      setFilters={setFilters}
      filterOptions={BOARDGAME_FILTERS}
    />
  )

  return (
    <>
      <div className='table--filters'>
        <Button size='small' onClick={() => push('/boardgames/new')}><Add /></Button>
        {filterRow}
      </div>
      <Table
        id='boardgames-table'
        columns={columns}
        data={tableData}
        initialState={{pageSize: 20, sortBy: [{id: 'name', desc: false}]}}
      />
    </>
  )
}

export default BoardgamesShelf

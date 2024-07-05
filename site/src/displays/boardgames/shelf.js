import {useMemo, useState, useEffect, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Add} from '@mui/icons-material'
import {debounce} from 'lodash'
import {Button, TextField} from '@mui/material'

import Table from 'components/table'
import FilterRow from 'components/filter/filter_row'
import StarRating from 'components/star_rating'
import DeleteIcon from 'components/delete_icon'
import {BoardgamesContext} from 'lib/contexts/boardgames'
import {TableTagCell} from 'components/table/tag_cell'
import {deleteBoardgame} from 'api/boardgames'
import {BOARDGAME_FILTERS} from 'lib/constants'
import {filterData} from 'lib/utils'
import {useStorage} from 'hooks/useStorage'

const BOARDGAMES_STORAGE_KEY = 'board-table-storage'
const BoardgamesShelf = () => {
  const {
    state: games,
    dispatch: gamesDispatch
  } = useContext(BoardgamesContext)
  const [tableData, setTableData] = useState(games.data)
  const {value, storage} = useStorage(BOARDGAMES_STORAGE_KEY)
  const [filters, setFilters] = useState(value || [])
  const {push} = useHistory()

  const columns = useMemo(() => {
    const onDeleteClick = async (id) => {
      const {data} = await deleteBoardgame(id)
      gamesDispatch({type: 'success', data})
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
        className: 'cell__tags',
        Cell: ({value = []}) => (
          <>
            {value.map((val, i) => (
              <TableTagCell
                key={val.id}
                label={val.name}
                column='mechanics'
                filterLabel='Mechanic'
                filters={filters}
                setFilters={setFilters}
              />
            ))}
          </>
        )
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
  }, [gamesDispatch, filters])

  useEffect(() => {
    const value = filters.filter(({column}) => column !== 'search') // Don't save the search column
    if (value.length) {
      storage.setItem(BOARDGAMES_STORAGE_KEY, JSON.stringify(value))
    } else {
      storage.removeItem(BOARDGAMES_STORAGE_KEY)
    }
  }, [filters, storage])

  useEffect(() => {
    setTableData(filterData(games.data, filters))
  }, [filters, games.data])

  const filterRow = (
    <FilterRow
      filters={filters}
      setFilters={setFilters}
      filterOptions={BOARDGAME_FILTERS}
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
        <Button size='small' onClick={() => push('/boardgames/new')}><Add /></Button>
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
        id='boardgames-table'
        status={games.status}
        columns={columns}
        data={tableData}
        initialState={{pageSize: 20, sortBy: [{id: 'name', desc: false}]}}
      />
    </>
  )
}

export default BoardgamesShelf

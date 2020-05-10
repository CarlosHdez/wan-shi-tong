import React from 'react'

import Table from '../components/table'

const mockList = [
  {name: 'Coup', author: 'somebody', type: 'cards'},
  {name: 'Love letter', author: 'somebody else', type: 'cards'},
  {name: 'Puerto Rico ', author: 'somebody', type: 'control'}
]

const BoardGamesShelf = (props) => {
  const data = React.useMemo(() => mockList, [])
  const columns = React.useMemo(() => [
    {Header: 'Name', accessor: 'name'},
    {Header: 'Author', accessor: 'author'},
    {Header: 'Type', accessor: 'type'}
  ], [])
  return (
    <Table
      id='board-games-table'
      columns={columns}
      data={data}
    />
  )
}

export default BoardGamesShelf

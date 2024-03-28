export const SECTIONS = {
  books: {
    title: 'Books',
    id: 'books',
    icon: 'library_books'
  },
  videogames: {
    title: 'Video Games',
    id: 'videogames',
    icon: 'videogame_asset'
  },
  boardgames: {
    title: 'Board Games',
    id: 'boardgames',
    icon: 'casino'
  }
}

export const PLATFORMS = [
  {id: 'nin-1', name: 'Switch'},
  {id: 'nin-2', name: 'Wii'},
  {id: 'nin-3', name: 'GameCube'},
  {id: 'nin-4', name: 'Nintendo DS'},
  {id: 'nin-5', name: '3DS'},
  {id: 'nin-6', name: 'GameBoy Advance'},
  {id: 'pc-1', name: 'Steam'}
]

export const BOOK_FILTERS = [{
  column: 'author',
  label: 'Author',
  type: 'object'
}, {
  column: 'rating',
  label: 'Rating',
  type: 'number'
}, {
  column: 'genre',
  label: 'Genre',
  type: 'string'
}, {
  column: 'type',
  label: 'Type',
  type: 'string'
}, {
  column: 'language',
  label: 'Language',
  type: 'string'
}]

export const VIDEOGAME_FILTERS = [{
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

export const BOARDGAME_FILTERS = [{
  column: 'designer',
  label: 'Designer',
  type: 'object'
}, {
  column: 'rating',
  label: 'Rating',
  type: 'number'
}, {
  column: 'players',
  label: 'Players',
  type: 'range'
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

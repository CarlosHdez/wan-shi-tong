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
  column: 'title',
  label: 'Title',
  type: 'string'
}, {
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

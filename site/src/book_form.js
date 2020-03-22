import React from 'react'
import {TextInput, Textarea} from 'react-materialize'

class BookForm extends React.PureComponent {
  render() {
    return (
      <div>
        <h4>Add new book</h4>
        <TextInput placeholder='Titulo' />
        <TextInput placeholder='Autor' />
        <TextInput placeholder='Edición' />
        <TextInput placeholder='Editorial' />
        <TextInput placeholder='Lugar' />
        <TextInput placeholder='Año' />
        <TextInput placeholder='Páginas' />
        <TextInput placeholder='ISBN' />
        <Textarea placeholder='Descripción' />
      </div>
    )
  }
}

export default BookForm

import React from 'react'
import './App.css';
import { useLazyQuery, useQuery } from '@apollo/client'
import { getAllBooks, getSingleBooks } from './queries'

// components
import Spinner from './components/Spinner'
import BookDetail from './components/bookDetails'
import AddBook from './components/addBook'

const App = () => {

  const { data : AllBooks , loading: LoadingAllBooks } = useQuery(getAllBooks)
  const [ handleClick, { data: SingleBook, loading: LoadingSingleBook } ] = useLazyQuery(getSingleBooks) 

  const displayBooks = () => {

    if(LoadingAllBooks) {
      return (
        <Spinner />
      )
    } else {
      return (
        <div>
          <ul id="book-list">
            { 
              AllBooks.books.map(book => {
                return (
                  <li key={book.id} onClick={() => handleClick({ variables : {id : book.id } })}> 
                    {book.title} 
                  </li>
                )
              }) 
            }
          </ul>
          <BookDetail bookDetails={SingleBook} loading={LoadingSingleBook} />
          <AddBook />
        </div>
      )
    }
  }

  return (
    <div id="main">
      <h1>My Reading list</h1>
      {
        displayBooks() 
      }
    </div>
  );
}

export default App;

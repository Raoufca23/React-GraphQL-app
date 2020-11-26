import React from 'react'
import Spinner from './Spinner'

export default function bookDetails({bookDetails, loading}) {

    const displayBookDetail = () => {

        if(loading) {
            return (
                <Spinner />
            )
        }
        if(bookDetails && !loading) {
            const { title, genre, author } = bookDetails.book

            return (
                <>
                    <h2> { title } </h2>
                    <p> <span>Genre : </span> { genre }  </p>
                    <p> <span>Written by : </span>{ author.name } </p>
                    <p> All books by this author :</p>
                    <ul className="other-books" >
                        {
                            author.books.map(item => {
                                return (
                                    <li key={item.id} > { item.title } </li>
                                )
                            })
                        }
                    </ul>
                </>
            )
        } 
        return (
            <p>Click on book to see more details...</p>
        )
    }
    return (
        <div id="book-detail">
            { displayBookDetail() }
        </div>
    )
}

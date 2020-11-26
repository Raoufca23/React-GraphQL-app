import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { getAllAuthors, addBook, getAllBooks } from '../queries'

const AddBook = () => {

    const [ book, setBook ] = useState({
        title : "",
        genre: "",
        authorID : ""
    })
    const { data, loading } = useQuery(getAllAuthors)
    const [ sendBookData, { data: addedData, error } ] = useMutation(addBook, 
        { 
            onCompleted(){ 
                setBook({ 
                    title: "",
                    genre: "", 
                    authorID: ""
                }) 
            } 
        })

    const handleSubmit = (e) => {
        console.log(addedData)
        console.log(book)
        console.log(error)
        e.preventDefault()
        sendBookData({ 
            variables : book, 
            refetchQueries : [
                { query: getAllBooks }
            ],
            awaitRefetchQueries: true
        })
    }
    

    return (
        <form id="add-book" onSubmit={(e) => handleSubmit(e)} >
            <div className="form-group field">
                <label>Title</label>
                <input type="text" className="form-control" 
                onChange={(e) => setBook({...book, title: e.target.value})} 
                value={book.title} />
            </div>
            <div className="form-group field">
                <label>Genre</label>
                <input type="text" className="form-control"
                onChange={(e) => setBook({...book, genre: e.target.value})}
                value={book.genre} />
            </div>
            <div className="form-group field">
                <label>Author</label>
                <select className="form-control" 
                onChange={(e) => setBook({...book, authorID: e.target.value})}
                value={book.authorID} >
                    <option>Select author</option>
                    {
                        !loading && data.authors.map(item => {
                            return (
                                <option key={item.id} value={item.id} > { item.name } </option>
                            )
                        })
                    }
                </select>
            </div>
            <button>+</button>
        </form>
    )
}

export default AddBook
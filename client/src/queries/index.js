import { gql } from '@apollo/client'

const getAllBooks = gql`
    query getBooks($top: Int) {
        books (top : $top) {
            id
            title
            genre
        }
    }`

const getSingleBooks = gql`
    query ($id: ID) {
        book (id : $id) {
            id
            title
            genre
            author {
                id
                name
                age
                books {
                    id
                    title
                }
            }
        }
    }`

const getAllAuthors = gql`
    {
        authors {
            id
            name
            age
        }
    }
`
const addBook = gql`
    mutation($title: String!, $genre: String!, $authorID: ID!) {
        addBook(title: $title, genre: $genre, authorID: $authorID) {
            id
            title
        }
    }
`

export { getAllBooks, getSingleBooks, getAllAuthors, addBook }
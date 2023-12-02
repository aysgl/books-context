import React, { useState } from 'react'
import { useBookContext } from '../context/BooksContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { v4 } from 'uuid';

const Add = () => {
    const { books, setBooks } = useBookContext();
    const [bookName, setBookName] = useState("");
    const [authorName, setAuthorName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!bookName && !authorName) {
            toast.warning("Please enter book name!");
            return;
        }

        const newBook = {
            id: v4(),
            title: bookName,
            author: authorName
        };

        axios.post("http://localhost:3000/books", newBook)
            .then((response) => {
                setBooks([response.data, ...books]);
                setBookName("");
                setAuthorName("")
                toast.success("Book added successfully!");
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error("Failed to add book");
            });
    };

    return (
        <div className='row mt-3 mb-5'>
            <form className='col-md-8 mx-auto added' onSubmit={handleSubmit}>
                <div className='bg-light p-2 rounded shadow-lg d-flex w-100'>
                    <input value={bookName} onChange={(e) => setBookName(e.target.value)} className='form-control border-0 me-2' placeholder='Add a book' />
                    <input value={authorName} onChange={(e) => setAuthorName(e.target.value)} className='form-control border-0' placeholder='Add an author' />
                    <button className='btn btn-sm btn-dark btn-plus ms-2' disabled={bookName ? false : true}><i className="bi bi-plus-lg"></i></button>
                </div>
            </form>
        </div>
    )
}

export default Add
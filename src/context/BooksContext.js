import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [show, setShow] = useState(null);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/books/${id}`);
            setBooks(books.filter(book => book.id !== id));
            toast.success("Book deleted successfully!");
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to delete book");
        }
    };

    const handleEdit = (id) => {
        const bookToEdit = books.find(book => book.id === id);
        if (bookToEdit) {
            setShow(id);
        } else {
            console.error("Book not found");
            toast.error("Book not found");
        }
    };

    const handleSave = async (id) => {
        const bookToEdit = books.find((book) => book.id === id);

        if (bookToEdit) {
            const updatedBook = {
                ...bookToEdit,
                title: title
            };

            await axios.put(`http://localhost:3000/books/${id}`, updatedBook);

            const updatedBooks = books.map((book) => (book.id === id ? updatedBook : book));
            setBooks(updatedBooks);
            setShow(null);
            setTitle('');
            toast.success("Book edited successfully!");
        } else {
            console.error("Book not found");
            toast.error("Book not found");
        }
    };

    const contextValue = {
        books,
        setBooks,
        title,
        setTitle,
        show,
        handleDelete,
        handleEdit,
        handleSave
    };

    useEffect(() => {
        fetch("http://localhost:3000/books")
            .then(response => response.json())
            .then(books => setBooks(books))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <BookContext.Provider value={contextValue}>
            {children}
        </BookContext.Provider>
    );
};

export const useBookContext = () => {
    const context = useContext(BookContext);
    if (!context) {
        throw new Error('useBookContext must be used within a BookProvider');
    }
    return context;
};
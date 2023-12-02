import React from 'react';
import { useBookContext } from '../context/BooksContext';
import randomColor from 'randomcolor';

const List = () => {
    const { books, setTitle, show, handleDelete, handleEdit, handleSave } = useBookContext();

    return (
        <div className='row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2 g-lg-3 px-0'>
            {books?.map((book) => {
                const color = randomColor();
                return (
                    <div key={book.id} className='col'>
                        <div className='card border-0 shadow-lg'>
                            <div className='card-body'>
                                <div className='position-relative icon'>
                                    <div className='position-absolute end-0 top-0 z-1 p-2'>
                                        <i className="bi bi-bookmark-fill"></i>
                                    </div>
                                </div>
                                <div className='book' style={{ backgroundColor: color }}>
                                    <div>{book.title}</div>
                                    <p className='author'>{book.author}</p>
                                </div>
                                <div className="mb-3">
                                    {show !== book.id ?
                                        <label className='my-2' htmlFor={`checkbox-${book.id}`}>{book.title}</label>
                                        :
                                        <input
                                            type='text'
                                            className='form-control active'
                                            defaultValue={book.title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    }
                                </div>
                                <div className='mt-2 d-flex justify-content-end'>
                                    {show === book.id ?
                                        <>
                                            <button
                                                className='btn btn-sm text-white'
                                                style={{ backgroundColor: color }}
                                                onClick={() => handleDelete(book.id)}
                                            >
                                                <i className='bi bi-trash'></i>
                                            </button>
                                            <button
                                                type='button'
                                                className='btn btn-sm btn-dark ms-2'
                                                onClick={() => handleSave(book.id)}
                                            >
                                                Save
                                            </button>
                                        </>
                                        :
                                        <button
                                            type='button'
                                            className='btn btn-sm btn-dark ms-2'
                                            onClick={() => handleEdit(book.id, book.isRead)}
                                        >
                                            <i className='bi bi-pencil'></i>
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default List;

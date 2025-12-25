import './App.css'
import React from 'react';
import BookCreate from './components/SignForm';
import Books from './components/BookList';

const App: React.FC = () => {
    return(
        <div>
            <BookCreate/>
            <Books/>
        </div>
);}

export default App;

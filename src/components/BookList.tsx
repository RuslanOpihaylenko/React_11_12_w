import type { BookType } from "../Type";
import { Book } from "./Book";
import { useState, useEffect } from "react";
const URL = "http://localhost:3000/books";
const Books = () =>{
    const [book, setBook] = useState<BookType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(()=>{
        const fetchBooks = async()=>{
            setLoading(true);
            try{
                const response = await fetch(URL);
                if(!response.ok) {
                    throw new Error("error geting");
                }
                const data: BookType[] = await response.json();
                setBook(data);
            }catch(err){
                console.error(err);
                setError("Can't download list");
            }finally{
                setLoading(false);
            }
        };
        fetchBooks();
    },[]);
    if(loading) return <p>Loading...</p>;
    if(error) return <p style={{color:"red"}}>{error}</p>
    return(
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                {book.map((b)=>(
                    <Book key={b.ISBN} book={b}/>
                ))}
            </div>);
};
export default Books;
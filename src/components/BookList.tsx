import { books } from "../ListOfBooks";
import { Book } from "./Book";

export const BookList = () =>{
    return(
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {books.map((b)=>(
                <Book key={b.ISBN} book={b}/>
            ))}
        </div>
    );
};
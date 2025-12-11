import type { BookType } from "../Type";

type Props ={
    book: BookType;
};

export const Book = ({book}: Props)=>{
return(
    <div style={{border: "1px solid #ccc", padding: 16, borderRadius: 8}}>
        <h1>{book.Name}</h1>
        <h2>{book.Author}</h2>
        <img src={book.Img}></img>
        <div>{book.ISBN}</div>
        <div>{book.Discription}</div>
        <div>{book.Price}</div>
    </div>
);
};
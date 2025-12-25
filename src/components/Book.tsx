import type { BookType } from "../Type";

type Props ={
    book: BookType;
};

export const Book = ({book}: Props)=>{
return(
    <div style={{border: "1px solid #ccc", padding: 16, borderRadius: 8}}>
        <h1>{book.title}</h1>
        <h2>{book.author}</h2>
        <img src={book.img}></img>
        <div>{book.ISBN}</div>
        <div>{book.discription}</div>
        <div>{book.price}</div>
            <div><button disabled={book.isExist===false? true:false}>Buy</button></div>
    </div>
);
};
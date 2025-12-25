import React, {useState} from "react";
import type { BookType } from "../Type";
import "../styles/SignForm.css";
const BookCreate: React.FC = () =>{
    const URL = "http://localhost:3000/books";
    const [book, setBook] = useState<BookType>({
        title:"",
        author:"",
        ISBN:"",
        price:"",
        image:"",
        description:"",
        isExist:false,
    });
     
    const [errors, setErrors] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<BookType | null>(null);


    const adding = (e:React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) =>{

   const { name, value, type } = e.target;

    if (name === "price" && !/^\d*\.?\d*$/.test(value)) return;

    if (type === "checkbox") {
      setBook({ ...book, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setBook({ ...book, [name]: value });
    }
    };
    const validate = ():boolean =>{
        if(
            !book.title||
            !book.author||
            !book.ISBN||
            !book.price||
            !book.description
        ){
            setErrors("Усі обовʼязкові поля повинні бути заповнені");
            return false;
        }
        setErrors("");
        return true;
    };
    const handleSubmit = async (e:React.FormEvent) =>{
        e.preventDefault();
        if(!validate()) return;
        setLoading(true);
        try{
            const responce = await fetch(URL,
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(book),
                }
            );
            if(!responce.ok){
                throw new Error("error in adding");
            }
            const data: BookType = await responce.json();
            setResult(data);
            setBook({
                title:"",
                author:"",
                ISBN:"",
                price:"",
                image:"",
                description:"",
                isExist:false,
            });
        }catch(error){
            setErrors("Error in sending");
            console.error(error);
        }finally{
            setLoading(false);
        }
    };
    return(
        <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <h2>Нова книга</h2>

      <input
        name="title"
        placeholder="Title *"
        value={book.title}
        onChange={adding}
      />

      <input
        name="author"
        placeholder="Author *"
        value={book.author}
        onChange={adding}
      />

      <input
        name="ISBN"
        placeholder="ISBN *"
        value={book.ISBN}
        onChange={adding}
      />

      <input
        name="price"
        placeholder="Price *"
        value={book.price}
        onChange={adding}
      />

      <input
        name="image"
        placeholder="Image"
        value={book.image}
        onChange={adding}
      />

      <input
        name="description"
        placeholder="Description *"
        value={book.description}
        onChange={adding}
      />

      <label>
        <input
          type="checkbox"
          name="isExist"
          checked={book.isExist}
          onChange={adding}
        />
        isExist
      </label>

      {errors && <p style={{ color: "red" }}>{errors}</p>}

      <button type="submit" disabled={loading}>
        {loading? "Saving...":"Save"}
        </button>
        {result && <p style={{color: "green"}}> Saccessful adding!</p>}
    </form>
    );
};

export default BookCreate;
const {faker} = require("@faker-js/faker")
const Author = require("../models/Author");
const Book = require("../models/Book")

function randomNumber() {
    return Math.random() < 0.5 ? 2 : 3;
  }
  

const generateAuthorData = ()=>({
    id:faker.string.nanoid(10),
    name:faker.person.fullName(),
    email:faker.internet.email({provider:"testmail.com"}),
    phone_no:faker.phone.number(),
    
})

const generateBookData= (author)=>({
    id:faker.string.nanoid(15),
    title:faker.lorem.words({ min: 2, max: 3 }),
    likes:0,
    author:author,
})

const generateBooks = (numberOfBooks,author)=>{
    return Array.from({length:numberOfBooks},()=>{
        const book = generateBookData(author.id)
        author.addBook(book.id);
        return book;
    })
}

const users = Array.from({length:10},generateAuthorData);

let authors = users.map(user=>new Author(user.id,user.name,user.email,user.phone_no));
let books = []

authors.forEach((author)=>{
    const booksArray = generateBooks(randomNumber(),author);
    const booksArr = booksArray.map(book=>
        new Book(book.id,book.title,book.likes,book.author)
    )
    booksArr.forEach(book=>{
        books.push(book);
    })
})

module.exports = {authors,books};




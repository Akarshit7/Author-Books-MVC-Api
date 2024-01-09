

class Author {
    constructor(id, name, email, phone_no) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.phone_no = phone_no;
      this.books=[];
      this.book_published=0;
    }

    addBook(bookId) {
        if (!this.books.includes(bookId)) {
          this.books.push(bookId);
          this.book_published++;
        }
    }
  
}
  
  module.exports = Author;
class Book {
  constructor(id, title, likes, author) {
    this.id = id;
    this.title = title;
    this.likes = likes;
    this.author = author; 
    this.likedBy = [];    
  }

 
  like(userId) {
    if (!this.likedBy.includes(userId)) {
      this.likes++;
      this.likedBy.push(userId);
    }else{
      return "Already Liked"
    }
    // return this.likes;
  }

  unlike(userId) {
    const index = this.likedBy.indexOf(userId);
    if (index > -1) {
      this.likes--;
      this.likedBy.splice(index, 1);
    }else{
      return "Already unliked"
    }
    // return this.likes;
  }
  
    
}
  
module.exports = Book;
  
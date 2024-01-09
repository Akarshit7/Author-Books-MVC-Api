const { validationResult } = require("express-validator");
const {faker} = require("@faker-js/faker")
let { books } = require("../data/fakeData");
const FailedResponses = require("../data/failedResponse");
const Book = require("../models/Book");
const ApiFeatures = require("../utils/apiFeatures");

exports.getAllBooks = async (req,res,next)=>{
    try {
        const {pageSize,page,sortOrder,sortBy} = req.query;
        const query = new ApiFeatures(books,req.query);
        const sortedBooks = query.sort().pagination().getBooks();

    //send response
    res.status(200).json({
        status:'success',
        results:sortedBooks.length,
        totalPages:Math.ceil(books.length/pageSize),
        currentPage:page,
        pageSize,
        data:{
            books:sortedBooks,
        }
    })
    } catch (error) {
        console.log(error.message)
        FailedResponses.failed(res);
    }
}

exports.getOneBook = async (req,res,next)=>{
    try{
        const allBooks = await books;
        const requestedBook = allBooks.find(book=>book.id===req.params.id);

        if(!requestedBook){
            return FailedResponses.failedToFindBookData(res,req.params.id);
        }

        res.status(200).json({
            status:"success",
            results:1,
            data:{
                data:requestedBook
            }
        })
    }catch(error){
        FailedResponses.failed(res)
    }
}


exports.createBook = async (req,res,next)=>{
    const errors = validationResult(req);
    
    if(errors.isEmpty()){
        try {
            const newBook = new Book(faker.string.nanoid(15),req.body.title,0,req.userId);
            books.push(newBook)
            res.status(201).json({
                status: 'success',
                data: {
                  book: newBook,
                },
              });
        } catch (error) {
            
        }
    }else{
        //if validation fails
        return res.status(400).json({errors:errors.array()});
    }
}


exports.updateBook = async (req,res,next)=>{
    try {
        let updatedBook = books.find(book=>book.id===req.params.id);
        if(!updatedBook){
            return FailedResponses.failedToFindBookData(res,req.params.id)
        }
        for(let key in req.body){
            if(updatedBook.hasOwnProperty(key)){
                updatedBook[key] = req.body[key];
            }
        }
        res.status(200).json({
            status: 'success',
            data: {
              data: updatedBook,
            },
          });

    } catch (error) {
        FailedResponses.failed(res)
    }
}
exports.deleteBook = async (req,res,next)=>{
    try {
        const deletedBook = books.find(book=>book.id===req.params.id);
        if(!deletedBook){
            return FailedResponses.failedToFindBookData(res,req.params.id);
        }
        books = books.filter(book=>book.id!=req.params.id);
        res.status(204).json({
            status: 'success',
            data: null,
          });
    } catch (error) {
        FailedResponses.failed(res)
    }
}


exports.like = async (req,res,next)=>{
    try {
        const {id} = req.params;
        const bookTobeLiked = books.find(book=>book.id===id)
        if(!bookTobeLiked){
            return FailedResponses.failedToFindBookData(res,id);
        }
        const returnString = bookTobeLiked.like(req.userId)
        
        if(returnString){
            return res.status(301).json({
                message:returnString
            })
        }
        res.status(200).json({
            status:"success",
            data :bookTobeLiked
        })
    } catch (error) {
        FailedResponses.failed(res)
    }
}

exports.unlike = async (req,res,next)=>{
    try {
        const {id} = req.params
    const bookToBeDisLiked = books.find(book=>book.id===id)
    if(!bookToBeDisLiked){
        return FailedResponses.failedToFindBookData(res,id);
    }
    const returnString = bookToBeDisLiked.unlike(req.userId);
    if(returnString){
        return res.status(301).json({
            message:returnString
        })
    }
    res.status(200).json({
        status:"success",
        data :bookToBeDisLiked
    })
    } catch (error) {
        FailedResponses.failed(res)
    }

}
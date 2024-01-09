const { validationResult } = require("express-validator");
const {faker} = require("@faker-js/faker")
let { authors, books } = require("../data/fakeData");
const Author = require("../models/Author");
const {failed,failedToFindAuthorData} = require("../data/failedResponse");



exports.getAllAuthors =async (req,res,next)=>{
    try {
        const allAuthors = await authors;
    //send response
    res.status(200).json({
        status:'success',
        results:authors.length,
        data:{
            authors:allAuthors,
        }
    })
    } catch (error) {
        failed(res);
    }
}

exports.getAuthor = async (req,res,next)=>{
    try{
        const allAuthors = await authors;
        const findUserId = req.params.id ? req.params.id : req.userId;
        const requestedAuthor = allAuthors.find(author=>author.id===findUserId);

        if(!requestedAuthor){
            return failedToFindAuthorData(res,req.params.id)
        }
        requestedAuthor.books = requestedAuthor.books.map(id=>{
            return books.find(book=>book.id===id)
        })
        res.status(200).json({
            status:"success",
            results:1,
            data:{
                data:requestedAuthor
            }
        })
    }catch(error){
        failed(res)
    }
}


exports.createAuthor = async(req,res,next)=>{
    const errors = validationResult(req);
    
    if(errors.isEmpty()){
        try {
            const newAuthor = new Author(faker.string.nanoid(10),req.body.name,req.body.email,req.body.phone_no);
            authors.push(newAuthor)
            res.status(201).json({
                status: 'success',
                data: {
                  author: newAuthor,
                },
              });
        } catch (error) {
            
        }
    }else{
        return res.status(400).json({errors:errors.array()});
    }
    
}

exports.deleteAuthor = async(req,res,next)=>{
    
    try {
        const deleteAuthor = authors.find(author=>author.id===req.params.id);
        if(!deleteAuthor){
            return failedToFindAuthorData(res,req.params.id)
        }
        authors= authors.filter(author=>
             author.id!=req.params.id
        );
        res.status(204).json({
            status: 'success',
            data: null,
          });
    
    } catch (error) {
        failed(res)
    }
}


exports.updateAuthor = async (req,res,next)=>{
    try {
        let updatedAuthor = authors.find(author=>author.id===req.params.id);
        if(!updatedAuthor){
            return failedToFindAuthorData(res,req.params.id)
        }
        for(let key in req.body){
            if(updatedAuthor.hasOwnProperty(key)){
                updatedAuthor[key] = req.body[key];
            }
        }
        res.status(200).json({
            status: 'success',
            data: {
              data: updatedAuthor,
            },
          });

    } catch (error) {
        failed(res)
    }
}
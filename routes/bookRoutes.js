const express = require('express');
const bookController = require('../controllers/booksController');
const authController = require('../controllers/authController');
const { body } = require('express-validator');
const router = express.Router();

//implementing route protection 
//all the routes after this will be protected and will be used by the logged in 
router.use(authController.protect)

//implement the pagination and sorting by likes and dislikes 
router.route('/')
.get(bookController.getAllBooks)
.post([
    body('title').exists().withMessage("A title must be provided"),
],bookController.createBook)

router.route('/:id')
.get(bookController.getOneBook)
.patch(bookController.updateBook)
.delete(bookController.deleteBook)




router.put('/like/:id',bookController.like)

router.put('/unlike/:id',bookController.unlike)

module.exports = router

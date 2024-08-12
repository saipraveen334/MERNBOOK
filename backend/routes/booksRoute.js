import express from "express";
import { Book } from "../models/bookmodel.js";


const router =express.Router();

router.post("/", async (request, response) => {
    try {
        const { title, author, yearofpublish } = request.body;

        if (!title || !author || !yearofpublish) {
            return response.status(400).send({
                message: "Please send all the required fields: title, author, and year of publish"
            });
        }

        const newBook = { title, author, yearofpublish };
        const book = await Book.create(newBook);

        return response.status(201).send(book);

    } catch (error) {
        console.error("Error occurred:", error.message);
        return response.status(500).send({ message: error.message });
    }
});

router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({
            message: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) {
        return res.status(404).send({ message: 'Book not found' });
      }
      res.status(200).send(book);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Server error' });
    }
  });

// Route to update a book by ID
router.put('/:id', async (request, response) => {
    try {
        const { title, author, yearofpublish } = request.body;

        if (!title || !author || !yearofpublish) {
            return response.status(400).send({
                message: "Please enter all the required details: title, author, and year of publish"
            });
        }

        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body, { new: true, runValidators: true });

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).send({
            message: 'Successfully updated the book',
            data: result
        });
    } catch (error) {
        console.error(error.message);
        response.status(500).send({
            message: error.message
        });
    }
});

// ROUTE FOR A DELETING A BOOK

router.delete('/:id',async(request,response)=>{
    try{
        const {id} = request.params;
        const res= await Book.findByIdAndDelete(id);

        if (!res){
            return response.status(404).json({message:'Book not found with this id or no books are there to delete'})

        }
        return response.status(200).send({
            message:'The Book with this id deleted succesfully'
        });
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({
            message: error.message
        });
    }
})
export default router;
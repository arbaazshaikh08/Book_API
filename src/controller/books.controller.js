import { Book } from "../model/book.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const publishBook = asyncHandler(async (req, res) => {
  const { title, author, price } = req.body;
  if (!title?.trim() || !author?.trim() || price == null) {
    throw new ApiError(400, " All fields are required");
  }
  const book = await Book.create({
    title,
    author,
    price,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, book, "Book Publish successfully"));
});

const updateBook = asyncHandler(async (req, res) => {
  const { BookId } = req.params;
  if (!BookId) {
    throw new ApiError(400, "Book ID is required");
  }
  const { title, author, price } = req.body;

  if (!title?.trim() || !author?.trim() || price == null) {
    throw new ApiError(400, "All fields are required");
  }
  const updatedBook = await Book.findByIdAndUpdate(
    BookId,
    { title, author, price },
    { new: true }
  );

  if (!updatedBook) {
    throw new ApiError(404, "Book not found with this ID");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedBook, "Book updated successfully"));
});

const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();
  const TotalBook = books.length;
  res
    .status(200)
    .json(
      new ApiResponse(200, { TotalBook, books }, "Books fetched successfully")
    );
});

const deleteBook = asyncHandler(async (req, res) => {
  const { BookId } = req.params;
  const deletedBook = await Book.findByIdAndDelete(BookId);
  if (!deletedBook) {
    throw new ApiError(404, "Book not found with this ID");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, deletedBook, "Book deleted successfully"));
});

export { publishBook, updateBook, getAllBooks, deleteBook };

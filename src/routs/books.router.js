import { Router } from "express";
import {
  deleteBook,
  getAllBooks,
  publishBook,
  updateBook,
} from "../controller/books.controller.js";

const router = Router();

router.route("/publish-book").post(publishBook);
router.route("/getAll-book").get(getAllBooks);
router.route("/update-book/:BookId").put(updateBook);
router.route("/delete-book/:BookId").delete(deleteBook);

export default router;

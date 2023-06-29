import { HttpStatus } from "../httpStatus"

export const BOOK_ERROS = {
    BOOK_NOT_FOUND: "Book not found",
}

export const BOOK_STATUS = {
    [BOOK_ERROS.BOOK_NOT_FOUND]: HttpStatus.NOT_FOUND,
}
const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transaction");
const asyncHandler = require("../middlewares/asyncErrorHandler");

// Route để lấy tất cả giao dịch của một ví
router.get("/", transactionController.getAllTransactions);

// Route để tạo một giao dịch mới
router.post("/", transactionController.createTransaction);

// Route để cập nhật giao dịch
router.put("/:transactionId", transactionController.updateTransaction);

// Route để xóa giao dịch
router.delete("/:transactionId", transactionController.deleteTransaction);

// Route để lấy thông tin giao dịch theo ID
router.get("/:transactionId/details", transactionController.getTransactionById);
router.post("/ocr", asyncHandler(transactionController.ocr));

module.exports = router;

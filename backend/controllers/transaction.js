const { NotFoundError } = require("../core/error.response");
const { CREATED, OK } = require("../core/success.response");
const Transaction = require("../models/transaction");
const Wallet = require("../models/walletModel");
const User = require("../models/userModel");
exports.ocr = async (req, res) => {
  const imageUrl = req.query.imageUrl;
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      apikey: "8f7d0240f8a911ee9433edbb2578dfab",
    },
    body: JSON.stringify({
      headers: { "x-custom-key": "string" },
      refresh: false,
      incognito: false,
      extractTime: false,
      url: imageUrl,
    }),
  };

  fetch("https://api.taggun.io/api/receipt/v1/verbose/url", options)
    .then((response) => response.json())
    .then((result) => res.json(result.totalAmount))
    .catch((err) => console.error(err));
};
exports.getAllTransactions = async (req, res, next) => {
  const { walletId, userId } = req.body;

  try {
    // Xác thực người dùng
    const user = await User.findById(userId);
    if (!user) {
      return next(new NotFoundError(`User with ID ${userId} not found`));
    }

    // Xác thực ví
    const wallet = user.wallets.id(walletId);
    if (!wallet) {
      return next(
        new NotFoundError(
          `Wallet with ID ${walletId} not found for user ${userId}`
        )
      );
    }

    // Trả về tất cả giao dịch
    return res.status(200).json({
      transactions: wallet.transactions,
    });
  } catch (err) {
    return next(err);
  }
};

exports.createTransaction = async (req, res, next) => {
  const {
    amount,
    category,
    description,
    createdAt,
    imageUrl,
    type,
    walletId,
    userId,
  } = req.body;

  try {
    // Xác thực người dùng
    const user = await User.findById(userId);
    if (!user) {
      return next(new NotFoundError(`User with ID ${userId} not found`));
    }

    // Xác thực ví
    const wallet = user.wallets.id(walletId);
    if (!wallet) {
      return next(
        new NotFoundError(
          `Wallet with ID ${walletId} not found for user ${userId}`
        )
      );
    }

    // Tạo giao dịch mới và cập nhật ví
    const transaction = {
      amount,
      category,
      description,
      createdAt,
      imageUrl,
      type,
    };
    wallet.transactions.push(transaction);
    wallet.balance += type === "Income" ? amount : -amount;

    await user.save();

    return res.status(201).json({
      message: "Transaction created successfully",
      transaction,
    });
  } catch (err) {
    return next(err);
  }
};

exports.updateTransaction = async (req, res, next) => {
  const { transactionId } = req.params;
  const { walletId, userId } = req.query;
  const updateData = req.body;

  try {
    // Xác thực người dùng
    const user = await User.findById(userId);
    if (!user) {
      return next(new NotFoundError(`User with ID ${userId} not found`));
    }

    // Xác thực ví
    const wallet = user.wallets.id(walletId);
    if (!wallet) {
      return next(
        new NotFoundError(
          `Wallet with ID ${walletId} not found for user ${userId}`
        )
      );
    }

    // Xác thực giao dịch
    const transactionIndex = wallet.transactions.findIndex(
      (t) => t._id.toString() === transactionId
    );
    if (transactionIndex === -1) {
      return next(
        new NotFoundError(`Transaction with ID ${transactionId} not found`)
      );
    }

    const oldTransaction = wallet.transactions[transactionIndex];
    wallet.transactions[transactionIndex] = {
      ...oldTransaction,
      ...updateData,
    };

    // Cập nhật số dư ví
    if (oldTransaction.type === "Income") {
      wallet.balance -= oldTransaction.amount;
    } else {
      wallet.balance += oldTransaction.amount;
    }

    if (updateData.type === "Income") {
      wallet.balance += updateData.amount;
    } else {
      wallet.balance -= updateData.amount;
    }

    await user.save();

    return res.status(200).json({
      message: "Transaction updated successfully",
      transaction: wallet.transactions[transactionIndex],
    });
  } catch (err) {
    return next(err);
  }
};

exports.deleteTransaction = async (req, res, next) => {
  const { transactionId } = req.params;
  const { walletId, userId } = req.query;

  try {
    // Xác thực người dùng
    const user = await User.findById(userId);
    if (!user) {
      return next(new NotFoundError(`User with ID ${userId} not found`));
    }

    // Xác thực ví
    const wallet = user.wallets.id(walletId);
    if (!wallet) {
      return next(
        new NotFoundError(
          `Wallet with ID ${walletId} not found for user ${userId}`
        )
      );
    }

    // Xác thực giao dịch
    const transactionIndex = wallet.transactions.findIndex(
      (t) => t._id.toString() === transactionId
    );
    if (transactionIndex === -1) {
      return next(
        new NotFoundError(`Transaction with ID ${transactionId} not found`)
      );
    }

    const transaction = wallet.transactions[transactionIndex];
    wallet.transactions.splice(transactionIndex, 1);

    // Cập nhật số dư ví
    wallet.balance +=
      transaction.type === "Income" ? -transaction.amount : transaction.amount;

    await user.save();

    return res.status(200).json({
      message: "Transaction deleted successfully",
    });
  } catch (err) {
    return next(err);
  }
};

exports.getTransactionById = async (req, res, next) => {
  const { transactionId } = req.params;
  const { walletId, userId } = req.query;

  try {
    // Xác thực người dùng
    const user = await User.findById(userId);
    if (!user) {
      return next(new NotFoundError(`User with ID ${userId} not found`));
    }

    // Xác thực ví
    const wallet = user.wallets.id(walletId);
    if (!wallet) {
      return next(
        new NotFoundError(
          `Wallet with ID ${walletId} not found for user ${userId}`
        )
      );
    }

    // Xác thực giao dịch
    const transaction = wallet.transactions.id(transactionId);
    if (!transaction) {
      return next(
        new NotFoundError(`Transaction with ID ${transactionId} not found`)
      );
    }

    return res.status(200).json(transaction);
  } catch (err) {
    return next(err);
  }
};

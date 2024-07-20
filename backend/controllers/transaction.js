const { NotFoundError } = require('../core/error.response');
const { CREATED, OK } = require('../core/success.response');
const Transaction = require('../models/transaction');
const Wallet = require('../models/walletModel');

 exports.ocr =  async (req, res) => {
    const imageUrl = req.query.imageUrl;
    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          apikey: '8f7d0240f8a911ee9433edbb2578dfab'
        },
        body: JSON.stringify({
          headers: {'x-custom-key': 'string'},
          refresh: false,
          incognito: false,
          extractTime: false,
          url: imageUrl
        })
      };
    
    fetch('https://api.taggun.io/api/receipt/v1/verbose/url', options)
        .then(response => response.json())
        .then(result => res.json(result.totalAmount))
        .catch(err => console.error(err));
  }
  exports.getTransactionById = async (req, res, next) => {
    const {transactionId} = req.params;
    const transaction = await Transaction.findOne({ _id: transactionId}).lean();
    if (!transaction) throw new NotFoundError(`Transaction is not found`);
    return res.status(200).json(transaction);

  }

exports.getAllTransactions = async (req, res, next) => {
    const allTransactions = await Transaction.find().lean();
    return res.status(200).json({
      amount: allTransactions.length,
      transactions: allTransactions
    });
}


  
exports.createTransaction = async (req, res, next) => {
    const {amount, category, description, createdAt, imageUrl, type} = req.body;
    const {walletId} = req.query; 
    // validate a transaction infor

    //create new transaction
    const existingWallet = await Wallet.findById(walletId);
    if (!existingWallet) {
      throw new NotFoundError(`wallet is not found`)
    }
    const transaction = new Transaction({amount, category, description, createdAt, imageUrl, type});
    await transaction.save();
    // update wallet with new transaction
    existingWallet.transactions = [...existingWallet.transactions, transaction._id];
    if (transaction.type === 'Income' ) {
      existingWallet.balance = existingWallet.balance + transaction.amount;
    }
    else {
      existingWallet.balance = existingWallet.balance - transaction.amount;

    }
    await existingWallet.save()
    return new CREATED({message: 'Creating transaction success', metadata: transaction}).send(res);
}

exports.updateTransaction = async (req, res) => {
  const {transactionId} = req.params;
  const {walletId} = req.query; 
  const updateTransaction = req.body;

  const existingWallet = await Wallet.findById(walletId);
  if (!existingWallet) {
    throw new NotFoundError(`wallet is not found`)

  }
  const existingTransaction  = await Transaction.findById(transactionId);
  if (!existingTransaction) {
    throw new NotFoundError(`Transaction is not found`)

  }

  const filter = {_id: transactionId}, options = {new: true};

  const updatedTransaction = await Transaction.findByIdAndUpdate(filter, updateTransaction, options);
  // update wallet with updated transaction
  const isExpense = existingTransaction.type === 'Expense';
  const sameType = existingTransaction.type === updateTransaction.type;
  if (isExpense) {
    if (!updateTransaction.type ||  sameType) {
      existingWallet.balance = existingWallet.balance + (existingTransaction.amount - updateTransaction.amount);
    }
    else {
      existingWallet.balance = existingWallet.balance + (existingTransaction.amount + updateTransaction.amount);

    }
  }
  else  {
    if (!updateTransaction.type || sameType) {
      existingWallet.balance = existingWallet.balance + (updateTransaction.amount - existingTransaction.amount);
    }
    else {
      existingWallet.balance = existingWallet.balance - (existingTransaction.amount + updateTransaction.amount);

    }
  }
  await existingWallet.save()
  return new OK({message: 'Updating transaction success', metadata: updatedTransaction}).send(res);
    
}


exports.deleteTransaction = async (req, res) => {
  const {transactionId} = req.params;
  const {walletId} = req.query; 

  const existingWallet = await Wallet.findById(walletId);
  if (!existingWallet) {
    throw new Error(`wallet ${walletId} is not existent`)
  }
  const existingTransaction  = await Transaction.findById(transactionId);
  if (!existingTransaction) {
    throw new Error(`transaction ${transactionId} is not existent`);
  }
  await Transaction.findByIdAndDelete(transactionId);
  // update wallet 
  existingWallet.transactions.pop();
  existingWallet.balance = existingWallet.balance - existingTransaction.amount;
  const updatedWallet = await existingWallet.save()
  return res.status(200).json({message: 'Deleting transaction success'})
    
}

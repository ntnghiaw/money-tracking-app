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
  exports.getTransaction = async (req, res) => {
    const {transactionId} = req.params;
    try {
      const transaction = await Transaction.findById(transactionId);
      if (!transaction) return res.status(404).json({message: `Transaction with id ${transactionId} not found`})
      return res.status(200).json(transaction);
    } catch (error) {
      return res.status(500).json({message: `Getting transaction with id ${transactionId} failed`})
    }
  }

exports.getAllTransactions = async (req, res) => {
  try {
    const allTransactions = await Transaction.find();
    return res.status(200).json({
      amount: allTransactions.length,
      transactions: allTransactions
    });
  } catch (error) {
    return res.status(500).json({message: `Getting all transactions failed ${error}`})
  }
}


  
exports.createTransaction = async (req, res) => {
    const {amount, category, description, createdAt, imageUrl, type} = req.body;
    const {walletId} = req.query; 
    // validate a transaction infor

    //create new transaction
    try {
      const existingWallet = await Wallet.findById(walletId);
      if (!existingWallet) {
        throw new Error(`wallet ${walletId} is not existent`)
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
      const updatedWallet = await existingWallet.save()
      return res.status(201).json({message: 'Creating transaction success', transaction})
    } catch (error) {
      return res.status(500).json({message: `Creating transaction failed ${error}`})
    }
}

exports.updateTransaction = async (req, res) => {
  const {transactionId} = req.params;
  const {walletId} = req.query; 
  const updateTransaction = req.body;

  try {
    const existingWallet = await Wallet.findById(walletId);
    if (!existingWallet) {
      throw new Error(`wallet ${walletId} is not existent`)
    }
    const existingTransaction  = await Transaction.findById(transactionId);
    if (!existingTransaction) {
      throw new Error(`transaction ${transactionId} is not existent`);
    }
    const updatedTransaction = await Transaction.findByIdAndUpdate(transactionId, updateTransaction, {
      returnDocument: 'after'
    });
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
    const updatedWallet = await existingWallet.save()
    return res.status(200).json({message: 'Updating transaction success', updatedTransaction})
  } catch (error) {
    return res.status(500).json({message: `Updating transaction failed ${error}`})
    
  }
}


exports.deleteTransaction = async (req, res) => {
  const {transactionId} = req.params;
  const {walletId} = req.query; 

  try {
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
  } catch (error) {
    return res.status(500).json({message: `Deleting transaction failed ${error}`})
    
  }
}

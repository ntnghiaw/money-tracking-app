const Wallet = require('../models/walletModel')
const User = require('../models/userModel')
const createWallet = async(req,res) =>{
    try{
        const {userId, name, balance, type} = req.body;
        // const userId = req.params.userId;
        // const userExists = await User.findById(userId);
        // if(!userExists) return res.status(400).json({message: "User does not exist"})
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
          }
        const newWallet = new Wallet({userId: userId, name: name, balance: balance, type: type })
        user.wallets.push(newWallet);
        await user.save();
        const saveWallet = await newWallet.save();

        res.status(200).json(saveWallet)

    }catch(err){
        console.error('Lỗi khi tạo ví mới:', error);
        res.status(500).json({ error: 'Lỗi khi tạo ví mới' });
    }

}

const getAllWallets = async(req,res) =>{
    try{
        const { userId } = req.params;

        try {
          const user = await User.findById(userId);
      
          if (!user) {
            return res.status(404).send('User not found');
          }
      
          res.status(200).send(user.wallets);
        } catch (error) {
          res.status(500).send(error.message);
        }
    }catch(err){
        res.status(500).json({error:'Lỗi hệ thống' + err})
    }
}
const getDetailedWallet = async(req,res) =>{
    const { userId, walletId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
        return res.status(404).send('User not found');
        }

        const wallet = user.wallets.id(walletId);

        if (!wallet) {
        return res.status(404).send('Wallet not found');
        }

        res.status(200).send(wallet);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const modifyWallet = async(req, res) =>{
    const { userId, walletId } = req.params;
    const { name, balance, type } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
        return res.status(404).send('User not found');
        }

        const wallet = user.wallets.id(walletId);

        if (!wallet) {
        return res.status(404).send('Wallet not found');
        }

        if (name) wallet.name = name;
        if (balance) wallet.balance = balance;
        if (type) wallet.type = type;

        await user.save();

        res.status(200).send(wallet);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteWallet = async(req,res) =>{
    const { userId, walletId } = req.params;

    try {
        const user = await User.findById(userId);

        if (!user) {
        return res.status(404).send('User not found');
        }

        const wallet = user.wallets.id(walletId);

        if (!wallet) {
        return res.status(404).send('Wallet not found');
        }

        wallet.remove();
        await user.save();

        res.status(200).send('Wallet deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }   
}    

module.exports = {
    createWallet,
    getAllWallets,
    modifyWallet,
    deleteWallet,
    getDetailedWallet,
}
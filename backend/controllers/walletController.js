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
        const userId = req.params.userId;
        if(!userId){
            return res.status(400).json({error: 'Thiếu thông tin userId'});
        }
        const wallets = await Wallet.find({userId: userId});
        // Kiểm tra xem ví có tồn tại không
        if (!wallets) {
            return res.status(404).json({ error: 'Không tìm thấy ví' });
        }
  
        res.status(200).json(wallets)
    }catch(err){
        res.status(500).json({error:'Lỗi hệ thống' + err})
    }
}
const getDetailedWallet = async(req,res) =>{
    try{
        const userId = req.params.userId;
        const walletId = req.params.walletId;
        if(!walletId || !userId){
            return res.status(400).json({error: 'Thiếu thông tin walletId'});
        }
        const wallet = await Wallet.findOne({ _id: walletId, userId: userId });
        if (!wallet) {
            return res.status(404).json({ error: 'Không tìm thấy ví' });
        }
        res.status(200).json(wallet)
        }catch(err){
            res.status(500).json({error:'Lỗi hệ thống' + err})
        }
}
const modifyWallet = async(req, res) =>{
    try{
        const userId = req.params.userId;
        const walletId = req.params.walletId;
        const {name, balance} = req.body;
        const wallet = await Wallet.findOne({ _id: walletId, userId: userId });
        if (!wallet) {
            return res.status(404).json({ error: 'Không tìm thấy ví' });
        }
        if(!wallet) return res.status(404).json({error: 'Không tìm thấy ví'});
        wallet.name = name;
        wallet.balance = balance;
        const updatedWallet = await wallet.save();
        res.status(200).json(updatedWallet);
        }catch(err){
            res.status(500).json({error: 'Lỗi hệ thống' + err});
        }
}

const deleteWallet = async(req,res) =>{
    try{
        const userId = req.params.userId;
        const walletId = req.params.walletId;
        const wallet = await Wallet.findOne({ _id: walletId, userId: userId });
        if (!wallet) {
            return res.status(404).json({ error: 'Không tìm thấy ví' });
        }
        if(!wallet) return res.status(404).json({error: 'Không tìm thấy ví'});
        await wallet.deleteOne();
        res.status(200).json({message: 'Xóa ví thành công'});
        }catch(err){
            res.status(500).json({error: 'Lỗi hệ thống' + err});
            }

}

module.exports = {
    createWallet,
    getAllWallets,
    modifyWallet,
    deleteWallet,
    getDetailedWallet,
}
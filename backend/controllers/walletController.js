const Wallet = require('../models/walletModel')

const createWallet = async(req,res) =>{
    try{
        const {userId, name, balance, type} = req.body;
        
        const newWallet = new Wallet({user:userId, name: name, balance: balance, type: type })
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
        const wallets = await Wallet.find({user: userId});
        // Kiểm tra xem ví có tồn tại không
        if (!wallets) {
            return res.status(404).json({ error: 'Không tìm thấy ví' });
        }
  
        res.status(200).json(wallets)
    }catch(err){
        res.status(500).json({error:'Lỗi hệ thống' + err})
    }
}

module.exports = {
    createWallet,
    getAllWallets
}
const Wallet = require('../models/wallet.js');
const User = require('../models/user.js')

exports.createWallet  = async (req, res, next) => {
    const { userId } = req.query;

    const newWallet = req.body;

    try {
        const existingUser = await User.findById(userId)
        console.log(existingUser)
        if (!existingUser) {
            res.status(404).json({
                    message: "User not found"
            })
        }
        const existingWallet = await Wallet.findOne( { name: newWallet.name });
        if (existingWallet) {
            return res.status(409).json({ error: "Wallet's name is axist"});
        }   
        Wallet.create(newWallet).then(createdWallet => {
            const { wallets } = existingUser;
            if (createdWallet) {
                const updatedWallets = [...wallets, createdWallet._id]
                console.log(updatedWallets)
                User.findByIdAndUpdate({_id : userId}, { wallets: updatedWallets}).then(updatedUser => {
                    return updatedUser.save();
                   

                }).then(result => {
                    if (result) {
                        return res.status(200).json({
                            message: "create new wallet successfully"
                        })
                    }
                });
                
            }
        }).catch(err => {
            res.status(300).json({
                err
            })
            throw new Error(err);
        });
        
    } catch (error) {
        console.log(error)
    }

   


}


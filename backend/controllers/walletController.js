const Wallet = require("../models/walletModel");
const User = require("../models/userModel");
const createWallet = async (req, res) => {
  try {
    const { userId, name, balance, type } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newWallet = new Wallet({
      userId: userId,
      name: name,
      balance: balance,
      type: type,
    });

    user.wallets.push(newWallet);

    try {
      await user.save();
    } catch (saveError) {
      return res.status(500).json({ error: "Error saving user" });
    }

    res.status(201).json(newWallet);
  } catch (err) {
    console.error("Error creating new wallet:", err); // Detailed error message
    res
      .status(500)
      .json({ error: "Error creating new wallet", details: err.message });
  }
};

const getAllWallets = async (req, res) => {
  try {
    const { userId } = req.params;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).send("User not found");
      }

      res.status(200).send(user.wallets);
    } catch (error) {
      res.status(500).send(error.message);
    }
  } catch (err) {
    res.status(500).json({ error: "Lỗi hệ thống" + err });
  }
};
const getDetailedWallet = async (req, res) => {
  const { userId, walletId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const wallet = user.wallets.id(walletId);

    if (!wallet) {
      return res.status(404).send("Wallet not found");
    }

    res.status(200).send(wallet);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const modifyWallet = async (req, res) => {
  const { userId, walletId } = req.params;
  const { name, balance, type } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const wallet = user.wallets.id(walletId);

    if (!wallet) {
      return res.status(404).send("Wallet not found");
    }

    if (name) wallet.name = name;
    if (balance) wallet.balance = balance;
    if (type) wallet.type = type;

    await user.save();

    res.status(200).send(wallet);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteWallet = async (req, res) => {
  const { userId, walletId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const wallet = user.wallets.id(walletId);

    if (!wallet) {
      return res.status(404).send("Wallet not found");
    }

    wallet.remove();
    await user.save();

    res.status(200).send("Wallet deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  createWallet,
  getAllWallets,
  modifyWallet,
  deleteWallet,
  getDetailedWallet,
};

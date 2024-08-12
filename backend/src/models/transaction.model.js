const { model, Schema, Types } = require('mongoose') // Erase if already required

const DOCUMENT_NAME = 'Transaction'
const COLLECTION_NAME = 'transactions'

// Declare the Schema of the Mongo model
const transactionSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: [0, 'Amount must be greater than 0'],
      default: 0,
    },
    category: {
      _id: {
        type: Types.ObjectId,
      },
      name: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
    },
    description: {
      type: String,
      maxLength: 255,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    type: {
      type: String,
      enum: {
        values: ['income', 'expense', 'debt', 'other', 'transfer'],
      },
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    // createdBy: {
    //   type: Types.ObjectId,
    //   ref: 'User',
    // },
    // status: {
    //   type: String,
    //   enum: {
    //     values: ['pending', 'completed', 'cancelled'],
    //   },
    //   default: 'pending',
    // },

  },
  {
    timestamps: false,
    collection: COLLECTION_NAME,
  }
)

//Export the model
module.exports = model(DOCUMENT_NAME, transactionSchema)

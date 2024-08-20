const { model, Schema, Types } = require('mongoose') // Erase if already required
const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'users'

const BASE_AVT_URL = `https://ui-avatars.com/api/?size=200&rounded=true&background=random&length=2` // API to generate avatar from name

// Declare the Schema of the Mongo model
var userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 150,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    wallets: [
      {
        type: Types.ObjectId,
        ref: 'Wallet',
      },
    ],
    categories: [
      {
        type: Types.ObjectId,
        ref: 'Category',
      },
    ],
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    dob: {
      type: Date, // Date of birth
    },
    phone: {
      type: String,
      maxLength: 15,
    },
    avatar_url: {
      type: String,
      maxLength: 200,
      default: function () {
        return `${BASE_AVT_URL}&name=${this.name}`
      }, // Default avatar get from third party API or URL of image file saved in cloud
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
)

//Export the model
module.exports = model(DOCUMENT_NAME, userSchema)

const { model, Schema, Types } = require('mongoose')

const DOCUMENT_NAME = 'Category'
const COLLECTION_NAME = 'categories'

const categorySchema = new Schema(
  {
    icon: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      enum: {
        values: ['income', 'expense', 'debt', 'other', 'transfer'],
      },
      required: true,
    },
    secondaryCategories: [
      new Schema({
        icon: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        category: {
          type: Types.ObjectId,
          ref: 'Category',
        },
      }),
    ],
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
)

module.exports = {
  categoryModel: model(DOCUMENT_NAME, categorySchema),
  categorySchema,
}

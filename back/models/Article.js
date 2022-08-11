/* création d'un post par les utilisateurs */

/* importer mongoose */
const mongoose = require("mongoose");
const model = require("./User");

/* création d'un schéma de données */
const articleSchema = mongoose.Schema(
  {
    articleId: { type: String, require: true },
    message: { type: String, trim: true, require: true, maxlength: 500 },
    imageUrl: { type: String },
    userId: { type: String, require: true },
    likes: [{ NumberLikes: Number, default: 0, userId: String }],
    comments: [
      {
        commentId: String,
        commenterName: String,
        text: String,
        timestamp: Number,
        default: 0,
      },
    ],
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);

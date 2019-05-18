import { Schema } from "mongoose";

var User = new Schema({
    name: String,
    diets: [String]
});

module.exports = User;

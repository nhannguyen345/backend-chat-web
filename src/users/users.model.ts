import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            require: true,
        },
        username: {
            type: String,
            require: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
    },
    { timestamps: true },
);

export interface User extends mongoose.Document {
    _id: string;
    username: string;
    password: string;
    fullname: string;
}

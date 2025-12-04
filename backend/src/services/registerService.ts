import bcrypt from 'bcrypt';
import { UserModel, IUser } from '../models/User';

const SALT_ROUNDS = 10;

type RegisterUserData = Pick<IUser, 'email' | 'username' | 'name'> & { password: string };

export const registerUser = async ({ email, password, username, name }: RegisterUserData) => {
    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Create the new user document
    const newUser = new UserModel({
        email,
        passwordHash,
        username,
        name,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Return user without passwordHash
    return {
        _id: savedUser._id,
        email: savedUser.email,
        username: savedUser.username,
        name: savedUser.name,
        userRole: savedUser.userRole,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt,
    };
};
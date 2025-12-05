import bcrypt from 'bcrypt';
import { UserModel, IUser } from '../models/User';

const SALT_ROUNDS = 10;

type RegisterUserData = Pick<IUser, 'email' | 'username' | 'name' | 'userRole'> & { password: string };

export const registerUser = async ({ email, password, username, name, userRole = 'user' }: RegisterUserData) => {
    // Check if the email already exists
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
        throw new Error('Este email ya existe');
    }

    // Check if the username already exists
    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
        throw new Error('Este nombre de usuario ya existe');
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Create the new user document
    const newUser = new UserModel({
        email,
        passwordHash,
        username,
        name,
        userRole
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
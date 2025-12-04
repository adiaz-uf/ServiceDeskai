import bcrypt from 'bcrypt';
import { UserModel, IUser } from '../models/User';

type LoginUserData = Pick<IUser, 'email'> & { password: string };

export const loginUser = async ({ email, password }: LoginUserData) => {
    // Check if the user exists
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
        throw new Error('Invalid email');
    }

    // Compare the password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, existingUser.passwordHash);
    
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    // TODO: implement JWT

    // Return user without passwordHash
    return {
        _id: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
        name: existingUser.name,
        userRole: existingUser.userRole,
        createdAt: existingUser.createdAt,
        updatedAt: existingUser.updatedAt,
    };
};
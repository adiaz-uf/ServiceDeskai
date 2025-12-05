import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { UserModel, IUser } from '../models/User';
import { log } from 'console';

type LoginUserData = Pick<IUser, 'email'> & { password: string };

export const loginUser = async ({ email, password }: LoginUserData) => {
    // Check if the user exists
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
        throw new Error('El email o la contraseña no son válidos');
    }

    // Compare the password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, existingUser.passwordHash);
    
    if (!isPasswordValid) {
        throw new Error('El email o la contraseña no son válidos');
    }

    const payload = {
        _id: existingUser._id,
        email: existingUser.email,
        username: existingUser.username,
        name: existingUser.name,
        userRole: existingUser.userRole,
        createdAt: existingUser.createdAt,
        updatedAt: existingUser.updatedAt,
    };

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw new Error('CRITICAL ERROR: JWT_SECRET environment variable is not set');
    }

    const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION;

    if (!accessTokenExpiration) {
        throw new Error('CRITICAL ERROR: ACCESS_TOKEN_EXPIRATION environment variable is not set');
    }

    const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION;

    if (!refreshTokenExpiration) {
        throw new Error('CRITICAL ERROR: REFRESH_TOKEN_EXPIRATION environment variable is not set');
    }

    const accesstoken = jwt.sign(payload, jwtSecret, {
        expiresIn: accessTokenExpiration as SignOptions['expiresIn']
    });

    const refreshtoken = jwt.sign(payload, jwtSecret, {
        expiresIn: refreshTokenExpiration as SignOptions['expiresIn']
    });

    // Save refresh token in database
    await UserModel.findByIdAndUpdate(existingUser._id, { refreshToken: refreshtoken });

    console.log("User registerd: ", existingUser);
    

    return {
        ...payload,
        accesstoken
    };
   
};
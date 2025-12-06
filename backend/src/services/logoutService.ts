import { UserModel } from '../models/User';

export const logoutUser = async (userId: string) => {
    const user = await UserModel.findById(userId);
    
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    // Remove refresh token from database
    await UserModel.findByIdAndUpdate(userId, { refreshToken: null });

    return { message: 'Logout exitoso' };
};

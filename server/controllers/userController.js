import userModel from '../models/userModel.js';

export const getUserData = async (req, res) => {
    try {
        // Extract userId from req.user, which is set in the middleware
        const { userId } = req.user;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.json({
            success: true,
            userData: {
                name: user.name,
                isAccountVerified: user.isAccountVerified
            }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

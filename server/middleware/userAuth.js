import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }

    try {
        // Decoding the token to extract userId
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decodedToken); // Check the structure of the decoded token

        // Ensure correct field name is used to pass the userId to req.user
        req.user = { userId: decodedToken.userId };  // Corrected field name 'userId'
        
        next();
    } catch (error) {
        return res.json({ success: false, message: 'Not Authorized. Login Again' });
    }
};

export default userAuth;

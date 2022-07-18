import jwt from 'jsonwebtoken';

export const generateAccessToken = (user: UserDocument) => {
  return jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.NX_SECRECT_KEY,
    { expiresIn: '1d' }
  );
};

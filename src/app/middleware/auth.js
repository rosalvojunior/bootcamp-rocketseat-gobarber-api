import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Token not provided.' });
  }
  const [,token] = authHeader.split(' ');
  try {
    const decode = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decode.id;
    return next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalid.' });
  }
};

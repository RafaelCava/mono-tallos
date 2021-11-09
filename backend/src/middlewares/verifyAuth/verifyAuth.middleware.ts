import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SecureToken } from 'src/services/authServices/secretToken';

export function VerifyAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.headers.authorization) {
    return res.status(400).json('not Authorify');
  }

  const token = req.headers.authorization;
  const userVerify = verify(token, new SecureToken().secret());

  if (!userVerify) {
    return res.status(400).json('not Authorify, 2');
  }

  req.headers.user = userVerify as string;

  next();
}

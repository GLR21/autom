import { Request, Response } from 'express';
import { sign, decode, Secret,verify } from 'jsonwebtoken';
import 'dotenv/config'

export const validateJWT = (req: Request, res: Response, next: any) =>
{
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];

	if( !authHeader )
	{
		return res.sendStatus( 401 );
	}
	
	verify
	(
		token as string,
		process.env.ACCESS_TOKEN_SECRET as Secret,
		(err: any, decoded: any) =>
		{
			if( err )
			{
				return res.sendStatus( 403 );
			}

			//@ts-ignore
			req.user = decoded.username;
			next();
		}
	);
}
import 'dotenv/config'
import Logging from '../util/Logging';
import { sign, decode, Secret, verify } from 'jsonwebtoken';
import { Request, Response } from 'express';
import { loginPessoa } from '../service/Pessoa.service';
import { LoginPessoaSchema } from '../schema/Pessoa.schema';
import { getPessoa } from '../service/Pessoa.service';

export async function loginPessoaHandler(req: Request<{}, {}, LoginPessoaSchema['body']>, res: Response)
{
	try
	{
		const pessoa = await loginPessoa(req.body);
		
		if( !pessoa )
		{
			return res.status( 401 ).send( 'Usuário ou senha inválidos' );
		}
		else
		{
			const accessToken = sign(
										{
											"user_id": pessoa.id
										},
										process.env.ACCESS_TOKEN_SECRET as Secret,
										{
											expiresIn: "3600s"
										}
									);
			const refreshToken = sign(
										{
											"user_id": pessoa.id
										},
										process.env.REFRESH_TOKEN_SECRET as Secret,
										{
											expiresIn: "1d"
										}
									 );

			let response = res;
			response.cookie( "jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 } );
			// response.cookie( "jwt", refreshToken, { httpOnly: true, maxAge: 2*60*1000 } );
			// 2 minutos, para testes
			
			return response.status( 200 ).send( { accessToken: accessToken } );
		}

		
	}
	catch (err: any)
	{
		Logging.error(err.message);
		return res.status(409).send(err.message);
	}
}

export async function refreshTokenHandler(req: Request, res: Response)
{
	try
	{
		
		const cookies = req.cookies;
		
		if( typeof cookies.jwt === 'undefined' )
		{
			return res.sendStatus( 401 );	
		}

		const refreshToken = cookies.jwt;

		const payload = decode( refreshToken );
		
		//@ts-ignore
		const user = await getPessoa( payload?.user_id );

		if( !user )
		{
			return res.sendStatus( 401 );	
		}

		verify
		(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET as Secret,
			(err:any, decode:any) =>
			{
				if( err || decode.user_id !== user.id )
				{
					return res.sendStatus( 403 );
				}

				const accessToken = sign
				(
					{
						"user_id": decode.user_id
					},
					process.env.ACCESS_TOKEN_SECRET as Secret,
					{
						expiresIn: "3600s"
					}
				);

				return res.status( 200 ).send( { accessToken: accessToken } );
			}
		)
	}
	catch (err: any)
	{
		Logging.error(err.message);
		return res.status(409).send(err.message);
	}
}

export async function logoutPessoaHandler(req: Request, res: Response)
{
	try
	{
		// Deletar Access Token no client-side antes de chamar esta rota

		const cookies = req.cookies;
		
		if( typeof cookies.jwt === 'undefined' )
		{
			return res.sendStatus( 204 );	
		}

		const refreshToken = cookies.jwt;
		const payload = decode( refreshToken );
		
		//@ts-ignore
		const user = await getPessoa( payload?.user_id );

		if( !user )
		{
			res.clearCookie( "jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 } );
			// res.clearCookie( "jwt", { httpOnly: true, maxAge: 2*60*1000 } );
			//2 minutos, para testes

			return res.sendStatus( 204 );	
		}

		res.clearCookie( "jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 } );
		// res.clearCookie( "jwt", { httpOnly: true, maxAge: 2*60*1000 } );
		//2 minutos, para testes
		
		return res.sendStatus( 204 );	
	}
	catch (err: any)
	{
		Logging.error(err.message);
		return res.status(409).send(err.message);
	}
}
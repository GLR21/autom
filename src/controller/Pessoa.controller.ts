import { Request, Response } from 'express';
import Logging from '../util/Logging';
import { createPessoa } from '../service/Pessoa.service';
import { CreatePessoaSchema } from '../schema/Pessoa.schema';

export async function createPessoaHandler( req:Request<{},{},CreatePessoaSchema['body']>, res:Response)
{
	try
	{
		const pessoa = await createPessoa( req.body );
		return res.status( 201 ).send( pessoa );
	}
	catch ( err: any )
	{
		Logging.error( err.message );
		return res.status( 409 ).send( err.message );
	}
}

export async function getAllPessoaHandler( req:Request, res:Response )
{
	try
	{
		const pessoa = await getAllPessoa();
		return res.status( 200 ).send( pessoa );
	}
	catch ( err: any )
	{
		Logging.error( err.message );
		return res.status( 409 ).send( err.message );
	}
}
import { Request, Response } from 'express';
import Logging from '../util/Logging';
import { createPessoa, deletePessoa, getAllPessoas, getPessoa, updatePessoa } from '../service/Pessoa.service';
import { CreatePessoaSchema, UpdatePessoaSchema } from '../schema/Pessoa.schema';

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

export async function getPessoaHandler( req:Request, res:Response )
{
	try
	{
		const pessoa = await getPessoa( req.query.id ); 
		return res.status( 200 ).send( pessoa );
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
		const pessoas = await getAllPessoas();
		return res.status( 200 ).send( pessoas );
	}
	catch ( err: any )
	{
		Logging.error( err.message );
		return res.status( 409 ).send( err.message );
	}
}

export async function deletePessoaHandler( req:Request, res:Response )
{
	try
	{
		const pessoa = await deletePessoa( req.query.id );
		return res.status( 204 ).send( pessoa );
	}
	catch ( err: any )
	{
		Logging.error( err.message );
		return res.status( 409 ).send( err.message );
	}
}

export async function updatePessoaHandler(req:Request<{},{},UpdatePessoaSchema['body']>, res:Response )
{
	try
	{
		const pessoa = await updatePessoa( req.body );
		return res.status( 201 ).send( pessoa );
	}
	catch ( err: any )
	{
		Logging.error( err.message );
		return res.status( 409 ).send( err.message );
	}
}
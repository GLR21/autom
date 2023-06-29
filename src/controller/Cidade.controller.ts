import { Request, Response } from 'express';
import Logging from "../util/Logging";
import { createCidade, deleteCidade, getAllCidades, getCidade, getCidadeByIBGE, updateCidade } from "../service/Cidade.service";
import { CreateCidadeSchema } from '../schema/Cidade.schema';

export async function createCidadeHandler(req: Request<{}, {}, CreateCidadeSchema['body']>, res: Response)
{
	try
	{
		const cidade = await createCidade(req.body);
		return res.status(201).send(cidade);
	}
	catch (err: any)
	{
		Logging.error(err.message);
		return res.status(409).send(err.message);
	}
}

export async function getCidadeHandler(req: Request, res: Response)
{
	try
	{
		const cidade = await getCidade(req.query.id);
		return res.status(200).send(cidade);
	}
	catch (err: any)
	{
		Logging.error(err.message);
		return res.status(409).send(err.message);
	}
}

export async function getAllCidadeHandler(req: Request, res: Response)
{
	try
	{
		const cidades = await getAllCidades();
		return res.status(200).send(cidades);
	}
	catch (err: any)
	{
		Logging.error(err.message);
		return res.status(409).send(err.message);
	}
}

export async function deleteCidadeHandler(req: Request, res: Response)
{
	try
	{
		const cidade = await deleteCidade(req.query.id);
		return res.status(204).send(cidade);
	}
	catch (err: any)
	{
		Logging.error(err.message);
		return res.status(409).send(err.message);
	}
}

export async function updateCidadeHandler(req: Request<{}, {}, CreateCidadeSchema['body']>, res: Response)
{
	try
	{
		const cidade = await updateCidade(req.body);
		return res.status(201).send(cidade);
	}
	catch (err: any)
	{
		Logging.error(err.message);
		return res.status(409).send(err.message);
	}
}

export async function findCidadeByIBGEHandler(req: Request, res: Response)
{
	try
	{
		const cidade = await getCidadeByIBGE(req.query.ibge);
		return res.status(200).send(cidade);
	}
	catch (err: any)
	{
		Logging.error(err.message);
		return res.status(409).send(err.message);
	}
}
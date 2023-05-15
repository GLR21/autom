import { Request, Response } from 'express';
import Logging from "../util/Logging";
import { getPeca, getPecas } from "../service/Peca.service";

// import { createCidade, deleteCidade, getAllCidades, getCidade, updateCidade } from "../service/Cidade.service";
// import { CreateCidadeSchema } from '../schema/Cidade.schema';

// TODO
// export async function createPecaHandler(req: Request<{}, {}, CreatePecaSchema['body']>, res: Response)
// {
// 	try
// 	{
// 		const peca = await createPeca(req.body);
// 		return res.status(201).send(peca);
// 	}
// 	catch (err: any)
// 	{
// 		Logging.error(err.message);
// 		return res.status(409).send(err.message);
// 	}
// }

export async function getPecaHandler(req: Request, res: Response)
{
	try
	{
		const peca = await getPeca(req.query.id);
		return res.status(200).send(peca);
	}
	catch (err: any)
	{
		Logging.error(err.message);
		return res.status(409).send(err.message);
	}
}

export async function getPecasHandler(req: Request, res: Response)
{
	try
	{
		const pecas = await getPecas();
		return res.status(200).send(pecas);
	}
	catch (err: any)
	{
		Logging.error(err.message);
		return res.status(409).send(err.message);
	}
}

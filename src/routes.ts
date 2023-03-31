import { Express, Request, Response } from "express";
import { createPessoaHandler } from "./controller/Pessoa.controller";
import validate from "./middleware/resourceValidator";
import { createPessoaSchema } from "./schema/Pessoa.schema";
function routes ( app: Express )
{
	app.get
	( 
		'/app',
		( req: Request, res: Response ) => 
		res.sendStatus( 200 )
	);

	app.post('/app/pessoa', validate( createPessoaSchema ), createPessoaHandler);
}

export default routes;
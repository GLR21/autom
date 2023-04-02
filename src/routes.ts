import { Express, Request, Response } from "express";
import { createPessoaHandler, deletePessoaHandler, getAllPessoaHandler, getPessoaHandler, updatePessoaHandler } from "./controller/Pessoa.controller";
import validate from "./middleware/resourceValidator";
import { createPessoaSchema, updatePessoaSchema } from "./schema/Pessoa.schema";
function routes ( app: Express )
{
	app.get
	( 
		'/app',
		( req: Request, res: Response ) => 
		res.sendStatus( 200 )
	);

	app.get( '/app/getpessoa' , getPessoaHandler   );
	app.get( '/app/getpessoas', getAllPessoaHandler);
	app.post('/app/createpessoa' , validate( createPessoaSchema ), createPessoaHandler );
	app.put( '/app/updatepessoa' , validate( updatePessoaSchema ), updatePessoaHandler );
	app.delete( '/app/deletepessoa', deletePessoaHandler );
	
}

export default routes;
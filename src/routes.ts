import validate from "./middleware/resourceValidator";
import { Express, Request, Response } from "express";
import { createPessoaHandler, deletePessoaHandler, getAllPessoaHandler, getPessoaHandler, updatePessoaHandler } from "./controller/Pessoa.controller";
import { createPessoaSchema, updatePessoaSchema } from "./schema/Pessoa.schema";
import { createEstadoSchema } from "./schema/Estado.schema";
import { createEstadoHandler, deleteEstadoHandler, getAllEstadoHandler, getEstadoHandler, updateEstadoHandler } from "./controller/Estado.controller";
import { createCidadeSchema } from "./schema/Cidade.schema";
import { createCidadeHandler, getCidadeHandler, getAllCidadeHandler, updateCidadeHandler, deleteCidadeHandler } from "./controller/Cidade.controller";

function routes ( app: Express )
{
	app.get
	( 
		'/app',
		( req: Request, res: Response ) => 
		res.sendStatus( 200 )
	);

	app.get( 	'/app/getpessoa' 	, getPessoaHandler   );
	app.get( 	'/app/getpessoas'	, getAllPessoaHandler);
	app.post(	'/app/createpessoa' , validate( createPessoaSchema ), createPessoaHandler );
	app.put( 	'/app/updatepessoa' , validate( updatePessoaSchema ), updatePessoaHandler );
	app.delete( '/app/deletepessoa'	, deletePessoaHandler );

	app.get( 	'/app/getestado'    , getEstadoHandler   );
	app.get( 	'/app/getestados'   , getAllEstadoHandler   );
	app.post(	'/app/createestado' , validate( createEstadoSchema ), createEstadoHandler );
	app.put( 	'/app/updateestado' , validate( createEstadoSchema ), updateEstadoHandler );
	app.delete( '/app/deleteestado'	, deleteEstadoHandler );

	app.get( 	'/app/getcidade'    , getCidadeHandler   );
	app.get( 	'/app/getcidades'   , getAllCidadeHandler   );
	app.post(	'/app/createcidade' , validate( createCidadeSchema ), createCidadeHandler );
	app.put( 	'/app/updatecidade' , validate( createCidadeSchema ), updateCidadeHandler );
	app.delete( '/app/deletecidade'	, deleteCidadeHandler );
	
}

export default routes;
import validate from "./middleware/resourceValidator";
import { Express, Request, Response } from "express";

import { createPessoaSchema, updatePessoaSchema, loginPessoaSchema } from "./schema/Pessoa.schema";
import { createPessoaHandler, deletePessoaHandler, getAllPessoaHandler, getPessoaHandler, updatePessoaHandler } from "./controller/Pessoa.controller";

import { createEstadoSchema } from "./schema/Estado.schema";
import { createEstadoHandler, deleteEstadoHandler, getAllEstadoHandler, getEstadoHandler, updateEstadoHandler } from "./controller/Estado.controller";

import { createCidadeSchema } from "./schema/Cidade.schema";
import { createCidadeHandler, getCidadeHandler, getAllCidadeHandler, updateCidadeHandler, deleteCidadeHandler, findCidadeByIBGEHandler } from "./controller/Cidade.controller";

// import { createPecaSchema } from "./schema/Peca.schema";
import { getPecaHandler, getPecasHandler } from "./controller/Peca.controller";

import { createPedidoSchema, updatePedidoSchema } from "./schema/Pedido.schema";
import { cancelPedidoHandler, concludePedidoHandler, createPedidoHandler, exportPedidoASCSVHandler, getAllPedidoHandler, getPedidoHandler, getQuantidadePedidosPorPessoaHandler, openPedidoHandler, updatePedidoHandler } from "./controller/Pedido.controller";

import { generateReportHandler } from "./reports/ReportsController";

import { loginPessoaHandler, refreshTokenHandler, logoutPessoaHandler } from "./controller/Auth.controller";
import { validateJWT } from "./middleware/validateJWT";
import cookieParser from "cookie-parser";


function routes ( app: Express )
{
	app.get
	( 
		'/app',
		( req: Request, res: Response ) => 
		res.sendStatus( 200 )
	);
	
	app.use( cookieParser() );

	app.post( '/app/login' , validate( loginPessoaSchema ), loginPessoaHandler  );
	app.get( '/app/refresh', refreshTokenHandler );
	app.get( '/app/logout' , logoutPessoaHandler );

	app.use( validateJWT );

	// Pessoa
	app.get( 	'/app/getpessoa' 	, getPessoaHandler   );
	app.get( 	'/app/getpessoas'	, getAllPessoaHandler);
	app.post(	'/app/createpessoa' , validate( createPessoaSchema ), createPessoaHandler );
	app.put( 	'/app/updatepessoa' , validate( updatePessoaSchema ), updatePessoaHandler );
	app.delete( '/app/deletepessoa'	, deletePessoaHandler );

	// Estado
	app.get( 	'/app/getestado'    , getEstadoHandler   );
	app.get( 	'/app/getestados'   , getAllEstadoHandler   );
	app.post(	'/app/createestado' , validate( createEstadoSchema ), createEstadoHandler );
	app.put( 	'/app/updateestado' , validate( createEstadoSchema ), updateEstadoHandler );
	app.delete( '/app/deleteestado'	, deleteEstadoHandler );

	// Cidade
	app.get( 	'/app/getcidade'    , getCidadeHandler   );
	app.get( 	'/app/getcidades'   , getAllCidadeHandler   );
	app.get( 	'/app/getcidadebyibge', findCidadeByIBGEHandler  )
	app.post(	'/app/createcidade' , validate( createCidadeSchema ), createCidadeHandler );
	app.put( 	'/app/updatecidade' , validate( createCidadeSchema ), updateCidadeHandler );
	app.delete( '/app/deletecidade'	, deleteCidadeHandler );

	// Peca TODO - Implementar RESTANTE DAS ROTAS
	app.get( '/app/getpeca', getPecaHandler );
	app.get( '/app/getpecas', getPecasHandler );

	app.post( '/app/createpedido', validate( createPedidoSchema ), createPedidoHandler );
	app.put(  '/app/updatepedido', validate( updatePedidoSchema ), updatePedidoHandler );
	app.put(  '/app/concludepedido', concludePedidoHandler );
	app.put(  '/app/cancelpedido', cancelPedidoHandler );
	app.put(  '/app/openpedido', openPedidoHandler );
	app.get(  '/app/getpedido', getPedidoHandler );
	app.get(  '/app/getpedidos', getAllPedidoHandler );
	app.get(  '/app/getpedidoscsv', exportPedidoASCSVHandler )
	app.get(  '/app/getquantidadepedidosbypessoa', getQuantidadePedidosPorPessoaHandler )

	


	app.post( '/app/reports', generateReportHandler )
	
}

export default routes;
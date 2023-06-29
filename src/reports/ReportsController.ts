import { RelatorioPecas } from "./RelatorioPecas";
import { RelatorioPedidos } from "./RelatorioPedidos";
import { Request, Response } from 'express';
import {getReportSchema} from '../schema/Report.schema';
import Logging from '../util/Logging';

const RELATORIO_PECAS = 'RelatorioPecas';
const RELATORIO_PEDIDOS = 'RelatorioPedidos';

export async function generateReportHandler( req:Request, res:Response )
{
	try
	{
		let report;
		let relatorio;


		console.log( req.body );

		switch( req.body.ref_report )
		{
			case RELATORIO_PECAS:
				relatorio = new RelatorioPecas();		
				report = await relatorio.build( req.body );
			break;
			case RELATORIO_PEDIDOS:
				relatorio = new RelatorioPedidos();
				report = await relatorio.build( req.body );
			break;
		}

		return res.status( 200 ).send( report );
	}
	catch ( err: any )
	{
		Logging.error( err.message );
		return res.status( 409 ).send( err.message );
	}
}
import { Request, Response } from 'express';
import Logging from '../util/Logging';
import { cancelPedido, concludePedido, createPedido, getAllPedidos, getPedido } from '../service/Pedido.service';
import { CreatePedidoSchema } from '../schema/Pedido.schema';


export async function createPedidoHandler ( req:Request<{},{},CreatePedidoSchema['body']>, res:Response )
{
	try
	{
		const pedido = await createPedido( req.body );
		return res.status( 201 ).json( pedido );
	}
	catch (e:any)
	{
		Logging.error( e );
		return res.status( 400 ).json( { error: e.message } );
	}
}

export async function getPedidoHandler( req:Request, res:Response )
{
	try
	{
		const pedido = await getPedido( req.query.id );
		return res.status( 200 ).send( pedido );
	}
	catch ( err: any )
	{
		Logging.error( err.message );
		return res.status( 409 ).send( err.message );
	}
}

export async function getAllPedidoHandler( req:Request, res:Response )
{
	try
	{
		const pedidos = await getAllPedidos();
		return res.status( 200 ).send( pedidos );
	}
	catch ( err: any )
	{
		Logging.error( err.message );
		return res.status( 409 ).send( err.message );
	}
}

export async function concludePedidoHandler( req:Request, res:Response )
{
	try
	{
		const pedido = await concludePedido( req.query.id );
		return res.status( 200 ).send( pedido );
	}
	catch ( err: any )
	{
		Logging.error( err.message );
		return res.status( 409 ).send( err.message );
	}
}

export async function cancelPedidoHandler( req:Request, res:Response )
{
	try
	{
		const pedido = await cancelPedido( req.query.id );
		return res.status( 200 ).send( pedido );
	}
	catch ( err: any )
	{
		Logging.error( err.message );
		return res.status( 409 ).send( err.message );
	}
}

import { Request, Response } from 'express';
import Logging from '../util/Logging';
import { createEstado, deleteEstado, getAllEstados, getEstado, updateEstado } from '../service/Estado.service';
import { CreateEstadoSchema } from '../schema/Estado.schema';

export async function createEstadoHandler( req:Request<{},{},CreateEstadoSchema['body']>, res:Response )
{
	try
	{
		const estado = await createEstado( req.body );
		return res.status( 201 ).send( estado );
	}
	catch ( err: any )
	{
		Logging.error( err.message );
		return res.status( 409 ).send( err.message );
	}
}

export async function getEstadoHandler( req:Request, res:Response )
{
	try
	{
		const estado = await getEstado( req.query.id ); 
		return res.status( 200 ).send( estado );
	}
	catch ( err: any )
	{
		Logging.error( err.message );
		return res.status( 409 ).send( err.message );
	}
}

export async function getAllEstadoHandler( req:Request, res:Response )
{
	try
	{
		const estados = await getAllEstados();
		return res.status( 200 ).send( estados );
	}
	catch ( err: any )
	{
		Logging.error( err.message );
		return res.status( 409 ).send( err.message );
	}
}

export async function deleteEstadoHandler( req:Request, res:Response )
{
	try
	{
		const estado = await deleteEstado( req.query.id );
		return res.status( 204 ).send( estado );
	}
	catch ( err: any )
	{
		Logging.error( err.message );
		return res.status( 409 ).send( err.message );
	}
}

export async function updateEstadoHandler( req:Request<{},{},CreateEstadoSchema['body']>, res:Response )
{
	try
	{
		const estado = await updateEstado( req.body );
		return res.status( 200 ).send( estado );
	}
	catch ( err: any )
	{
		Logging.error( err.message );
		return res.status( 409 ).send( err.message );
	}
}
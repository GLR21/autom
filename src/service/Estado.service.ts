import { Estado } from "../interfaces/Estado.model";
import { EstadoTransaction } from "../model/EstadoTransaction";


export async function createEstado( input:Estado )
{
	try
	{
		let estadoTransaction = new EstadoTransaction();
		let estado = await estadoTransaction.store( input );
		return estado;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}

export async function getEstado( id:any )
{
	try
	{
		let estadoTransaction = new EstadoTransaction();
		let estado = await estadoTransaction.get( id );
		return estado;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}

export async function getAllEstados()
{
	try
	{
		let estadoTransaction = new EstadoTransaction();
		let estados = await estadoTransaction.getAll();
		return estados;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}

export async function deleteEstado( id:any )
{
	try
	{
		let estadoTransaction = new EstadoTransaction();
		let estado = await estadoTransaction.delete( id );
		return estado;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}

export async function updateEstado( input:Estado )
{
	try
	{
		let estadoTransaction = new EstadoTransaction();
		let estado = await estadoTransaction.update( input );
		return estado;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}
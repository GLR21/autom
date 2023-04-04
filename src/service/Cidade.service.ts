import { Cidade } from "../interfaces/Cidade.model";
import { CidadeTransaction } from "../model/CidadeTransaction";

export async function createCidade( input:Cidade )
{
	try
	{
		let cidadeTransaction = new CidadeTransaction();
		let cidade = await cidadeTransaction.store( input );
		return cidade;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}

export async function getCidade( id:any )
{
	try
	{
		let cidadeTransaction = new CidadeTransaction();
		let cidade = await cidadeTransaction.get( id );
		return cidade;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}

export async function getAllCidades()
{
	try
	{
		let cidadeTransaction = new CidadeTransaction();
		let cidades = await cidadeTransaction.getAll();
		return cidades;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}

export async function deleteCidade( id:any )
{
	try
	{
		let cidadeTransaction = new CidadeTransaction();
		let cidade = await cidadeTransaction.delete( id );
		return cidade;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}

export async function updateCidade( input:Cidade )
{
	try
	{
		let cidadeTransaction = new CidadeTransaction();
		let cidade = await cidadeTransaction.update( input );
		return cidade;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}
// import { Peca } from "../interfaces/Peca.model";
import { PecasTransaction } from "../model/PecasTransaction";

// TODO
// export async function createPeca( input:Peca )
// {
// 	try
// 	{
// 		let pecasTransaction = new PecasTransaction();
// 		let peca = await pecasTransaction.store( input );
// 		return peca;
// 	}
// 	catch (e:any)
// 	{
// 		throw new Error(e);
// 	}
// }

export async function getPeca( id:any )
{
	try
	{
		let pecasTransaction = new PecasTransaction();
		let peca = await pecasTransaction.get( id );
		return peca;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}

export async function getPecas()
{
	try
	{
		let pecasTransaction = new PecasTransaction();
		let pecas = await pecasTransaction.getAll();
		return pecas;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}
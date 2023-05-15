import { Pedido } from "../interfaces/Pedido.model";
import { PedidosTransaction } from "../model/PedidosTransaction";

export async function createPedido( input:Pedido )
{
	try
	{
		let pedidosTransaction = new PedidosTransaction();
		let pedido = await pedidosTransaction.store( input );
		return pedido;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}

export async function getPedido( id:any )
{
	try
	{
		let pedidosTransaction = new PedidosTransaction();
		let pedido = await pedidosTransaction.get( id );
		return pedido;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}

export async function getAllPedidos()
{
	try
	{
		let pedidosTransaction = new PedidosTransaction();
		let pedidos = await pedidosTransaction.getAll();
		return pedidos;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}

export async function concludePedido( id:any )
{
	try
	{
		let pedidosTransaction = new PedidosTransaction();
		let pedido = await pedidosTransaction.conclude( id );
		return pedido;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}

export async function cancelPedido( id:any )
{
	try
	{
		let pedidosTransaction = new PedidosTransaction();
		let pedido = await pedidosTransaction.cancel( id );
		return pedido;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}
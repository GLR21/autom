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

export async function getAllPedidos( param:any )
{
	try
	{
		let pedidosTransaction = new PedidosTransaction();
		let pedidos = await pedidosTransaction.getAll( param );
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

export async function openPedido( id:any )
{
	try
	{
		let pedidosTransaction = new PedidosTransaction();
		let pedido = await pedidosTransaction.open( id );
		return pedido;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}

export async function updatePedido( input:Pedido )
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

export async function exportPedidoASCSV( param:any )
{
	try
	{
		let pedidosTransaction = new PedidosTransaction();
		let pedido = await pedidosTransaction.exportPedidoASCSV( param );
		return pedido;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}

export async function getQuantidadePedidosPorPessoa( param?:any )
{
	try
	{
		let pedidosTransaction = new PedidosTransaction();
		let pedido = await pedidosTransaction.getQuantidadePedidosPorPessoa( param );
		return pedido;
	}
	catch (e:any)
	{
		throw new Error(e);
	}
}
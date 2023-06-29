import { Transaction } from "./interface/Transaction";
import { Pedido } from "../interfaces/Pedido.model";
import { PecasPedidos } from "../objects/PecasPedidos";

class PedidosTransaction 
	extends
		Transaction
			implements
				TransactionInterface<Pedido>
{
	constructor()
	{
		super();
	}

	async store(parameter: Pedido)
	{
		var insert = `
			Insert into
				pm_pedidos
					( 
						total,
						status,
						cep,
						rua,
						bairro,
						numero_endereco,
						ref_cidade,
						fl_usar_endereco_cliente
					)
				values
					(
						`
							+ parameter.total + `,` 
						 	+ parameter.status + `,`
							+ ( typeof parameter.cep 				== 'undefined' ? null : `'${ parameter.cep }'` ) + `,`
							+ ( typeof parameter.rua 				== 'undefined' ? null : `'${ parameter.rua }'` ) + `,`
							+ ( typeof parameter.bairro 			== 'undefined' ? null : `'${ parameter.bairro }'` ) + `,`
							+ ( typeof parameter.numero_endereco 	== 'undefined' ? null : `'${ parameter.numero_endereco }'` ) + `,`
							+ ( typeof parameter.ref_cidade 		== 'undefined' ? null : parameter.ref_cidade ) + `,`
							+ parameter.fl_usar_endereco_cliente + `
					)
			RETURNING id`;

		let update = false;

		if( typeof parameter.id != 'undefined' )
		{
			update = true;
			insert = `
				UPDATE
					pm_pedidos set
						total 			 = ` + parameter.total  + `,` +
					    `status 		 = ${ parameter.status }, ` +
						`cep 			 =` + ( typeof parameter.cep 				== 'undefined' ? null : `'${ parameter.cep }'` ) + `,` +
						`rua 			 =` + ( typeof parameter.rua 				== 'undefined' ? null : `'${ parameter.rua }'` ) + `,` +
						`bairro 		 =` + ( typeof parameter.bairro 			== 'undefined' ? null : `'${ parameter.bairro }'` ) + `,` +
						`numero_endereco =` + ( typeof parameter.numero_endereco 	== 'undefined' ? null : `'${ parameter.numero_endereco }'` ) + `,` +
						`ref_cidade      =` + ( typeof parameter.ref_cidade 		== 'undefined' ? null : parameter.ref_cidade ) + `,` +
						`fl_usar_endereco_cliente = ${ parameter.fl_usar_endereco_cliente }
					where id = ${ parameter.id }`;
		}
		
		return await super.query( insert ).then
		(
			async ( res )=>
			{

				if( !update )
				{
					parameter.id = res.rows[0].id;
				} 

				if( update )
				{
					await super.query( `DELETE FROM pm_pedidos_pecas where ref_pedido = ${ parameter.id }` );
				}

				parameter.pecasPedido.forEach
				(
					async peca=>
					{
						await super.query( `insert into pm_pedidos_pecas ( ref_pedido, ref_peca, quantidade ) values ( ${ parameter.id }, ${ peca.ref_peca }, ${ peca.quantidade } )` );
					}
				)
				
				if( !update )
				{
					await super.query( ` insert into pm_pedidos_pessoa ( ref_pessoa, ref_pedido ) values ( ${ parameter.ref_pessoa }, ${ parameter.id } )  ` );
				}

				return true;
			}
		);

	}
	async delete(parameter: any)
	{
		return await Promise.all
		( 
			[
				await super.query( `DELETE from pm_pedidos_pecas where ref_pedido = ${ parameter }` ),
				await super.query( `DELETE from pm_pedidos_pessoa where ref_pedido = ${ parameter }` ),
				await super.query( `DELETE from pm_pedidos where id = ${ parameter }` ),
			]
		)
		.then
		( 
			()=>
			{
				return true;
			} 
		)
		.catch
		( 
			( e )=>
			{
				console.log( e );
				return false;
			} 
		);
	}

	async get(parameter: any)
	{
		return await super.query( `SELECT * from pm_pedidos where id = ${ parameter }` )
		.then
		(
			async( res )=>
			{
				return await Promise.all( res.rows.map( async( pedidoReturn )=>
				{
					let pedido =
					{
						id: pedidoReturn.id,
						ref_pessoa: 0,
						total: pedidoReturn.total,
						pecasPedido: new Array() ,
						status: pedidoReturn.status,
						dt_abertura: pedidoReturn.dt_abertura,
						dt_encerramento: pedidoReturn.dt_encerramento,
						dt_reabertura: pedidoReturn.dt_reabertura,
						dt_cancelamento: pedidoReturn.dt_cancelamento,
						cep: pedidoReturn.cep,
						rua: pedidoReturn.rua,
						bairro: pedidoReturn.bairro,
						numero_endereco: pedidoReturn.numero_endereco,
						ref_cidade: pedidoReturn.ref_cidade,
						fl_usar_endereco_cliente: pedidoReturn.fl_usar_endereco_cliente
					};

					let pecas = await super.query( `SELECT * from pm_pedidos_pecas where ref_pedido = ${ pedidoReturn.id }` );

					pecas.rows.forEach
					(
						element => 
						{
							pedido.pecasPedido.push( new PecasPedidos( element.ref_peca, element.quantidade ) );
						}
					);

					let ref_pessoa = await super.query( `select ref_pessoa from pm_pedidos_pessoa where ref_pedido = ${ pedido.id }` );

					pedido.ref_pessoa = ref_pessoa.rows[0].ref_pessoa;
					return pedido;
				} ) );
			}
		);
	}

	public async getAll( param?:any|null )
	{
		let queryString = 'SELECT * from pm_pedidos';

		if( param != null && typeof param != 'undefined' && Object.keys( param ).length > 0 )
		{
			queryString += ' where';

			for( const key in param )
			{
				// ignora o ref_pessoa pois não é um campo da tabela pm_pedidos e sim da tabela pm_pedidos_pessoa
				if
				( 
					typeof param[key] == 'undefined' 							||
					param[key] == null 											||
					param[key] == '' 											||
					key == 'ref_pessoa' 										||
					key == 'ref_peca'	 										||
					( key == 'status' && param[key] == 0 ) 						||
					( key == 'fl_usar_endereco_cliente' && param[key] == '' ) 	||
					key.includes( 'dt' )
				) 
				{
					continue;
				}

				switch( key )
				{
					case 'cep':
					case 'rua':
					case 'bairro':
						queryString += ` ${ key } ILIKE '%${ param[key] }%' and`;
					break;
					case 'fl_usar_endereco_cliente':
						queryString += ` ${ key } = ${ ( param[key] == '1' ) } and`;
					break;
					default:
						queryString += ` ${ key } = ${ param[key] } and`;
					break;
				}
			}

			if( param.hasOwnProperty( 'dt_abertura_inicial' ) && param.hasOwnProperty( 'dt_abertura_final' ) && param.dt_abertura_inicial != '' && param.dt_abertura_final != '' )
			{
				if( !queryString.endsWith( 'and' ) )
				{
					queryString += ` dt_abertura between '${ param.dt_abertura_inicial }' and '${ param.dt_abertura_final }' `;
				}
				else
				{
					queryString += ` dt_abertura between '${ param.dt_abertura_inicial }' and '${ param.dt_abertura_final }' and`;
				}
			}

			if( param.hasOwnProperty( 'dt_encerramento_inicial' ) && param.hasOwnProperty( 'dt_encerramento_final' ) && param.dt_encerramento_inicial != '' && param.dt_encerramento_final != '' )
			{
				if( !queryString.endsWith( 'and' ) )
				{
					queryString += ` dt_encerramento between '${ param.dt_encerramento_inicial }' and '${ param.dt_encerramento_final }' `;
				}
				else
				{
					queryString += ` dt_encerramento between '${ param.dt_encerramento_inicial }' and '${ param.dt_encerramento_final }' and`;
				}
			}

			if( param.hasOwnProperty( 'dt_cancelamento_inicial' ) && param.hasOwnProperty( 'dt_cancelamento_final' ) && param.dt_cancelamento_inicial != '' && param.dt_cancelamento_final != '' )
			{
				if( !queryString.endsWith( 'and' ) )
				{
					queryString += ` dt_cancelamento between '${ param.dt_cancelamento_inicial }' and '${ param.dt_cancelamento_final }' `;
				}
				else
				{
					queryString += ` dt_cancelamento between '${ param.dt_cancelamento_inicial }' and '${ param.dt_cancelamento_final }' and`;
				}
			}


			// remove o ultimo and
			if( queryString.endsWith( 'and' ) )
			{
				queryString = queryString.substring( 0, queryString.length - 4 );
			}

			if( queryString.endsWith( 'where' ) )
			{
				queryString = queryString.substring( 0, queryString.length - 6 );
			}
		}
		return await super.query( queryString+' ORDER BY id DESC;' )
		.then
		(
			async( res )=>
			{
				let pedidos = new Array();
				await Promise.all( res.rows.map( async( pedidoObj )=>
				{
					let pedido = {
									id: pedidoObj.id,
									ref_pessoa: 0,
									total: pedidoObj.total,
									pecasPedido: new Array(),
									status: pedidoObj.status,
									dt_abertura: pedidoObj.dt_abertura,
									dt_encerramento: pedidoObj.dt_encerramento,
									dt_reabertura: pedidoObj.dt_reabertura,
									dt_cancelamento: pedidoObj.dt_cancelamento,
									cep: pedidoObj.cep,
									rua: pedidoObj.rua,
									bairro: pedidoObj.bairro,
									numero_endereco: pedidoObj.numero_endereco,
									ref_cidade: pedidoObj.ref_cidade,
									fl_usar_endereco_cliente: pedidoObj.fl_usar_endereco_cliente
								 };

					let query_pessoa = `SELECT ref_pessoa from pm_pedidos_pessoa where ref_pedido = ${pedido.id}`;
					let query_peca   = `SELECT ref_peca, quantidade from pm_pedidos_pecas where ref_pedido = ${pedido.id}`;

					let id_pessoa;
					let pm_pedidos_pecas;

					if( param != null && typeof param != 'undefined' && Object.keys( param ).length > 0 )
					{
						if( param.hasOwnProperty('ref_pessoa') && param.ref_pessoa != null && param.ref_pessoa != '' && param.ref_pessoa != 0 )
						{
							if( typeof param.ref_pessoa != 'undefined' && param.ref_pessoa != null )
							{
								query_pessoa+= ` AND ref_pessoa = ${ param.ref_pessoa }`;
							}
						}
						
						if( param.hasOwnProperty( 'ref_peca' ) && param.ref_peca != null )
						{
							if( typeof param.ref_peca != 'undefined' && param.ref_peca != null && param.ref_peca != '' && param.ref_peca != 0 )
							{
								query_peca+= ` AND ref_peca = ${ param.ref_peca }`
							}
						}
					}

					pm_pedidos_pecas = await super.query( query_peca );
					id_pessoa = await super.query( query_pessoa );

					if( id_pessoa.rows.length > 0 && pm_pedidos_pecas.rows.length > 0  )
					{
						pm_pedidos_pecas.rows.forEach
						(
							element => 
							{
								pedido.pecasPedido.push( new PecasPedidos( element.ref_peca, element.quantidade ) );
							}
						);
							
						pedido.ref_pessoa = id_pessoa.rows[0].ref_pessoa;
		
						pedidos.push( pedido );
					}

				} ) );
				return pedidos;
			}
		);
	}

	async conclude( param:any )
	{
		return await super.query( `UPDATE pm_pedidos set status = 3, dt_cancelamento = null, dt_encerramento = date(now())  where id = ${ param }` )
		.then
		( 
			()=>
			{ 
				return true; 
			} 
		)
		.catch
		( 
			( e )=>
			{
				console.log( e );
				return false;
			} 
		);
	}

	async cancel( param:any )
	{
		return await super.query( `UPDATE pm_pedidos set status = 1, dt_cancelamento = date(now()) where id = ${ param }` )
		.then
		( 
			()=>
			{ 
				return true; 
			} 
		)
		.catch
		( 
			( e )=>
			{
				console.log( e );
				return false;
			} 
		);
	}

	async open ( param:any )
	{
		return await super.query( `UPDATE pm_pedidos set status = 2,dt_reabertura = date(now()), dt_cancelamento = null, dt_encerramento = null where id = ${ param }` )
		.then
		(
			()=>
			{
				return true;
			}
		)
		.catch
		(
			( e )=>
			{
				console.log( e );
				return false;
			}
		);
	}

	async exportPedidoASCSV( param:any )
	{
		let query = 
			`SELECT
				pm_pedidos.id as "Código pedido",
				TO_CHAR( pm_pedidos.total, 'L999G999D99' ) as "Total",
				(
					CASE
						WHEN pm_pedidos.status = 1 THEN 'Concluído'
						WHEN pm_pedidos.status = 2 THEN 'Pendente'
						WHEN pm_pedidos.status = 3 THEN 'Cancelado'
					END
				) AS "Estado do pedido",
				COALESCE(  TO_CHAR(  pm_pedidos.dt_abertura, 'DD/MM/YYYY' ), '' ) AS "Data de abertura",
				COALESCE(  TO_CHAR( pm_pedidos.dt_encerramento, 'DD/MM/YYYY' ), '' ) AS "Data de conclusão",
				COALESCE(  TO_CHAR( pm_pedidos.dt_cancelamento, 'DD/MM/YYYY' ) , '' ) AS "Data de cancelamento",
				COALESCE(  TO_CHAR( pm_pedidos.dt_reabertura, 'DD/MM/YYYY' ) , '' ) AS "Data de reabertura",
				pm_pedidos.cep AS "CEP",
				pm_pedidos.rua AS "Rua",
				pm_pedidos.bairro AS "Bairro",
				pm_pedidos.numero_endereco AS "Número do endereço",
				pm_pedidos_pessoa.ref_pessoa AS "Código do cliente",
				pm_pessoa.nome AS "Nome do cliente",
				pm_pedidos_pecas.ref_peca AS "Código do produto",
				pm_pecas.nome AS "Descrição do produto",
				TO_CHAR( pm_pecas.valor_revenda, 'L999G999D99') AS "Valor unitário do produto"
			FROM
				pm_pedidos,
				pm_pedidos_pessoa,
				pm_pessoa,
				pm_pedidos_pecas,
				pm_pecas
			WHERE
				pm_pedidos.id = pm_pedidos_pessoa.ref_pedido
				AND pm_pedidos_pessoa.ref_pessoa = pm_pessoa.id
				AND pm_pedidos_pecas.ref_pedido  = pm_pedidos.id
				AND pm_pedidos_pecas.ref_peca = pm_pecas.id `;

		if( param != null && typeof param != 'undefined' && Object.keys( param ).length > 0 )
		{

			for( const key in param )
			{
				if( typeof param[key] == 'undefined' || param[key] == null || param[key] == '' || ( key == 'status' && param[key] == 0 )  || ( key == 'ref_pessoa' && param[key] == 0 ) )
				{
					continue;
				}

				switch( key )
				{
					case 'ref_pessoa':
						query += `AND pm_pedidos_pessoa.${ key } = ${ param[key] } and `;
					break;
					case 'rua':
					case 'bairro':
					case 'cep':
					case 'numero_endereco':
						query += `AND pm_pedidos.${ key } ILIKE '%${ param[key] }%' and `;
					default:
						query += `AND pm_pedidos.${ key } = ${ param[key] } and `;
				}
			}
			query = query.substring( 0, query.length - 4 );
		}
		query += ` ORDER BY pm_pedidos.id DESC, pm_pedidos_pecas.ref_peca DESC;`;
		let returnRows = await super.query( query );
		return returnRows.rows;
	}

	async getQuantidadePedidosPorPessoa( param?:any )
	{
		let query = 'Select pm_pessoa.nome as "nome_pessoa" ,count( ref_pedido ) as "quantidade_pedidos" from pm_pedidos_pessoa, pm_pessoa where pm_pedidos_pessoa.ref_pessoa = pm_pessoa.id group by 1 order by 2 ASC;'

		let returnRows = await super.query( query );

		return returnRows.rows;
	}
}


export { PedidosTransaction };
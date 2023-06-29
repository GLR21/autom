
export interface Pessoa
{
    id?: number|undefined;
    nome: string;
    email: string;
    senha?: string|undefined;
    telefone: string;
    sys_auth?: Number|undefined;
    cep:string;
    rua:string;
    bairro:string;
    numero_endereco:string;
    ref_cidade:Number;
    tipo_pessoa?:Number|undefined;
    complemento?:string|undefined;

}

export interface PessoaLogin
{
    email: string;
    senha: string;
}

export interface Pessoa
{
    id?: number|undefined;
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    sys_auth?: Number|undefined;
    cep:string;
    rua:string;
    bairro:string;
    numero_endereco:Number;
    ref_cidade:Number;
    tipo_pessoa?:Number|undefined;

}
export class UpdateClientDto {
  readonly razaoSocial: string;
  readonly cnpj: string;
  readonly nomeFantasia: string;
  readonly tags: string[];
  readonly status: 'Ativo' | 'Inativo';
  readonly conectaPlus: 'Sim' | 'Não';
  readonly cep: string;
  readonly rua: string;
  readonly numero: string;
  readonly complemento: string;
  readonly bairro: string;
  readonly cidade: string;
  readonly estado: string;
  readonly userId?: string; 
}

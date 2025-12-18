export interface Membro {
  id: string;           
  nome: string;
  cpf: string;
  telefone: string;
  sexo: string;
  
  matricula?: string;
  modalidadeEnsino?: string;
  curso?: string;
  projetoVinculado: string[];
  tipoVinculo: string[];
  valorbolsa?: string;
  bancoPagamento?: string;
  agencia?: string;
  contaCorrente?: string;
  email: string;
  relatorio?: string[];

  cadastradoEm: string;
  editadoEm?: string;
}

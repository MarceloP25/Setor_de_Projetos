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
  
  nomeProjeto: string;
  relatorio?: object[];

  cadastradoEm: string;
  editadoEm?: string;
}

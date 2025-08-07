export interface Aluno {
  id: string;           
  nome: string;
  matricula: string;
  cpf: string;
  telefone: string;
  sexo: string;
  modalidadeEnsino: string;
  curso: string;
  proejtoVinculado: string[];
  tipoVinculo: string[];
  valorbolsa: string;
  bancoPagamento: string;
  agencia: string;
  contaCorrente: string;
  email: string;
  nomeProjeto: string;
  relatorio?: object[];
  cadastradoEm: string;
}
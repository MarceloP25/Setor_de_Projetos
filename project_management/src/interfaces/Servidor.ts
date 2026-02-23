export interface Servidor {
    id: string;
    nome: string;
    matricula: string;
    cpf: string;
    telefone?: string;

    departamento?: string;
    curso?: string;
    emailInstitucional: string;
    emailPessoal?: string;
    
    criadoEm: string;
    criadoPor?: string;
    alteradoEm?: string;
    alteradoPor?: string;
}
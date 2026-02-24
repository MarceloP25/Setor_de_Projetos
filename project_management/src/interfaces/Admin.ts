export interface Admin {
    id: string;
    nome: string;
    matricula: string;
    cpf: string;
    telefone?: string;

    departamento: string;
    emailInstitucional: string;
    
    criadoEm: string;
    alteradoEm?: string;
}

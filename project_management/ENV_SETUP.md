# Configuração de Variáveis de Ambiente

## Descrição

Este projeto utiliza variáveis de ambiente para proteger informações sensíveis como chaves de API do Firebase. O arquivo `.env` contém as configurações específicas do ambiente e **nunca deve ser commitado** ao repositório Git.

## Arquivos de Configuração

### `.env` (Ignorado pelo Git)
- Contém os valores reais das variáveis de ambiente
- **NÃO deve ser versionado** - está no `.gitignore`
- Cada desenvolvedor deve ter seu próprio arquivo `.env`
- **NUNCA compartilhe este arquivo** com outras pessoas ou repositórios públicos

### `.env.example` (Versionado)
- Template de exemplo com todas as variáveis necessárias
- Contém valores de placeholder `your_*_here`
- Serve como referência para novos desenvolvedores
- **DEVE ser commitado** ao repositório

## Como Configurar

1. **Primeira configuração:**
   ```bash
   cp .env.example .env
   ```

2. **Editar o arquivo `.env`:**
   - Abra o arquivo `.env`
   - Substitua cada `your_*_here` pelos valores reais do seu projeto Firebase
   - Salve o arquivo

3. **Verificar se está ignorado:**
   ```bash
   git status # O arquivo .env não deve aparecer na lista
   ```

## Variáveis Disponíveis

### Firebase Configuration
- `VITE_FIREBASE_API_KEY` - Chave da API do Firebase (chave privada)
- `VITE_FIREBASE_AUTH_DOMAIN` - Domínio de autenticação
- `VITE_FIREBASE_PROJECT_ID` - ID do projeto Firebase
- `VITE_FIREBASE_STORAGE_BUCKET` - Bucket de armazenamento
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - ID do remetente de mensagens
- `VITE_FIREBASE_APP_ID` - ID da aplicação
- `VITE_FIREBASE_MEASUREMENT_ID` - ID de medição (Analytics)

### Application Configuration
- `VITE_APP_NAME` - Nome da aplicação
- `VITE_ENVIRONMENT` - Ambiente (development, production, staging)

## Segurança

⚠️ **Importante:**
- ✅ Comitar `.env.example` 
- ❌ NUNCA comitar `.env`
- ❌ NUNCA compartilhar chaves privadas
- ✅ Adicionar novas variáveis ao `.env.example` quando necessário
- ✅ Informar a equipe quando novas variáveis forem adicionadas
- ✅ Usar diferentes valores para ambientes diferentes (dev, prod, etc)

## Troubleshooting

**Problema: "Variáveis de ambiente não carregadas"**
- Certifique-se de que o arquivo `.env` existe no diretório raiz do projeto
- Reinicie o servidor de desenvolvimento (Ctrl+C e `npm run dev`)
- Prefixe as variáveis com `VITE_` para o Vite reconhecê-las

**Problema: "Tipo não definido para import.meta.env"**
- Certifique-se de que `vite-env.d.ts` existe e contém as definições de tipo corretas

## Referências

- [Documentação do Vite - Variáveis de Ambiente](https://vitejs.dev/guide/env-and-mode.html)
- [Documentação do Firebase](https://firebase.google.com/docs)

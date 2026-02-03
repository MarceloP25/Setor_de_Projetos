#!/bin/bash

# Setup Script para Configurar Variáveis de Ambiente
# Execute este script ao configurar o projeto pela primeira vez

echo "🔐 Configurando variáveis de ambiente..."
echo ""

# Verificar se .env existe
if [ -f .env ]; then
    echo "✅ Arquivo .env já existe"
else
    echo "📋 Copiando .env.example para .env..."
    cp .env.example .env
    echo "✅ Arquivo .env criado"
    echo ""
    echo "⚠️  IMPORTANTE: Edite o arquivo .env com os valores reais do seu projeto Firebase"
    echo "   Arquivo criado em: $(pwd)/.env"
fi

echo ""
echo "✅ Setup concluído!"
echo ""
echo "Próximos passos:"
echo "1. Edite o arquivo .env com as suas credenciais do Firebase"
echo "2. Execute: npm install"
echo "3. Execute: npm run dev"
echo ""
echo "Para mais informações, consulte: ENV_SETUP.md"

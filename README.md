# Job - Aplicativo de Busca de Emprego

## 📱 Sobre o Projeto

O Job é um aplicativo mobile desenvolvido para simplificar e tornar mais eficiente o processo de busca de emprego e recrutamento. O aplicativo conecta candidatos a oportunidades de trabalho, oferecendo uma experiência personalizada e intuitiva tanto para quem busca emprego quanto para empregadores.

### 🎯 Principais Funcionalidades

- Busca de vagas de emprego
- Perfil profissional do candidato
- Sistema de candidatura
- Interface para empregadores
- Notificações de vagas relevantes
- Filtros de busca personalizados

### 🛠️ Tecnologias Utilizadas

#### Frontend
- React Native
- Expo
- Zustand (Gerenciamento de Estado)
- React Navigation
- Styled Components

#### Backend
- Node.js
- Express
- Prisma (ORM)
- MySQL
- JWT (Autenticação)

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI
- MySQL

### Frontend
```bash
# Instalar dependências
cd frontend
npm install

# Iniciar o aplicativo
npm run tunnel
```

### Backend
```bash
# Instalar dependências
cd backend
npm install

# Configurar o banco de dados
npx prisma db push
npx prisma generate

# Iniciar o servidor
npm run dev
```

## 📁 Estrutura do Projeto

```
job/
├── frontend/           # Aplicativo React Native
│   ├── components/    # Componentes reutilizáveis
│   ├── screens/       # Telas do aplicativo
│   ├── stores/        # Gerenciamento de estado
│   └── assets/        # Recursos estáticos
│
└── backend/           # API Node.js
    ├── src/          # Código fonte
    ├── prisma/       # Configurações do banco de dados
    └── database/     # Scripts e migrations
```

## 🔒 Segurança

- Autenticação via JWT
- Validação de dados
- Proteção contra ataques comuns
- Criptografia de dados sensíveis

## 🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte, envie um email para [seu-email@exemplo.com] ou abra uma issue no repositório.

---
Desenvolvido com ❤️ por [Seu Nome]

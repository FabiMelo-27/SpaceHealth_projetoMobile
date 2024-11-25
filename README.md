# **Space Health**

## **Descrição do Projeto**
O **Space Health** é uma solução inovadora desenvolvida para ajudar os usuários a monitorar sua saúde de forma simples, prática e eficiente. O aplicativo permite o registro de sintomas, controle de níveis de glicose, monitoramento de pressão arterial e oferece feedback motivacional. Agora, também inclui ferramentas para calcular o IMC (Índice de Massa Corporal), estimar a perda calórica com base em exercícios físicos, recuperação de senha e a opção de baixar PDFs dos dados de perfil, sintomas, pressão e diabetes.

Este projeto é uma iniciativa acadêmica, simulando a atuação de uma empresa fictícia especializada em soluções tecnológicas para a área da saúde.

<div style="text-align: center;">
   <img src="/gifs/inicio.png" alt="Tela Inicial" width="100px">
  <img src="/gifs/home.png" alt="Tela Inicial" width="100px">
   <img src="/gifs/login.png" alt="Tela Inicial" width="100px">
</div>

---

## **Funcionalidades Principais**
1. **Cadastro e Login de Usuário**
   - **Objetivo:** Permite o acesso seguro ao aplicativo através de autenticação via Firebase.
   - **Características:**
     - Criação de conta e login de usuários.
     - Autenticação segura com gerenciamento de sessões.
     - Redirecionamento para a tela principal após login bem-sucedido.
     - **Recuperação de senha** para usuários que esqueceram suas credenciais.
   
   <br>
     <div style="text-align: center;">
       <img src="/gifs/login.gif" alt="Cadastro e Login" width="100px">
        <img src="/gifs/perfil.gif" alt="Cadastro e Login" width="100px">
     </div><br>

2. **Registro de Sintomas**
   - **Objetivo:** Registrar sintomas diários, como dores, febres e cansaço, junto com a intensidade e data.
   - **Características:**
     - Adicionar, editar e excluir sintomas.
     - Visualização do histórico de sintomas.
     - Feedback personalizado para auxiliar no acompanhamento da saúde.
   <br>
    
  
3. **Monitoramento de Pressão Arterial**
   - **Objetivo:** Registrar e acompanhar os níveis de pressão arterial, incluindo valores sistólicos e diastólicos.
   - **Características:**
     - Registro detalhado de medições.
     - Análise categórica da pressão (normal, alta, baixa).
     - Histórico para acompanhamento da evolução.
   <br>

4. **Controle de Diabetes**
   - **Objetivo:** Monitorar os níveis de glicose no sangue e fornecer orientações baseadas nas faixas de referência.
   - **Características:**
     - Registro de níveis de glicose.
     - Análise e feedback sobre os níveis registrados.
     - Histórico acessível para consultas.
   <br>
     <div style="text-align: center;">
       <img src="gifs/sintomas.gif" alt="Registro de Sintomas" width="100px">
     </div><br>

5. **Calculadora de IMC**
   - **Objetivo:** Calcular o Índice de Massa Corporal com base no peso e altura fornecidos pelo usuário.
   - **Características:**
     - Indicação da faixa de peso (abaixo do peso, normal, sobrepeso, obesidade).
     - Análise visual do resultado para maior clareza.
   <br>
   
6. **Contador de Calorias por Exercício**
   - **Objetivo:** Estimar a quantidade de calorias queimadas com base nos exercícios físicos realizados pelo usuário.
   - **Características:**
     - Integração com a API ExerciseDB para cálculos precisos.
     - Permite ao usuário inserir o tipo de exercício, duração e intensidade.
     - Exibição de resultados detalhados, com recomendações personalizadas.
  <br>

7. **Feedback Motivacional e Dicas de Saúde**
   - **Objetivo:** Oferecer mensagens motivacionais e dicas de saúde baseadas nos dados registrados ou em orientações gerais.
   - **Características:**
     - Dicas para hábitos saudáveis.
     - Motivações para o autocuidado e acompanhamento regular da saúde.
 <br>
     <div style="text-align: center;">
       <img src="/gifs/bem-estar.gif "alt="Feedback Motivacional" width="100px">
     </div>

8. **Download de PDFs**
   - **Objetivo:** Permitir que os usuários baixem relatórios em PDF dos seus dados de perfil, sintomas, pressão arterial e níveis de glicose.
   - **Características:**
     - Geração de relatórios detalhados em PDF.
     - Opção de download direto pelo aplicativo.
  

---

## **Tecnologias Utilizadas**

### **Frontend**
- **Ionic Framework:** Responsável pela interface amigável e responsiva, compatível com Android e iOS.
- **Angular:** Utilizado para a estruturação da lógica de dados e interação com o usuário.

### **Backend**
- **Firebase:**
  - **Firebase Authentication:** Garante a autenticação segura dos usuários.
  - **Firebase Firestore:** Banco de dados escalável para armazenamento seguro de informações como sintomas, níveis de glicose e pressão arterial.
- **API ExerciseDB:** Utilizada para calcular a quantidade de calorias queimadas com base nos exercícios físicos realizados.

### **Arquitetura**
- **Serviços:**
  - O `sintomas.service.ts` centraliza todas as operações de dados, incluindo adição, recuperação, edição e exclusão de informações no Firebase.
  - Comunicação com API externa para cálculos de calorias queimadas.

---

## **Como Executar o Projeto**

1. **Pré-requisitos:**
   - Node.js instalado.
   - Ionic CLI instalado globalmente.
   - Conta no Firebase para configuração.

2. **Passos:**
   - Clone o repositório:
     ```bash
     git clone https://github.com/seu-repositorio/smarthealth-systems.git
     ```
   - Acesse o diretório do projeto:
     ```bash
     cd projeto
     ```
   - Instale as dependências:
     ```bash
     npm install
     ```
   - Configure o Firebase no arquivo `environment.ts`.
   - Execute o aplicativo:
     ```bash
     ionic serve
     ```

3. **Para Android/iOS:**
   - Gere o build para dispositivos móveis:
     ```bash
     ionic build
     ionic capacitor add android
     ionic capacitor run android
     ```

---

## **Contribuições**
Este projeto foi desenvolvido como parte de um trabalho acadêmico. Contribuições externas não são aceitas neste momento, mas feedbacks e sugestões são bem-vindos!

---

## **Licença**
Este projeto é destinado a fins educacionais e não está disponível para uso comercial.

---


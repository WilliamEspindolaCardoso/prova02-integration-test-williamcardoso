import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('Escuela API', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api.escuelajs.co/api/v1';
  let userId = '';
  let productId = '';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('User', () => {
// Testes Positivos \\
// Teste de Usuário
    it('Cadastra o novo usuário', async () => {
      userId = await p
        .spec()
        .post(`${baseUrl}/users`)
        .withJson({
          email: 'aline@gmail.com',
          name: 'aline',
          password: '12345',
          role: 'customer',
          avatar: 'https://www.google.com.br/'
        })
        .expectStatus(StatusCodes.CREATED)
        .returns('id');
    });

    it('Busca o usuário cadastrado', async () => {
      await p
        .spec()
        .get(`${baseUrl}/users/${userId}`)
        .expectStatus(StatusCodes.OK)
    });
    
    it('Atualiza os dados do usuário cadastrado', async () => {
      await p
        .spec()
        .put(`${baseUrl}/users/${userId}`)
        .withJson({
          email: 'alineenfermeira@gmail.com',
          name: 'aline',
          password: '12345',
          role: 'admin',
          avatar: 'https://www.google.com.br/'
        })
        .expectStatus(StatusCodes.OK)
    });

    it('Apaga um usuário cadastrado', async () => {
      await p
        .spec()
        .delete(`${baseUrl}/users/${userId}`)
        .expectStatus(StatusCodes.OK)
    });

    it('Cadastra o novo usuário', async () => {
      userId = await p
        .spec()
        .post(`${baseUrl}/users`)
        .withJson({
          email: 'william2025@gmail.com',
          name: 'william',
          password: '12345',
          role: 'admin',
          avatar: 'https://www.google.com/imgres?q=avatar%20homem%20de%20barba&imgurl=https%3A%2F%2Fimg.freepik.com%2Fvetores-premium%2Fretrato-de-um-jovem-com-barba-e-estilo-de-cabelo-avatar-masculino-ilustracao-vetorial_266660-423.jpg&imgrefurl=https%3A%2F%2Fbr.freepik.com%2Fvetores-premium%2Fretrato-de-um-jovem-com-barba-e-estilo-de-cabelo-avatar-masculino-ilustracao-vetorial_19282811.htm&docid=KlUmnwAJc2R-pM&tbnid=Doetq6jcA2UJlM&vet=12ahUKEwiZhKTsyIGQAxXctpUCHU3UNj8QM3oECCYQAA..i&w=626&h=626&hcb=2&ved=2ahUKEwiZhKTsyIGQAxXctpUCHU3UNj8QM3oECCYQAA'
        })
        .expectStatus(StatusCodes.CREATED)
        .returns('id');
    });
  });


// Teste de Produto
  describe('Products', () => {
    it('Cadastra o novo Produto', async () => {
      productId = await p
        .spec()
        .post(`${baseUrl}/products`)
        .withJson({
          "title": "Geladeira",
          "price": 1890.00,
          "description": "Geladeira Brastemp 460 litros",
          "categoryId": 3,
          "images": [
            "https://www.carrefour.com.br/geladeira-brastemp-2-portas-frost-free-463-litros-branca-110v-3494071/p"
          ]
            })
        .expectStatus(StatusCodes.CREATED)
        .returns('id');
    });

    it('Busca o produto cadastrado', async () => {
      await p
        .spec()
        .get(`${baseUrl}/products/${productId}`)
        .expectStatus(StatusCodes.OK)
    });

    it('Atualiza informações do produto cadastrado', async () => {
      await p
        .spec()
        .put(`${baseUrl}/products/${productId}`)
        .withJson({
          "title": "Geladeira Frost Free Brastemp",
          "price": 1690.00,
          "description": "Geladeira 460 litros",
          "categoryId": 3,
          "images": [
            "https://www.carrefour.com.br/geladeira-brastemp-2-portas-frost-free-463-litros-branca-110v-3494071/p"
          ]
            })
        .expectStatus(StatusCodes.OK)
    });

    it('Apaga um produto cadastrado', async () => {
      await p
        .spec()
        .delete(`${baseUrl}/products/${productId}`)
        .expectStatus(StatusCodes.OK)
    });

    it('Cadastra o novo Produto', async () => {
      productId = await p
        .spec()
        .post(`${baseUrl}/products`)
        .withJson({
          "title": "Sofa Retratil 3 Lugares",
          "price": 699.00,
          "description": "Sofa 3 Lugares",
          "categoryId": 3,
          "images": [
            "https://www.google.com/imgres?q=Sofa%203%20Lugares&imgurl=https%3A%2F%2Freidosestofados.com.br%2Fwp-content%2Fuploads%2F15183502104_Sofa20Retratil202.0020m20-20Modelo20Compact20-20Cinza202022020-200-1.jpg&imgrefurl=https%3A%2F%2Freidosestofados.com.br%2Fproduto%2Fsofa-3-lugares-retratil-e-reclinavel-compact-200m-velusoft-cinza-202%2F&docid=uOkhT-TmVskqiM&tbnid=_BgcC1d8xG1yAM&vet=12ahUKEwiH0-K_yYGQAxVatJUCHTVDB-IQM3oECBMQAA..i&w=711&h=473&hcb=2&ved=2ahUKEwiH0-K_yYGQAxVatJUCHTVDB-IQM3oECBMQAA"
          ]
            })
        .expectStatus(StatusCodes.CREATED)
        .returns('id');
    });
  });


// Testes Negativos

  describe('Testes Negativos', () => {
    it('Cadastro de um novo Produto com valor negativo', async () => {
      await p
        .spec()
        .post(`${baseUrl}/products`)
        .withJson({
          "title": "Cadeira",
          "price": -249.99,
          "description": "Cadeira colorida",
          "categoryId": 2,
          "images": [
            "https://www.primaxmoveis.com.br/kit-4-cadeira-infantil-colorida-polipropileno-empilhavel-cas/p/MLB43905471"
          ]
            })
        .expectStatus(StatusCodes.BAD_REQUEST)
        .returns('id');
    });

    it('Não deve atualizar produto com ID inválido', async () => {
      await p
        .spec()
        .put(`${baseUrl}/products/9999`)
        .withJson({
          "title": "Produto Teste",
          "price": 1000,
          "description": "Teste de erro",
          "categoryId": 3,
          "images": ["https://placeimg.com/640/480/any"]
        })
        .expectStatus(StatusCodes.BAD_REQUEST);
    });
  });
});
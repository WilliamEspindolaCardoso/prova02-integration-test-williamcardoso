import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('Escuela API', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api.escuelajs.co/api/v1';
  let userId = '';
  let productId = '1556';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

    describe('User', () => {

// Usuário
    it('Cadastra um novo usuário', async () => {
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
        .returns('id').inspect();
        console.log(userId)
    });

    it('Busca um usuário cadastrado', async () => {
      await p
        .spec()
        .get(`${baseUrl}/users/${userId}`)
        .expectStatus(StatusCodes.OK)
    });
    
    it('Atualiza os dados um usuário cadastrado', async () => {
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
    


// Produto
    it('Cadastra um novo Produto', async () => {
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
        .returns('id').inspect();
        console.log(productId)
    });

    it('Busca um produto cadastrado', async () => {
      await p
        .spec()
        .get(`${baseUrl}/products/${productId}`)
        .expectStatus(StatusCodes.OK)
    });

    it('Atualiza informações de um produto cadastrado', async () => {
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
    
  });
});
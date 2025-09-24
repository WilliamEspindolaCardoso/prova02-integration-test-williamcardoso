import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('Escuela API', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api.escuelajs.co/api/v1';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('User', () => {
    it('New User', async () => {
      await p
        .spec()
        .post(`${baseUrl}/users`)
        .withJson({
          email: 'william@gmail.com',
          name: 'william',
          password: '12345',
          role: 'admin',
          avatar: 'https://www.google.com.br/'
        })
        .expectStatus(StatusCodes.CREATED)
        .returns('id').inspect();
    });
  });
});

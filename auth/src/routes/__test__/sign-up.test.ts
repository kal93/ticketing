import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on sucessfull sign up', async () => {
  return request(app)
    .post('/api/users/signUp')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

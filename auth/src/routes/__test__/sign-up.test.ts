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

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signUp')
    .send({
      email: 'test@test',
      password: 'password',
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signUp')
    .send({
      email: 'test@test.com',
      password: 'p',
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signUp')
    .send({
      email: 'test@test.com',
    })
    .expect(400);

  return await request(app)
    .post('/api/users/signUp')
    .send({
      password: '1234567',
    })
    .expect(400);
});

it('disallows duplicate email', async () => {
  await request(app)
    .post('/api/users/signUp')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  return await request(app)
    .post('/api/users/signUp')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('sets a cookie after successfull sign up', async () => {
  const response = await request(app)
    .post('/api/users/signUp')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});

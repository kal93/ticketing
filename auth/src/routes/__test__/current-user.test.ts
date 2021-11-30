import request from 'supertest';
import { app } from '../../app';

it('responds with details about current user', async () => {
  const cookie = await global.signIn(); // its defined in global namespace in setup.ts. Used only for jest testing.
  const response = await request(app)
    .post('/api/users/currentUser')
    .set('Cookie', cookie)
    .send()
    .expect(200);
  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {
  const cookie = await global.signIn(); // its defined in global namespace in setup.ts. Used only for jest testing.
  const response = await request(app)
    .post('/api/users/currentUser')
    .set('Cookie', cookie)
    .send()
    .expect(200);
  expect(response.body.currentUser.email).toEqual(null);
});

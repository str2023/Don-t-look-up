/* eslint-disable import/no-import-module-exports */
import { rest } from 'msw';

const users = [
  { id: 1, nickname: '철수', gender: 'Male', birthdate: '1999-01-01' },
  { id: 2, nickname: '영희', gender: 'Female', birthdate: '1990-02-14' },
];

const posts = [
  { id: 1, userId: 1, content: 'Hello, world!' },
  { id: 2, userId: 2, content: 'This is a mock post.' },
];

const handlers = [
  rest.get('/api/users', (req, res, ctx) => res(ctx.status(200), ctx.json(users))),

  rest.get('/api/posts', (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),

  rest.post('/api/posts', (req, res, ctx) => {
    const newPost = { id: Date.now(), ...req.body };
    posts.push(newPost);
    return res(ctx.status(201), ctx.json(newPost));
  }),

  rest.post('/api/login', (req, res, ctx) => {
    const { email, password } = req.body;

    const matchedUser = users.find((user) => user.email === email && user.password === password);

    if (matchedUser) {
      return res(ctx.status(200), ctx.json({ message: 'Login successful', user: matchedUser }));
    }
    return res(ctx.status(401), ctx.json({ message: 'Invalid credentials' }));
  }),

  rest.post('/api/register', (req, res, ctx) => {
    const { username, password, email } = req.body;

    if (username && password && email) {
      return res(ctx.status(200), ctx.json({ message: 'Registration successful' }));
    }

    return res(ctx.status(400), ctx.json({ message: 'Invalid registration data' }));
  }),
];

exports.default = handlers;

import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Rosalvo Júnior',
    email: 'rosalvo@juniorbh.com.br',
    password_hash: '123456',
  });
  return res.json(user);
});

export default routes;

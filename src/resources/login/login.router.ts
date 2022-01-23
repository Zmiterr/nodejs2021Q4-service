import loginService from './login.service.';

const loginRoutes = [
  {
    method: 'POST',
    url: '/login',
    handler: loginService.loginUser,
  },
];

export default loginRoutes;

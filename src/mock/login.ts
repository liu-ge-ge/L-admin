const login = [
  {
    url: '/api/login',
    method: 'get',
    statusCode: 200,
    response: () => {
      return {
        code: 200,
        message: '登陆成功!',
        data: {
          data: true,
          access_token: 'esdfsdfasdofasodfalsdfoasejfwenmflsjdfoneflwnfosdnflwnoefwnflsdnfo',
        },
      }
    },
  },
]

export default login

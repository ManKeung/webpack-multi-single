module.exports = {
  '/': {
    target: 'https://m.weibo.cn',
    changeOrigin: true,
    logLevel: 'debug',
    pathRewrite: {
      '^/comments': '/app/comments'
    },
    headers: { // 确保验证api
      'Cookie': '_T_WM=1ae517c8cadd69766e5dbcb3b55d6983; TMPTOKEN=JFP6NpeQvnpO0hyHiErBqlks5GIWDl8hxUeGYrlpbx3pFMCW484DxiQT14uKGjtb; SUB=_2A2533DEODeRhGeRG6FUR8ifMyzyIHXVVP19GrDV6PUJbkdANLW_2kW1NUjYDCEV5vSxEgYBB4v-WnnloFeCnqkoy; SUHB=0FQq97vatmNY9m; SCF=AoiwqrzW8wqnA__LYKhE8jeCOW7NSsEkBu753NUreVnsAlYIkhvlv6gVwZwefDoCItKSWVe0Trh69fkMrlAaEa0.; SSOLoginState=1524121950; WEIBOCN_FROM=1110006030; M_WEIBOCN_PARAMS=luicode%3D20000174%26uicode%3D20000061%26fid%3D4230532655339827%26oid%3D4230532655339827'
    }
  }
}

import react from 'react'
import moduleB from '../components/module'
import '../css/b.scss'

console.log('i am b')
console.log(moduleB)


if (module.hot) {
  module.hot.accept()
}

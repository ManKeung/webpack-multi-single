import react from 'react'
import moduleA from '../components/module'
import '../css/a.scss'

console.log('i am a !!')
console.log(moduleA)


if (module.hot) {
  module.hot.accept()
}

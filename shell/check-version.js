
const shell = require('shelljs')
const NODE_VERSION="v12.16.3"


console.log('检测 node...')
const version = shell.exec('node --version', {silent: true}).stdout;
console.log(`【版本】: ${version}`)


const version2 = shell.exec('nvm ls')


if (NODE_VERSION === version.trim()) {
  console.log(`【版本】: 正确`)
} else {
  console.log(`【版本】: 错误`)
  shell.exec(`nvm use ${NODE_VERSION}`)
}

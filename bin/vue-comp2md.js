/*
 * @Author: xiaoguang_10@qq.com
 * @LastEditors: xiaoguang_10@qq.com
 * @Date: 2021-06-24 19:19:29
 * @LastEditTime: 2021-06-25 13:59:44
 *
 *
 * 参考:
 *  vue-docgen-api https://github.com/vue-styleguidist/vue-styleguidist/tree/dev/packages/vue-docgen-api
 *  tablemark https://github.com/citycide/tablemark
 *  json2md https://www.npmjs.com/package/json2md
 *
 */
const inquirer = require('inquirer');
const { generatorComMd } = require('./vue-comp2md-base')

inquirer.prompt([
  {
    type: 'input',
    name: 'filename',
    message: '请输入组件的文件夹名称',
  }
]).then(answers => {
  if (answers.filename) {
    generatorComMd(answers.filename)
  }
})


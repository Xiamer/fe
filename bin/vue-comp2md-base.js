/*
 * @Author: xiaoguang_10@qq.com
 * @LastEditors: xiaoguang_10@qq.com
 * @Date: 2021-06-24 19:19:29
 * @LastEditTime: 2021-06-25 13:59:02
 *
 *
 * 参考:
 *  vue-docgen-api https://github.com/vue-styleguidist/vue-styleguidist/tree/dev/packages/vue-docgen-api
 *  tablemark https://github.com/citycide/tablemark
 *  json2md https://www.npmjs.com/package/json2md
 *
 */

const fs = require('fs')
const vueDocs = require('vue-docgen-api')
// const json2md = require('json2md')  json2md bug when table one more row
const tablemark = require('tablemark')

const MD_VALUE = `<!-- 以下为自动生成文档 -->`


/**
 * 生成文档的md内容 , props slot event(emit)
 *
 * @param {string} path
 */
 async function generatorComMd(filename) {
  const comppath = process.cwd() + `/components/${filename}/index.vue`
  console.log(`[info]: 检查路径 ${comppath}`)
  if (fs.existsSync(comppath)) {
    const json = await vueDocs.parse(comppath)

    const propsMd = json.props && generatorPropsMd(json.props) || ''
    const eventMd = json.events && generatorEventMd(json.events) || ''
    const slotsMd = json.slots && generatorSlotsMd(json.slots) || ''

    const md = `${MD_VALUE}\n${propsMd}${eventMd}${slotsMd}`

    // console.log('[success]: 文档内容已生成。')
    // console.log('------------ 开始合并文档 ------------')
    const mdPath = process.cwd() + `/docs/component/${filename}.md`
    console.log(`[info]: 检查路径 ${mdPath}`)
    if (fs.existsSync(mdPath)) {
      fs.readFile(mdPath, 'utf8', function (err, data) {
        if (err) {
          return console.log(err);
        } else {
          let content = data
          if (data.includes(MD_VALUE)) {
            content = content.split(MD_VALUE)[0] + md
          } else {
            const prefix = content.endsWith(`\n`) ? `` : `\n`
            content = `${content}${prefix}${md}`
          }
          fs.writeFile(mdPath, content, 'utf8', function (err) {
            if (err) return console.log('写入文件异常', err);
            console.log(`[success]: 组件 ${filename} 文档生成成功!`)
          });
        }
      });
    } else {
      console.error(`[error]: 文件不存在，请检查文件路径`)
    }
  } else {
    console.error(`[error]: 文件不存在，请检查文件路径`)
  }
}


/**
 *
 * @param {Array} aSlotsList
 * @returns slots markdown
 */
function generatorSlotsMd(aSlotsList) {
  const slotsTable = aSlotsList.map(v => {
    let bindParam = '-'
    if (v.bindings) {
      bindParam = v.bindings.map(v => {
        return `参数${v.name}:  ${v.description}`
      }).join('<br />')
    }
    return {
      name: v.name,
      desc: v.description,
      bindParam
    }
  })

  const slotsMd = tablemark(slotsTable, {
    columns: ['name', '说明', '绑定参数']
  })
  return `### Slot\n${slotsMd}\n`
}


/**
 *
 * @param {Array} aPropsList
 * @returns props markdown
 */
function generatorPropsMd(aPropsList) {
  const propsTable = aPropsList.map(v => {
    return {
      name: v.name,
      desc: v.description,
      type: v.type.name,
      values: v.values || '-',
      defaultValue: v.defaultValue && v.type.name !== 'func' ? v.defaultValue.value : '-',
    }
  })

  const propsMd = tablemark(propsTable, {
    columns: ['参数', '说明', '类型', '可选值', '默认值']
  })
  return `### Attribute\n${propsMd}\n`
}


/**
 *
 * @param {Array} aEmitList
 * @returns emit markdown
 */
function generatorEventMd(aEmitList) {
  const emitTable = aEmitList.map(v => {
    let cbParams = '-'
    if (v.properties) {
      cbParams = v.properties.map((v, i) => {
        return `参数${i} ${v.type.names}:  ${v.description}`
      }).join('<br />')
    }
    return {
      name: v.name,
      desc: v.description,
      cbParams: cbParams
    }
  })
  const emitMd = tablemark(emitTable, {
    columns: ['事件名称', '说明', '回调参数']
  })
  return `### Methods\n${emitMd}\n`
}


module.exports = {
  generatorComMd
}

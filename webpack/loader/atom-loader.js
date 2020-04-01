/**
 * 基础原子类定义
 *
 * 原子类定义如下：
 *
 * margin：m、ml、mr、mt、mb、mx、my
 * padding：p、pl、pr、pt、pb、px、py
 * width：w、w-p
 * height：h、h-p
 * 四方向：l、r、t、b；（h5 端简写由于跟 margin 冲突，添加第二个字母 o：mol、mor、mot、mob）
 * 行高：lh
 * 字体：fs、fw
 * border-radius：br
 *
 * 「通用原子类」，在 /css/atom.style 中单独支持
 *
 */
const _ = require('underscore');

const oMobileClassNameMap = {
  // margin
  '.m': 'margin:$rem;',
  '.ml': 'margin-left:$rem;',
  '.mr': 'margin-right:$rem;',
  '.mt': 'margin-top:$rem;',
  '.mb': 'margin-bottom:$rem;',
  '.mx': 'margin-left:$rem;margin-right:$rem;',
  '.my': 'margin-top:$rem;margin-bottom:$rem;',
  // margin !important
  '.mi': 'margin:$rem !important;',
  '.mli': 'margin-left:$rem !important;',
  '.mri': 'margin-right:$rem !important;',
  '.mti': 'margin-top:$rem !important;',
  '.mbi': 'margin-bottom:$rem !important;',
  '.mxi': 'margin-left:$rem !important;margin-right:$rem !important;',
  '.myi': 'margin-top:$rem !important;margin-bottom:$rem !important;',
  // padding
  '.p': 'padding:$rem;',
  '.pl': 'padding-left:$rem;',
  '.pr': 'padding-right:$rem;',
  '.pt': 'padding-top:$rem;',
  '.pb': 'padding-bottom:$rem;',
  '.px': 'padding-left:$rem;padding-right:$rem;',
  '.py': 'padding-top:$rem;padding-bottom:$rem;',
  // padding !important
  '.pi': 'padding:$rem !important;',
  '.pli': 'padding-left:$rem !important;',
  '.pri': 'padding-right:$rem !important;',
  '.pti': 'padding-top:$rem !important;',
  '.pbi': 'padding-bottom:$rem !important;',
  '.pxi': 'padding-left:$rem !important;padding-right:$rem !important;',
  '.pyi': 'padding-top:$rem !important;padding-bottom:$rem !important;',
  // width
  '.w': 'width:$rem;',
  '.wp': 'width:$%;',
  // height
  '.h': 'height:$rem;',
  '.hp': 'height:$%;',
  // 四方向
  '.l': 'left:$rem;',
  '.r': 'right:$rem;',
  '.t': 'top:$rem;',
  '.b': 'bottom:$rem;',
  // 行高
  '.lh': 'line-height:$rem;',
  // 字体
  '.fs': 'font-size:$rem;',
  '.fw': 'font-weight:$;',
  // border-radius
  '.br': 'border-radius:$rem',
  '.bgs': 'background-size:$rem'
};

module.exports = function(sSource) {
  // 从 vue 文件中提取 pug 代码
  let sPugString;
  try {
    sPugString = sSource.match(/<template lang=("|')pug("|')>([\s\S]*)<\/template>/g)[0];
  } catch (e) {
    return sSource;
  }

  // 没有找到 template 模板，则无需处理
  if (!sPugString) return sSource;

  // 获取 pc 端原子类类名数组，并剔除重复的类名
  let aMobileClassName = _.uniq(sPugString.match(/\.(m|ml|mr|mt|mb|mx|my)-[0-9]+|\.(mi|mli|mri|mti|mbi|mxi|myi)-[0-9]+|\.(p|pl|pr|pt|pb|px|py)-[0-9]+|\.(pi|pli|pri|pti|pbi|pxi|pyi)-[0-9]+|\.(w|wp)-[0-9]+|\.(h|hp)-[0-9]+|\.(l|r|t|b)-[0-9]+|\.lh-[0-9]+|\.(fs|fw)-[0-9]+|\.br-[0-9]+|\.(bgs)-[0-9]+/g));

  // 输出 debug 数据
  this.query.debug && console.log('\n文件：', this.resourcePath, this.query);
  this.query.debug && console.log('desktop 类名：', aMobileClassName);

  // 原子类样式接收数组
  let aMobileStyle = [];

  // 开始生成 mobile 原子类
  aMobileClassName.forEach((item) => {
    let sKey = item.match(/\.\w+/)[0];
    let nValue;

    // 百分比数值，字重，无需使用 rem
    if (['.wp', '.hp', '.fw'].includes(sKey)) {
      nValue = item.match(/\d+/)[0];
    } else {
      nValue = +item.match(/\d+/)[0] / 100;
    }

    aMobileStyle.push(`${item}{${oMobileClassNameMap[sKey].replace(/\$/g, nValue)}}`);
  });

  // 输出 debug 数据
  this.query.debug && console.log('desktop 样式：', aMobileStyle);

  return `${sSource}\n<style>\n${aMobileStyle.join('')}</style>\n`;
};

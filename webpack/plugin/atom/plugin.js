const _ = require('underscore');
const fs = require('fs');
const path = require('path');
class MergeAtom {
  constructor(options = {}) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('MergeAtom', (compilation, callback) => {
      let assets = compilation.assets;
      let aKeys = Object.keys(assets).filter(val => val.indexOf('.json') >= 0);
      let aAtomList = [];
      aKeys.forEach(key => {
        let asset = assets[key];
        let content = asset.source();
        aAtomList = [...aAtomList, ...JSON.parse(content)];
      });
      this.output(aAtomList);
      callback();
    });
  }
  output(aCss) {
    let sStyleString = '';
    aCss = _.uniq(aCss);
    let oMap = {
      // padding
      p: 'padding:$rpx',
      pl: 'padding-left:$rpx',
      pr: 'padding-right:$rpx',
      pt: 'padding-top:$rpx',
      pb: 'padding-bottom:$rpx',
      ptb: 'padding-top:$rpx;padding-bottom:$rpx', // 废弃
      plr: 'padding-left:$rpx;padding-right:$rpx', // 废弃
      px: 'padding-left:$rpx;padding-right:$rpx',
      py: 'padding-top:$rpx;padding-bottom:$rpx',
      // margin
      m: 'margin:$rpx',
      ml: 'margin-left:$rpx',
      mr: 'margin-right:$rpx',
      mt: 'margin-top:$rpx',
      mb: 'margin-bottom:$rpx;',
      mtb: 'margin-top:$rpx;margin-bottom:$rpx', // 废弃
      mlr: 'margin-left:$rpx;margin-right:$rpx', // 废弃
      mx: 'margin-left:$rpx;margin-right:$rpx',
      my: 'margin-top:$rpx;margin-bottom:$rpx',
      // top/left/right/bottom
      t: 'top:$rpx',
      l: 'left:$rpx',
      b: 'bottom:$rpx',
      r: 'right:$rpx',
      // width/height
      w: 'width:$rpx',
      h: 'height:$rpx',
      lh: 'line-height:$rpx',
      fw: 'font-weight:$',
      rounded: 'border-radius:$rpx',
      fs: 'font-size:$rpx',
      // width:100%;height:100%
      wp: 'width:$%',
      hp: 'height:$%',
    };
    aCss.forEach(val => {
      let aVal = val.split('-');
      if (aVal[0]) {
        aVal = oMap[aVal[0]]
          ? `.${val}{${oMap[aVal[0]].replace(/\$/g, aVal[1])}}`
          : '';
        sStyleString += aVal;
      }
    });
    try {
      fs.writeFileSync(
        path.resolve(__dirname, '../../src/style/base.wxss'),
        sStyleString,
        {
          encoding: 'utf8',
        },
      );
      console.log('编译成功....', new Date().toLocaleString());
    } catch (error) {
      console.log('boom boom boom', new Date().toLocaleString());
    }
  }
}
module.exports = MergeAtom;

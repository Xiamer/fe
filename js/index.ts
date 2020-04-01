/*
 * @Author: xiaoguang@yzyw-inc.com
 * @Date: 2018-04-26 16:03:06
 * @Last Modified by: xiaoguang@yzyw-inc.com
 * @Last Modified time: 2020-04-01 23:26:59
 */

import Vue from 'vue';
import _ from 'lodash';
const vm = new Vue();

/**
 * @description 复制功能  https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
 * @param text 复制的文本
 */
function fnBsnCopyTextToClipboard(text) {
  let textArea: any = document.createElement('textarea');
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    let successful = document.execCommand('copy');
    let msg = successful ? 'successful' : 'unsuccessful';
    if (msg === 'successful') {
      vm.$message.success('复制成功');
    } else {
      window.prompt('复制: Ctrl+C ', text);
    }
  } catch (err) {
    window.prompt('复制: Ctrl+C ', text);
  }
  document.body.removeChild(textArea);
}

/**
 * 将字符串变成数组(以各种逗号、空格、换行等)
 *
 * @param {string} sVal 字符串
 * @returns {Array} aList 数组
 */
function fnBsnRemoveSymbolToArray(sVal = '') {
  let aMidList = sVal.split(/[,，\s\r\n]/);
  let aList = _.uniq(aMidList.filter(v => v));
  return aList;
}

/**
 * 延时器函数
 * @param   {Function}  callback 延时执行的函数
 * @param   {Number}    timeout 延时执行的毫秒，默认500毫秒
 */
function fnBsnSetTimeOut(callback: Function, timeout: number = 500) {
  setTimeout(() => {
    callback && callback();
  }, timeout);
}

/**
 * 一维数组转二维数组
 * @param   {Array}  array 源数组
 * @param   {Number} length 二维的数组单个长度
 */
function fnPure2TwoDimensionArray(array, length: 2) {
  const result = <any>[];
  _.forEach(array, (item, i: number) => {
    const nQuotient = Math.floor(i / length);
    if (result[nQuotient]) {
      item = Object.assign(item, { index: nQuotient });
      result[nQuotient].push(item);
    } else {
      item = Object.assign(item, { index: nQuotient });
      result[nQuotient] = [item];
    }
  });
  return result;
}

/**
 * 获得显示区域高度
 * @param   {dom}  element dom元素
 */
function fnPureContentHeight(element) {
  function getElementTop(element) {
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null) {
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    return actualTop;
  }
  const nTop = getElementTop(element);
  const nPageHeight = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight);
  let contentHeight = nPageHeight - nTop;
  return contentHeight;
}

/**
 * 下载文件流
 *  fnDownloadFile(new Blob([res], { type: 'application/excel' }), filename);
 *
 * @param   {blob}  blob 二进制文件流
 * @param   {fileName}  string  文件名
 */
function fnDownloadFile(blob, fileName = 'download.txt') {
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    window.navigator.msSaveBlob(blob, fileName);
  } else {
    // 创建新的URL表示指定的File对象或者Blob对象
    let URL = window.URL || window.webkitURL;
    let objectUrl = URL.createObjectURL(blob);
    if (fileName) {
      // 创建a标签用于跳转至下载链接
      var a = document.createElement('a');
      // download：指示浏览器下载URL而不是导航到它，也可设置下载文件的名称
      if (typeof a.download === 'undefined') {
        // window.location：获得当前页面的地址 (URL)，并把浏览器重定向到新的页面
        window.location = objectUrl;
      } else {
        // href属性指定下载链接
        a.href = objectUrl;
        // dowload属性指定文件名
        a.download = fileName;
        // 将a标签插入body中
        document.body.appendChild(a);
        // click()事件触发下载
        a.click();
        // 去除a标签，以免影响其他操作
        a.remove();
      }
    } else {
      window.location = objectUrl;
    }
    // 将URL释放
    URL.revokeObjectURL(objectUrl);
  }
}

/**
 * 比较当前版本是否大于 目标版本
 * @param judgeVersion 需要判断目标版本号
 * @param nowVersion 当前项目版本
 */
function fnBsnbIsNoLessThanThisVersion(judgeVersion: string, nowVersion: string) {
  try {
    // 去除v
    judgeVersion = judgeVersion.replace('v', '');
    nowVersion = nowVersion.replace('v', '');
    if (nowVersion === judgeVersion) return true;
    let nowVersionArr = nowVersion.split('.');
    let judgeVersionArr = judgeVersion.split('.');
    for (let i = 0; i < judgeVersionArr.length; i++) {
      if (+nowVersionArr[i] > +judgeVersionArr[i]) {
        return true;
      } else if (+nowVersionArr[i] < +judgeVersionArr[i]) {
        return false;
      }
    }
    return false;
  } catch (e) {
    return false;
  }
}

export {
  fnBsnCopyTextToClipboard,
  fnBsnRemoveSymbolToArray,
  fnBsnSetTimeOut,
  fnPure2TwoDimensionArray,
  fnPureContentHeight,
  fnDownloadFile,
  fnBsnbIsNoLessThanThisVersion
};

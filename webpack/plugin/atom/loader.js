const _ = require('underscore');
module.exports = function (sSource) {
  let sContext = this.context.split(/lookme\/src\//)[1].replace(/\//g, '-');
  let reg = this.resourcePath.match(/(.*\/)*([^.]+).wxml/);
  let sName = (reg && reg[2]) || 'default';
  let aCss = _.uniq(
    sSource.match(
      /(p|pl|pr|pt|pb|ptb|py|plr|px|m|ml|mr|mt|mb|mtb|my|mlr|mx|w|h|l|t|b|r|fs|lh|fw|wp|hp|rounded)-[0-9]+/gm,
    ),
  );
  this.emitFile(`${sContext}-${sName}.json`, JSON.stringify(aCss));
  return '';
};

const fs = require('fs')
const { generatorComMd } = require('./vue-comp2md-base')

fs.readFile(process.cwd() + '/components.json', 'utf8', function (err, data) {
  if (err) console.log(err);
  try {
    const arr = Object.keys(JSON.parse(data));
    arr.forEach(key => {
      generatorComMd(key)
    });
  } catch (error) {
    console.log('err', err)
  }
});



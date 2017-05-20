#!/usr/bin/env node

var commander = require('commander');
var compile = require('./');
var yaml = require('js-yaml');

commander
  .version(require('./package.json').version)
  .arguments('<files...>')
  .option('-m, --model [model]', 'compile given model, default all', '')
  .option('-f, --format [format]', 'output format: json or yaml [json]', 'json')
  .action(function(files) {
    var format = commander.format || 'json';
    var model = commander.model || '';
    var results = [];
    files.forEach(function(file){
        var result = compile(file, model);
        results.push(result);
    })
    var r = {"definitions": {}};

    results.forEach(function(result){
        var keys = Object.keys(result["definitions"]);
        for (var i = 0, length = keys.length; i < length; ++i) {
            var key = keys[i];
            r["definitions"][key] = result["definitions"][key];
        }
    });
    
    if (format === 'json')
      process.stdout.write(JSON.stringify(r, false, 2) + '\n');
    else if (format === 'yaml')
      process.stdout.write(yaml.dump(r, { noRefs: true }));
  })
  .parse(process.argv);

# proto2schema

Compiles [Protocol Buffer IDL](https://developers.google.com/protocol-buffers/docs/proto3)
to [JSON Schema](http://json-schema.org) definitions.

## Usage

You can use `proto2schema` as a command line tool, or as a function in node.

The CLI can output JSON or YAML (e.g. for Swagger). If you specify a protobuf message
name along with a file, it will output just that message and all dependencies. Otherwise,
it will output all messages.

```shell
$ npm install proto2schema -g
$ proto2schema --help

  Usage: cli [options] <files...>

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -m, --model [model]    compile given model, default all
    -f, --format [format]  output format: json or yaml [json]
```

In node, `proto2schema` exports a single function that returns an object
with the JSON Schema model.

```javascript
var compile = require('proto2schema');

var all = compile('models.proto');
var single = compile('models.proto', 'MyModel');
```

## License

MIT

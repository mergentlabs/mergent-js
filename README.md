# Mergent JavaScript Library

[![npm version](https://badge.fury.io/js/mergent.svg)](https://badge.fury.io/js/mergent)
[![CI](https://github.com/mergentlabs/mergent-js/actions/workflows/ci.yml/badge.svg)](https://github.com/mergentlabs/mergent-js/actions/workflows/ci.yml)

The Mergent JavaScript library provides convenient access to the Mergent API
from applications written in the JavaScript language.

## Installation

Install the package with:

```sh
npm install mergent --save
# or
yarn add mergent
```

## Usage

The library needs to be configured with your project's API key. Set
`Mergent.api_key` to its value:

```js
const Mergent = require("mergent");

// set the Mergent API key
const mergent = new Mergent("...");

// create a Task
mergent.tasks
  .create({
    request: { url: "..." },
  })
  .then((task) => console.log(task))
  .catch((error) => console.error(error));
```

### Usage with TypeScript

```ts
import Mergent from "mergent";

// set the Mergent API key
const mergent = new Mergent("...");

// create a Task
mergent.tasks
  .create({
    request: { url: "..." },
  })
  .then((task) => console.log(task))
  .catch((error) => console.error(error));
```

See the [Mergent JavaScript docs](https://docs.mergent.co/libraries/javascript)
for more details.

## Development

After checking out the repo, run `npm install` to install dependencies. Then,
run `npm test` to run the tests.

## Contributing

Bug reports and pull requests are welcome on GitHub at
https://github.com/mergentlabs/mergent-js.

## Distributing

1. Update the version with `npm version <version>`
1. Package with `npm run package`
1. Publish with `npm publish`

## License

The gem is available as open source under the terms of the
[MIT License](https://opensource.org/licenses/MIT).

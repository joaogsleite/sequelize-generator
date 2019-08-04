
# Sequelize generator

CLI tool to generate sequelize models based on simple JSON config

## Install

* inside your project 

```
npm install --save-dev sequelize-generator
```

* globally

```
npm install -g sequelize-generator
```

## Using

```
sequelize-generator <folder>
```

* Sequelize models will be created inside `<folder>`
* `<folder>` must contains a `config.json` file like this `example/config.json`
* You can create a script in your project's package.json to run this way: `npm run sequelize-generator`

```
...
"scripts": {
  ...
  "sequelize-generator": "sequelize-generator ./src/models/",
  ...
},
...
```

## Example `config.json`

```json
[
  {
    "table": "users",
    "model": "User",
    "fields": {
      "name": "String",
      "email": "String",
      "password": "String"
    },
    "relations": [
      { "type": "1:n", "model": "Post" }
    ]
  },
  {
    "table": "posts",
    "model": "Post",
    "fields": {
      "title": "String"
    },
    "relations": [
      { "type": "n:n", "model": "Tag" }
    ]
  },
  {
    "table": "tags",
    "model": "Tag",
    "fields": {
      "name": "String"
    },
    "relations": [
      { "type": "n:n", "model": "Post" }
    ]
  }
]
```

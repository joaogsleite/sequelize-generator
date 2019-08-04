
# Sequelize generator

CLI tool to generate sequelize models based on simple JSON config

## Using

```
npm start <folder>
```

* `<folder>` must contains a `config.json` file like in `example/config.json`
* The sequelize models files will be created inside `<folder>`


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

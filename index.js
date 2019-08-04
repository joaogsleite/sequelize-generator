#!/usr/bin/env node

const { readConfigFile, render } = require('./utils')

const FOLDER_PATH = process.argv[2]

function handleTable({ tableName, modelName, fields, relations, otherTables }) {
  const modelImports = ''
  const schema = ''
  const associations = ''
  const toJsonMethod = ''
  otherTables.forEach((table = {}) => {
    (table.relations || []).forEach((relation) => {
      if (relation.model === modelName) {
        if (!relations.find((r) => r.model === table.model)) {
          relations.push({
            model: table.model,
            type: relation.type === 'n:n' 
              ? 'n:n' 
              : relation.type === 'n:1' 
                ? '1:n'
                : 'n:1'
          })
        }
      }
    })
  })
  relations.forEach((relation) => {
    if (relation.type === 'n:n') {
      const models = [
        relation.model.toLowerCase(), 
        modelName.toLowerCase(),
      ].sort((a, b) => a.localeCompare(b))
      const otherTable = otherTables.find(({model}) => model === relation.model)
      relation.table = relation.table || models.join('')
      relation.field = relation.field || modelName.toLowerCase() + 'Id'
      relation.otherField = relation.otherField || 
        otherTable.relations.find(r => r.model === modelName).field ||
        otherTable.model.toLowerCase() + 'Id'

    } else if (relation.type === '1:n') {
      relation.table = relation.table || otherTables.find(({model}) => model === relation.model).table
      relation.field = relation.field || modelName.toLowerCase() + 'Id'
    } else if (relation.type === 'n:1') {
      relation.table = relation.table || tableName
      relation.field = relation.field || relation.model.toLowerCase() + 'Id'
    }
  })
  const data = { tableName, fields, relations, modelName, modelImports, schema, associations, toJsonMethod }
  render('Model.js', data, FOLDER_PATH, `${modelName}.js`)
  render('Model.d.ts', data, FOLDER_PATH, `${modelName}.d.ts`)
}

async function main() {
  const config = await readConfigFile(FOLDER_PATH)
  if (Array.isArray(config)) {
    config.forEach((table, index, tables) => {
      const { table: tableName, model: modelName, fields, relations } = table
      const otherTables = tables.filter((table) => {
        const { table: otherTableName } = table
        return otherTableName !== tableName
      })
      handleTable({ tableName, modelName, fields, relations, otherTables })
    })
  } else {
    console.error('Invalid config format')
  }
}

main()

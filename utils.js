const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

function readConfigFile(folderPath) {
  const filePath = path.join(folderPath, 'config.json')
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(error)
      } else {
        const json = JSON.parse(data)
        resolve(json)
      }
    })
  })
}

function render(template, data, destFolder, fileName) {
  return new Promise((resolve, reject) => {
    const options = {}
    const templatePath = path.join(__dirname, 'templates', template)
    ejs.renderFile(templatePath, data, options, (error, result) => {
      if (error) {
        reject(error)
      } else {
        const destFile = path.join(destFolder, fileName)
        fs.writeFile(destFile, result, (error) => {
          if (error) {
            reject(error)
          } else {
            resolve()
          }
        })
      }
    })
  })
  
}

module.exports = {
  readConfigFile,
  render,
}

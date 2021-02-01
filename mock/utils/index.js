const {
  Random
} = require('mockjs2')
const {
  join
} = require('path')
const fs = require('fs')

function handleRandomImage(width = 50, height = 50) {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return `https://picsum.photos/${width}/${height}?random=${Random.guid()}`
}

function handleMockArray() {
  const mockArray = []
  const getFiles = (jsonPath) => {
    const jsonFiles = []
    const findJsonFile = (path) => {
      const files = fs.readdirSync(path)
      files.forEach((item) => {
        const fPath = join(path, item)
        const stat = fs.statSync(fPath)
        if (stat.isDirectory() === true) findJsonFile(item)
        if (stat.isFile() === true) jsonFiles.push(item)
      })
    }
    findJsonFile(jsonPath)
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    jsonFiles.forEach((item) => mockArray.push(`./controller/${item}`))
  }
  getFiles('mock/controller')
  return mockArray
}
module.exports = {
  handleRandomImage,
  handleMockArray,
}

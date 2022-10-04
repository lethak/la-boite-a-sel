const path = require('path')
const fs = require('fs')

const isDirectorySync = (path) => {
  let isDir = false
  try {
    isDir = fs.statSync(path).isDirectory()
  } catch (err) {
    // DNT
    console.error(err)
  }
  return isDir
}

const listAllInDir = async (directoryPath) => {
  return new Promise((resolve, reject) => {
    const result = []
    const isExistingDirectoryPath = fs.existsSync(directoryPath)
    const isDirectoryPathAValidDirectory = isDirectorySync(directoryPath)

    if (!isExistingDirectoryPath) {
      const err = new Error(
        'ERROR [listAllFiles]: directoryPath do not exists: ' + directoryPath
      )
      console.error(err.message, {
        directoryPath,
        isExistingDirectoryPath,
        isDirectoryPathAValidDirectory,
      })
      return reject(err)
    }

    if (!isDirectoryPathAValidDirectory) {
      const err = new Error(
        'ERROR [listAllFiles]: directoryPath must be a valid directory: ' +
          directoryPath
      )
      console.error(err.message, {
        directoryPath,
        isExistingDirectoryPath,
        isDirectoryPathAValidDirectory,
      })
      return reject(err)
    }

    // passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
      //handling error
      if (err) {
        console.error(
          'ERROR [listAllFiles] readdir unable to scan directory: ' + err
        )
        return reject(err)
      }
      //listing all files using forEach
      files.forEach(function (fileName) {
        const filePath = path.resolve(path.join(directoryPath, fileName))
        const fileStat = {
          filePath,
          fileName,
          directoryPath,
          // ext: fileName.substr(fileName.indexOf('.')) ?? null,
          isDirectory: isDirectorySync(filePath),
        }
        result.push(fileStat)
      })
      return resolve(result)
    })
  })
}

const listAllFiles = async (directoryPath) => {
  const files = await listAllInDir(directoryPath)
  return files.filter((item) => !item.isDirectory)
}

const renameFile = async (currentPath, destinationPath) => {
  return new Promise((resolve, reject) => {
    fs.rename(currentPath, destinationPath, function (err) {
      if (err) {
        return reject(err)
      } else {
        console.log('Successfully moved the file!')
        return resolve({
          newFilePath: destinationPath,
          oldFilePath: currentPath,
        })
      }
    })
  })
}

const copyFile = async (sourcePath, destinationPath) => {
  return new Promise((resolve, reject) => {
    // File destination.txt will be created or overwritten by default.
    fs.copyFile(sourcePath, destinationPath, (err) => {
      if (err) {
        return reject(err)
      }
      console.log('Successfully copied the file!', {
        sourcePath,
        destinationPath,
      })
      return resolve(true)
    })
  })
}

const deleteFile = async (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log('[deleteFile] File cannot be deleted ', { err })
        return resolve(false)
      }
      console.log('[deleteFile] File is deleted ', { filePath })
      return resolve(true)
    })
  })
}

const writeFile = async (fileFullPath, content = '') => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileFullPath, content, function (err) {
      if (err) {
        console.error('[writeFile] ERROR : ', { err })
        return resolve(false)
      }
      return resolve(true)
    })
  })
}

const createDirectoryIfNotExists = async (path, recursive = true) => {
  if (!fs.existsSync(path)) {
    return fs.mkdirSync(path, { recursive })
  }
  return false
}

module.exports = {
  isDirectorySync,
  listAllInDir,
  listAllFiles,
  renameFile,
  deleteFile,
  writeFile,
  createDirectoryIfNotExists,
  copyFile,
}

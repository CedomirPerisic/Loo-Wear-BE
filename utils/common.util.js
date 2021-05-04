const fs = require('fs');
const path = require('path');

exports.removeOldFile = (filePath) => {
  const rootPath = path.dirname(require.main.filename);
  fs.unlink(path.join(rootPath, filePath), (error) => {
    if (!error) {
      console.log(`File ${filePath} is removed`);
    }
  });
};

const fs = require('fs').promises;
const path = require('path');

const boysFolder = path.join(__dirname, 'boys');
const girlsFolder = path.join(__dirname, 'girls');

const changeFolder = (gender, fromFolder, toFolder) => {
    fs.readdir(fromFolder).then((files)=> files.forEach(file => {
        fs.readFile(path.join(fromFolder, file))
            .then(student => {
                if(JSON.parse(student).gender === gender){
                    fs.rename(path.join(fromFolder,file), path.join(toFolder,file),
                    console.log(`${JSON.parse(student).name}: folder have changed`))
                }
                else console.log(`${JSON.parse(student).name}: is in correct folder`)
            } )
    }))
}

changeFolder('female', boysFolder, girlsFolder)
changeFolder('male', girlsFolder, boysFolder)
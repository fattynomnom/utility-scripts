const fs = require('fs')
const path = require('path')

const jsonData = require('./inputs/inputJsonFile.json')

/**
 * Converts JSON files to CSV.
 * To use:
 * 1. Put file inside /src/inputs directory
 * 2. Update the imported `jsonData` file path
 * 3. Run script with `node src/JsonToCsv.js`
 * 4. Read output inside /src/outputs directory
 */
const jsonToCsv = () => {
    const replacer = (key, value) => (value === null ? '' : value) // specify how you want to handle null values here
    const header = Object.keys(jsonData[0])
    let csv = jsonData.map(row =>
        header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(',')
    )
    csv.unshift(header.join(','))
    csv = csv.join('\r\n')

    fs.writeFile(path.join(__dirname, './outputs/outputCsvFile.csv'), csv, {}, async writeError => {
        if (writeError) {
            console.log(writeError)
        }
    })
}

jsonToCsv()

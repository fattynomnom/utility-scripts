const fs = require('fs')
const path = require('path')

/**
 * Converts CSV files to JSON.
 * To use:
 * 1. Put file inside /src/inputs directory
 * 2. Update the file path of `schemaPath` variable
 * 3. Run script with `node src/CsvToJson.js`
 * 4. Read output inside /src/outputs directory
 */
const csvToJson = () => {
    const schemaPath = path.join(__dirname, './inputs/inputCsvFile.csv')
    fs.readFile(schemaPath, (err, data) => {
        if (err) {
            console.log(err)
            throw err
        }

        const lines = data.toString('utf-8').split('\n')
        const result = []
        const headers = lines[0].split(',')

        for (let i = 1; i < lines.length; i++) {
            const obj = {}
            const currentline = lines[i].split(',')

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j]
            }

            result.push(obj)
        }

        fs.writeFile(
            path.join(__dirname, './outputs/outputJsonFile.json'),
            JSON.stringify(result),
            {},
            async writeError => {
                if (writeError) {
                    console.log(writeError)
                }
            }
        )
    })
}

csvToJson()

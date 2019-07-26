import chalk from 'chalk'
import fs from 'fs'
import path from 'path'



console.log(chalk.cyan('Copying local environments'))
/* eslint-disable */
fs.readFile(path.join(__dirname, '.local.env'), (err, data) => {
    if (err) throw err
    fs.writeFile('.env', data, (err) => {
        if (err) throw err
        console.log(chalk.green('Environments file copied successfully'))
    })
})
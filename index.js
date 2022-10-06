import ExcelJS from 'exceljs'
import { readFile } from 'fs/promises'

let excelFile = await readFile("public/Sep-12-Basketball.xlsx").catch(err => console.log(err))
const workbook = new ExcelJS.Workbook();
await workbook.xlsx.load(excelFile);
console.log(`File Loaded with ${workbook.worksheets.length} worksheets\n`)

let dayWorksheets = [];
let regex = /\b((mon|tue|wed(nes)?|thu(rs)?|fri|sat(ur)?|sun)(day)?)\b/gi
workbook.eachSheet((sheet, id) => {
    if(sheet.name.match(regex)) dayWorksheets.push(workbook.getWorksheet(id))
})
console.log(dayWorksheets.map(s => s.name).join(','));
console.log(dayWorksheets.length)

// Get Players
let playWorksheet = workbook.getWorksheet("Jojo Bettors")
let players = [];
playWorksheet.eachRow(row => {
    if(row._cells[0].value === null) return
    players.push({name: row._cells[0].value, tong: row._cells[1].value, comm: row._cells[2].value, bets: []})
})
console.log(players)

let currWorksheet = dayWorksheets[0];
let row = currWorksheet.getRow(1).values;
let rowNums = [];
let rowFiltered = row.filter((cell, index) => {
    if(cell.formula?.includes("Jojo Bettors")) {
        players.forEach(player => {
            // if(player.name === cell.formula.result) // do something
        })
        cell.index = index
        return cell
    }
})
console.log(rowFiltered)
let col = currWorksheet.columns;
let columns = [];

rowFiltered.forEach(row => {
    columns.push(currWorksheet.getColumn(row.index))
})
// console.log(columns);

columns[0].values.forEach(cell => {
    if(typeof(cell) == "number") {
    }
})
console.log();
// console.log(col)
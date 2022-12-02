import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from 'url';
import * as readline from "readline";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

function readFileAsLines(fileName) {
    const filePath = path.join(__dirname, fileName)
    const fileStream = fs.createReadStream(filePath);

    return readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
}

async function computeCalories(lines) {
    let sum = 0;
    for await (const line of lines) {
        let calories = parseInt(line);
        sum += calories
    }
    return sum;
}

describe('Day 1: Calorie Counting. ', () => {

    describe('#1 How many calories carries the Elf with the most calories', () => {

        it('get sum of elf inventory', async () => {
            const lines = readFileAsLines('./get_sum');

            const sum = await computeCalories(lines);

            expect(sum).toBe(100)
        })

    })

})

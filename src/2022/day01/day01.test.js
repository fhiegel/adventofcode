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

function readFileAsString(fileName) {
    const filePath = path.join(__dirname, fileName)
    return fs.readFileSync(filePath, {
        encoding: "utf8"
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

function mapInventoriesToCalories(fileAsString) {
    let lines = fileAsString.split('\n');

    let inventoryIndex = 0;
    return lines
        .reduce((inventories, item, index) => {
            if (0 < item.length) {
                inventories[inventoryIndex].push(parseInt(item))
            } else {
                inventoryIndex++
                inventories[inventoryIndex] = []
            }
            return inventories
        }, [[]])
        .filter(inventory => 0 < inventory.length)
        .map(inventory => inventory.reduce((total, current) => total + current), 0);
}

function computeInventoriesMaxCalories(fileAsString) {
    const lines = mapInventoriesToCalories(fileAsString)
    return Math.max(...lines);
}

describe('Day 1: Calorie Counting. ', () => {

    describe('#1 How many calories carries the Elf with the most calories', () => {

        it('get sum of elf inventory', async () => {
            const lines = readFileAsString('./get_sum');

            const max = computeInventoriesMaxCalories(lines);

            expect(max).toBe(100)
        })

        it('get max of elves inventories', async () => {
            const fileAsString = readFileAsString('./get_max');

            const max = computeInventoriesMaxCalories(fileAsString)

            expect(max).toBe(40)
        })

        it('get answer to my puzzle', async () => {
            const fileAsString = readFileAsString('./input');

            const max = computeInventoriesMaxCalories(fileAsString)

            expect(max).toBe(70613)
        })

    })

})

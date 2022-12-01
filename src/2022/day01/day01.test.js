import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from 'url';
import * as readline from "readline";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

function computeCalories(input) {
    return 0;
}

describe('Day 1: Calorie Counting. ', () => {

    describe('#1 How many calories carries the Elf with the most calories', () => {

        it('get sum of elf inventory', async () => {
            const filePath = path.join(__dirname, './get_sum')
            const fileStream = fs.createReadStream(filePath);

            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity,
            });
            for await (const line of rl) {
                console.log(`Line from file: ${ line }`);
            }

            const sum = computeCalories(rl);

            expect(sum).toBe(100)
        })

    })

})

const request = require('request-promise')
const sleep = require('sleep-promise')
const fs = require('fs');

const games = 6413
const gamesPerPage = 100
const pages = Math.round(games / gamesPerPage)

const results = [];
let needWait = false;

const run = async () => {
    for (let i = 1; i < pages; i++) {
        if (needWait) {
            needWait = false;
            await sleep(60000 * 3);
        }

        try {
            const response = await request(`https://lichess.org/api/user/BeepBeepImAJeep/games?with_opening=1&nb=100&rated=1&page=${i}`);
            results.push(response);
            fs.writeFile('BeepBeepImAJeep.json', JSON.stringify(results), (err) => {
                if (err) console.log(err);
            });
        } catch (error) {
            console.log('Error...', error.body);
            needWait = true;
            i--
        }

        console.log('Progress', Math.round((i / pages) * 100), '%')

        await sleep(10000);
    }
}

run();
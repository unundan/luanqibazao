import fs, { Dirent } from 'fs';
import path from 'path';
type pick = {
    name: string,
    path: string,
}
let picks: pick[];
function frush() {
    const dirs: Dirent[] = fs.readdirSync('./public/random-pick', { withFileTypes: true });
    picks = [];
    for (const dir of dirs) {
        if (dir.isFile()) {
            picks.push({
                name: dir.name,
                path: path.resolve(__dirname, dir.name),
            })
        }
    }
}
frush();
setInterval(frush, 5000);
function getOne(): pick | null {
    const pickLength = picks.length;
    return picks[Math.floor(Math.random() * (pickLength + 1))];
}
export { getOne }
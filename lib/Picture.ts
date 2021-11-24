import fs, { Dirent } from 'fs';
import path from 'path';
type pick = {
    // 图片的名称
    name: string,
    // 图片的服务器路径
    path: string,
}
// 定义一个图片结构数组,作为缓存
let picks: pick[];
// 定义刷新数组的方法
function frush() {
    // 扫描一个文件夹
    const dirs: Dirent[] = fs.readdirSync('./public/random-pick', { withFileTypes: true });
    // 清空缓存
    picks = [];
    // 循环这个文件夹下的文件
    for (const dir of dirs) {
        // 如果是文件
        if (dir.isFile()) {
            // 把这个文件放入pic数组
            picks.push({
                name: dir.name,
                path: path.resolve(__dirname, dir.name),
            })
        }
    }
}
// 执行一次刷新缓存
frush();
// 设置循环,每5000秒执行一次刷新缓存方法
setInterval(frush, 5000);
// 定义获取一个图片方法
function getOne(): pick | null {
    const pickLength = picks.length;
    // 这里有几率数组越界导致返回undefind, 作业: 修复它
    return picks[Math.floor(Math.random() * (pickLength + 1))];
}
// 把getOne方法导出,供其他地方调用
export { getOne }
import { cpSync, mkdirSync, rmSync } from 'node:fs';
rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');
cpSync('index.html', 'dist/index.html');
cpSync('assets', 'dist/assets', { recursive: true });
console.log('Site estático preparado em dist/');

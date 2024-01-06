import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gitignore = fs.readFileSync(path.resolve(__dirname, '..', '.gitignore'), 'utf8');
const easignore = gitignore.split('### EASINCLUDE! ###')[0];
fs.writeFileSync(path.resolve(__dirname, '..', '.easignore'), easignore);

// Converte PNGs de vibe_images/ para web/assets/scenes/<nome>.jpg (1200x800, q85).
// Uso: node scripts/scenes-to-jpg.mjs nome1 nome2 ...  (sem extensão)
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { readdirSync } from 'node:fs';
import Jimp from 'jimp';

const names = process.argv.slice(2);
const dir = 'vibe_images';
const out = 'web/assets/scenes';

for (const name of names) {
  const files = readdirSync(dir).filter((f) => f.startsWith(name + '_') && f.endsWith('.png'));
  if (!files.length) { console.log('sem png:', name); continue; }
  files.sort();
  const src = `${dir}/${files[files.length - 1]}`;
  const dest = `${out}/${name}.jpg`;
  if (existsSync(dest)) { console.log('ja existe:', dest); continue; }
  const img = await Jimp.read(readFileSync(src));
  img.cover(1200, 800).quality(85);
  writeFileSync(dest, await img.getBufferAsync(Jimp.MIME_JPEG));
  console.log('ok:', dest);
}

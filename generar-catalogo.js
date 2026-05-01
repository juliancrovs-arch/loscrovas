// Este script se ejecuta en Netlify al hacer deploy
// Lee los archivos de _data/pipas/ y genera catalogo.json
const fs = require('fs');
const path = require('path');

const pipasDir = path.join(__dirname, '_data', 'pipas');
const outputFile = path.join(__dirname, 'catalogo.json');

if (!fs.existsSync(pipasDir)) {
  fs.writeFileSync(outputFile, JSON.stringify([]));
  console.log('No hay pipas todavía');
  process.exit(0);
}

const archivos = fs.readdirSync(pipasDir).filter(f => f.endsWith('.json') || f.endsWith('.md'));
const pipas = [];

archivos.forEach(archivo => {
  try {
    const contenido = fs.readFileSync(path.join(pipasDir, archivo), 'utf8');
    const pipa = JSON.parse(contenido);
    pipas.push(pipa);
  } catch(e) {
    console.error('Error leyendo', archivo, e.message);
  }
});

fs.writeFileSync(outputFile, JSON.stringify(pipas, null, 2));
console.log(`catalogo.json generado con ${pipas.length} pipas`);

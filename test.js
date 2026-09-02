require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function run() {
  try {
    const res = await pool.query('SELECT * FROM "Template"');
    console.log(JSON.stringify(res.rows, null, 2));
    
    // Check if LPU Official General CV exists
    const exists = res.rows.find(r => r.name.toLowerCase().includes('general'));
    if (!exists) {
      console.log('Inserting LPU Official General CV');
      await pool.query(`
        INSERT INTO "Template" 
        (id, name, slug, category, "shortDescription", "thumbnailImage", "badge", "isFeatured", "displayOrder", status, "createdAt", "updatedAt") 
        VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
      `, [
        'general-' + Date.now(),
        'LPU Official General CV',
        'lpu-official-general-cv',
        'LPU',
        'The official format for general placements.',
        '/assets/lpu-resume-template.png',
        'New',
        false,
        3,
        'PUBLISHED'
      ]);
      console.log('Inserted.');
    }
  } catch(e) {
    console.error(e);
  } finally {
    pool.end();
  }
}

run();

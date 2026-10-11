/* JARVIS V6 PMX gallery extension. Localhost-only; no change to existing AI/calling endpoints. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const ROOT = process.cwd();
const CHAR = path.join(ROOT, 'assets', 'characters');
const GALLERY = path.join(CHAR, 'gallery');
const ACTIVE = path.join(CHAR, 'jarvis');
const SELECTION = path.join(CHAR, 'selected_pmx.json');
const ALLOWED = new Set(['v1','v3','v4','v5','v6','v7','v8']);
let busy = false;
function getModels() {
  const arr = JSON.parse(fs.readFileSync(path.join(GALLERY,'manifest.json'),'utf8'));
  return arr.filter(x => ALLOWED.has(x.id));
}
function currentId() {
  try { const x=JSON.parse(fs.readFileSync(SELECTION,'utf8')); if(ALLOWED.has(x.id)) return x.id; } catch {}
  return 'v6'; // Original JARVIS V6 default is Burnice
}
function ensureBundle(folder) {
  const model=path.join(folder,'model.pmx');
  const tex=path.join(folder,'textures.json');
  if(!fs.existsSync(model) || !fs.existsSync(tex) || !fs.existsSync(path.join(folder,'textures'))) throw new Error('Incomplete PMX bundle');
  if(fs.readFileSync(model).subarray(0,4).toString('ascii')!=='PMX ') throw new Error('Invalid PMX signature');
  const mapping=JSON.parse(fs.readFileSync(tex,'utf8'));
  if (!mapping.textures || !Object.keys(mapping.textures).length) throw new Error('No textures in PMX');
  for (const rel of Object.values(mapping.textures)) {
    if(typeof rel!=='string'||!rel.startsWith('textures/'))throw new Error('Invalid texture map');
    const full=path.resolve(folder,rel);
    if(!full.startsWith(path.resolve(folder)+path.sep)||!fs.existsSync(full))throw new Error('Missing texture: '+rel);
  }
}
async function switchTo(id) {
  if(!ALLOWED.has(id)) throw new Error('Unsupported PMX variant');
  const src=path.join(GALLERY,id);
  ensureBundle(src);
  const staged=path.join(CHAR, '.pmx-staged-'+process.pid);
  const backup=path.join(CHAR, '.pmx-backup-'+process.pid);
  fs.rmSync(staged,{recursive:true,force:true});
  fs.rmSync(backup,{recursive:true,force:true});
  let backedUp=false;
  try {
    fs.cpSync(src,staged,{recursive:true});
    ensureBundle(staged);
    if(fs.existsSync(ACTIVE)){fs.renameSync(ACTIVE,backup);backedUp=true;}
    try {fs.renameSync(staged,ACTIVE);} catch(err){
      if(backedUp)fs.renameSync(backup,ACTIVE);
      backedUp=false;
      throw err;
    }
    fs.writeFileSync(SELECTION, JSON.stringify({id,selectedAt:new Date().toISOString()},null,2),'utf8');
    if(backedUp)fs.rmSync(backup,{recursive:true,force:true});
  } finally {
    fs.rmSync(staged,{recursive:true,force:true});
  }
}
function mountPMXGallery(app, express) {
  app.use('/assets/characters/jarvis', (req,res,next)=>{res.setHeader('Cache-Control','no-store, max-age=0');next()});
  app.get('/api/pmx-gallery',(_req,res)=>{
    try { res.setHeader('Cache-Control','no-store');res.json({models:getModels(),selected:currentId(),reloadAfterSelection:true}); }
    catch (err){res.status(500).json({error:err.message});}
  });
  app.post('/api/pmx-gallery/select',express.json({limit:'8kb'}),async (req,res)=>{
    const id=req.body && req.body.id;
    if(typeof id!=='string'||!ALLOWED.has(id))return res.status(400).json({error:'Choose one of the seven supported PMX models'});
    if(busy)return res.status(409).json({error:'Another model is being applied'});
    busy=true;
    try {await switchTo(id);res.json({ok:true,selected:id,reload:true});}
    catch(err){res.status(500).json({error:err.message||'PMX switch failed'});}
    finally{busy=false;}
  });
  console.log('[PMX Gallery] Seven-model selector mounted: /pmx-gallery.html');
}
exports.mountPMXGallery=mountPMXGallery;

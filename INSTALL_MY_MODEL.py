# Install selected character from user's ORIGINAL ZIP, without copying or renaming it.
from pathlib import Path, PurePosixPath
import zipfile, json, sys, os, re, shutil
HERE=Path(__file__).resolve().parent
CONFIG=json.loads((HERE/'MODEL_VARIANT.json').read_text(encoding='utf-8'))
# local folders plus user's normal Downloads (including OneDrive-linked Downloads)
roots=[HERE,Path.home()/'Downloads',Path.home()/'Desktop',Path.home()/'OneDrive'/'Downloads',Path.home()/'OneDrive'/'Desktop']
archive_candidates=[]
for r in roots:
    if r.is_dir():
        try: archive_candidates.extend(p for p in r.iterdir() if p.suffix.lower()=='.zip')
        except OSError: pass
for r in roots:
    if r.is_dir():
        try:
            for sub in r.iterdir():
                if sub.is_dir() and sub.name.lower().startswith(('jarvis','myra')):
                    archive_candidates.extend(p for p in sub.iterdir() if p.suffix.lower()=='.zip')
        except OSError: pass
# Match archive by its original filename stem; tolerant of Windows ' (1)' suffixes.
def normalize(s):
    return re.sub(r'(?:\s*\(\d+\))+?(?=\.|$)','',s).casefold()
want=normalize(CONFIG['source_zip'])
found=sorted(set(p for p in archive_candidates if normalize(p.name)==want),key=lambda p:(0 if p.parent==HERE else 1,len(p.name)))
if not found:
    print('MODEL SOURCE NOT FOUND. Please keep the ORIGINAL archive in Downloads:')
    print(' ',CONFIG['source_zip'])
    print('You do NOT need to rename or copy it into JARVIS.')
    sys.exit(2)
zpath=found[0]
with zipfile.ZipFile(zpath) as z:
    entries=[m for m in z.infolist() if not m.is_dir()]
    options=[m for m in entries if m.filename.lower().endswith('.pmx') and CONFIG['model_keyword'] in m.filename]
    if not options:
        print('Could not find selected character PMX in',zpath);sys.exit(3)
    chosen=max(options,key=lambda m:m.file_size)
    if z.read(chosen)[:4]!=b'PMX ':raise SystemExit('Invalid PMX header')
    folder=chosen.filename.rsplit('/',1)[0]+'/' if '/' in chosen.filename else ''
    target=HERE/'assets'/'characters'/'jarvis'
    target.mkdir(parents=True,exist_ok=True)
    (target/'model.pmx').write_bytes(z.read(chosen))
    mapping={};count=0
    for m in entries:
        if not m.filename.startswith(folder) or not m.filename.lower().endswith(('.png','.jpg','.jpeg','.bmp','.tga','.webp')): continue
        rel=m.filename[len(folder):].replace('\\','/')
        parts=PurePosixPath(rel).parts
        if not rel or rel.startswith('/') or '..' in parts:continue
        dest=target/'textures'/rel
        dest.parent.mkdir(parents=True,exist_ok=True)
        dest.write_bytes(z.read(m))
        value='textures/'+rel
        mapping[rel]=value;mapping[rel.replace('/','\\')]=value;mapping[PurePosixPath(rel).name]=value
        count+=1
    if not count:raise SystemExit('No textures found')
    manifest={'model':'model.pmx','textures':mapping}
    (target/'textures.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
    assert all((target/path).is_file() for path in manifest['textures'].values())
    (target/'installed_variant.txt').write_text(CONFIG['label']+'\n'+chosen.filename+'\n',encoding='utf-8')
    print('SUCCESS: '+CONFIG['label'])
    print('Archive:',zpath)
    print('PMX:',chosen.filename)
    print('Textures:',count)
    print('Model path:',target/'model.pmx')

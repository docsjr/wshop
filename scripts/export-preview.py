"""Package a local, navigable review. Does not publish or access the network."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import posixpath
import re
import sys

root = Path(__file__).resolve().parent.parent / 'dist'
output = Path(sys.argv[1]) if len(sys.argv) > 1 else root.parent.parent / 'DocLiv-previa-navegavel.zip'
assert (root / 'index.html').is_file(), 'Execute npm run build primeiro.'
count = 0
with ZipFile(output, 'w', ZIP_DEFLATED) as archive:
    for file in sorted(root.rglob('*')):
        if not file.is_file():
            continue
        relative = file.relative_to(root).as_posix()
        if relative.startswith('qa') or relative in ['_headers', 'robots.txt']:
            continue
        data = file.read_bytes()
        if file.suffix == '.html':
            def local(match):
                attr, value = match.groups()
                path, sep, fragment = value.partition('#')
                target = path.lstrip('/')
                if path.endswith('/'):
                    target += 'index.html'
                assert (root / target).is_file(), target
                url = posixpath.relpath(target, posixpath.dirname(relative) or '.')
                return attr + '="' + url + (sep + fragment if sep else '') + '"'
            data = re.sub(r'(href|src)="(/[^\"]*)"', local, data.decode()).encode()
            count += 1
        archive.writestr('DocLiv-previa/' + relative, data)
    archive.writestr('DocLiv-previa/LEIA-ME.txt',
        'PREVIA LOCAL — NAO PUBLICADA\nExtraia a pasta inteira e abra index.html no navegador.\n'
        'Compras e contatos abrem os canais externos oficiais e precisam de internet.\n'
        'Versão de revisão: auditoria final e autorização de publicação pendentes.\n')
with ZipFile(output) as archive:
    assert archive.testzip() is None
print(f'{count} páginas empacotadas: {output}')

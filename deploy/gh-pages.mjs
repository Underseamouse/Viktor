// Push the built dist/ to the gh-pages branch. Usage: npm run deploy
import { execSync } from 'node:child_process'
import { cpSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const remote = execSync('git config --get remote.origin.url').toString().trim()
const dir = mkdtempSync(join(tmpdir(), 'gh-pages-'))
cpSync('dist', dir, { recursive: true })
writeFileSync(join(dir, '.nojekyll'), '')
const run = (cmd) => execSync(cmd, { cwd: dir, stdio: 'inherit' })
run('git init -q')
run('git checkout -q -b gh-pages')
run('git add -A')
run('git -c user.name="deploy" -c user.email="deploy@local" commit -q -m "Deploy site"')
run(`git push -f ${remote} gh-pages`)
rmSync(dir, { recursive: true, force: true })
console.log('Deployed dist/ to gh-pages')

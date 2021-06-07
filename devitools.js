const Path = require('path')

/**
 * @param command
 * @param {string} pwd
 * @param {string} name
 * @param {string} short
 * @private
 */
async function update (command, pwd, name, short) {
  const files = [
    '.environment/stage/docker-compose.yml',
    '.tevun/hooks/install.sh',
    '.tevun/hooks/setup.sh',

    'frontend/public/statics/site.webmanifest',
    'frontend/.env.defaults',
    'frontend/.env.example',
    'frontend/package.json',
    'frontend/quasar.conf.js',

    'backend/.env.defaults',
    'backend/.env.example',
    'backend/composer.json',
    'backend/docker-compose.yml.example',
    'backend/makefile',

    '.devitools.json',
  ]
  for (const file of files) {
    const filename = Path.resolve(pwd, file)
    const string = String(command.readFile(filename))
    const content = string
      .replace(/replace\.app\.name/g, name)
      .replace(/replace\.app\.short/g, short)
    command.writeFile(filename, content)
  }
}

/**
 * @param command
 * @param pwd
 * @param options
 * @return {Promise<void>}
 */
module.exports = async function (command, pwd, options) {
  command.unlink(Path.resolve(pwd, '.git'))
  command.unlink(Path.resolve(pwd, 'frontend/@devitools'))
  command.unlink(Path.resolve(pwd, 'backend/@devitools'))

  const { name, short, git } = options

  await update(command, pwd, name, short)

  return git
    .init()
    .checkoutLocalBranch('main')
    .add('.devitools.json')
    .commit('(main)')
    .submoduleAdd('https://github.com/devitools/quasar', './frontend/@devitools')
    .submoduleAdd('https://github.com/devitools/laravel', './backend/@devitools')
    .add('.')
    .commit('(init)')
}

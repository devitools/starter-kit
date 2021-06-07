/**
 * @param command
 * @param git
 * @return {Promise<void>}
 */
module.exports = async function(command, git) {
  await git
    .init()
    .checkoutLocalBranch('main')
    .add('.devitools.json')
    .commit('init')
    .submoduleAdd('https://github.com/devitools/quasar', './frontend/@devitools')
    .submoduleAdd('https://github.com/devitools/laravel', './backend/@devitools')
    .add('.')
    .commit('init')
}

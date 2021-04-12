const { program } = require('commander')
const chalk = require('chalk')

program
.command('create <app-name>')
.description('create a new project')
.option('-f, --force', 'overwrite target directory if it exists')
.action((name, cmd) => {
  require('./create/index.js')(name, cmd)
})

program
.on('--help' , () => {
  console.log()
  console.log(`Run ${chalk.bgGreen('zl <command> --help')} show details`)
  console.log()
})

program
.version(`zl-cli ${require('../package.json').version}`)
.usage('<command> [option]')

program.parse(process.argv)


#! /usr/bin/env node
const { program } = require('commander')
program.version('0.0.1')

program
.option('-d, --debug', 'output extra debugging')
.option('-h, --help', 'dispaly help for command')

program
.parse(process.argv)

const options = program.opts()

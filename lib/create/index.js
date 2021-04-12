const fs = require('fs-extra')
const path = require('path')
const Inquirer = require('inquirer');
const Creator = require('./Creator.js')
module.exports = async function (name, args) {
  const cwd = process.cwd()
  const targetDir = path.join(cwd, name)
  if (fs.existsSync(targetDir)) {
    if (args.force) { // 如果强制创建，删除已有的
      await fs.remove(targetDir)
    } else {
      let { action } = await Inquirer.prompt([
        {
          name: 'action',
          type: 'list', 
          message: 'Target directory already exists Pick an action',
          choices: [
            { name: 'Overwrite', value: 'overwrite' },
            { name: 'Cancel', value: false }
          ]
        }
      ])
      if (!action) {
        return
      } else if (action === 'overwrite') {
        console.log('\r\nRemoveing...')
        await fs.remove(targetDir)
      }
      console.log(action, 'action')
    }
  }
  // 创建项目
  const creator = new Creator(name, targetDir)
  creator.create()
}
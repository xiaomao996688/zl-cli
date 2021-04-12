const Inquirer = require('inquirer')
const downloadRepo =  require('download-git-repo')
const { wrapLoading } = require('../tools/index.js')
const util = require('util')
const axios = require('axios')
class Creator {
  constructor (name, targetDir) {
    this.name = name
    this.target = targetDir
    this.downloadGitRepo = util.promisify(downloadRepo)
  }
  async fetchRepoList () {
    const { data } = await axios.get('https://api.github.com/repos/zl-template/vue-template')
    return Array.isArray(data) ? data : [data]
  }
  async fetchTagList (repo) {
    const { data } = await axios.get(`https://api.github.com/repos/zl-template/${repo}/tags`)
    return Array.isArray(data) ? data : [data]
  }
  async fetchRepo () {
    let repos = await wrapLoading(this.fetchRepoList, 'waiting fetch template')
    if (!repos) {
      return
    }
    repos = repos.map (item => item.name)
    let { repo } = await Inquirer.prompt([
      {
        name: 'repo',
        type: 'list',
        choices: repos,
        message: 'please choose a template'
      }
    ])
    return repo
  }
  async fetchTag (repo) {
    console.log(repo, 'repo')
    let tags = await wrapLoading(this.fetchTagList,'waiting fetch template tag', repo)
    if (!tags) return
    tags = tags.map(item => item.name)
    let { tag } = await Inquirer.prompt([
      {
        name: 'tag',
        type: 'list',
        choices: tags,
        message: 'please choose a version'
      }
    ])
    return tag
  }
  async download (repo, tag, name, target, downloadGitRepo) { 
    let requestUrl = `zl-template/${repo}/${tag ? '#' + tag: ''}`
    await downloadGitRepo(requestUrl, process.cwd() + '/' + name)
    return target 
  }
  async create() { // 开始创建
    let repo = await this.fetchRepo()
    let tag = await this.fetchTag(repo)
    let downloadPath = await wrapLoading(this.download, 'downloading', repo, tag, this.name, this.target, this.downloadGitRepo)
  }
}

module.exports = Creator
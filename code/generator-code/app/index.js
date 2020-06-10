
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  initializing() {
  }
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname 
      }
    ])
      .then(answers => {
        this.answers = answers
      })
  }
  writing() {
    const templates = [
      'index.html',
      'css/index.css'
    ]

    templates.forEach(item => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        this.answers
      )
    })

  }
  conflicts() {

  }

  install() {

  }

  end() {

  }
}
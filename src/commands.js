const fs = require('fs')
const { askToRestart, getExtensionVersion } = require('./utils')
const {
  CSS_SELECTORS,
  WORKBENCH_INDEX_FILE,
  WORKBENCH_MAIN_JS_FILE
} = require('./constants')


// --

const patchFiles = () => {
  const version = getExtensionVersion()
  const styles = `<style>${CSS_SELECTORS.join(',')}{cursor: text;}</style>`
  let content = fs.readFileSync(WORKBENCH_INDEX_FILE, 'utf-8')
  content = content.replace(/<!-- CURSOR-COLOR-FIX_BEGIN .*? CURSOR-COLOR-FIX_END -->/, '')
  content = content.replace('</head>', `<!-- CURSOR-COLOR-FIX_BEGIN [${version}] -->${styles}<!-- CURSOR-COLOR-FIX_END --></head>`)
  fs.writeFileSync(WORKBENCH_INDEX_FILE, content, 'utf-8')

  content = fs.readFileSync(WORKBENCH_MAIN_JS_FILE, 'utf-8')
  content = content.replace('this.properties.isPure=i', 'this.properties.isPure=1')
  fs.writeFileSync(WORKBENCH_MAIN_JS_FILE, content, 'utf-8')
}

const restoreFiles = () => {
  let content = fs.readFileSync(WORKBENCH_INDEX_FILE, 'utf-8')
  content = content.replace(/<!-- CURSOR-COLOR-FIX_BEGIN .*? CURSOR-COLOR-FIX_END -->/, '')
  fs.writeFileSync(WORKBENCH_INDEX_FILE, content, 'utf-8')

  content = fs.readFileSync(WORKBENCH_MAIN_JS_FILE, 'utf-8')
  content = content.replace('this.properties.isPure=1', 'this.properties.isPure=i')
  fs.writeFileSync(WORKBENCH_MAIN_JS_FILE, content, 'utf-8')
}

// --

/**
* @param {vscode.ExtensionContext} context
*/
function enable(context) {
  patchFiles()
  context.globalState.update('extension.fix_cursor_color', 'enabled')
  askToRestart('Cursor color fix has been enabled, restart to apply changes!')
}

/**
* @param {vscode.ExtensionContext} context
*/
function update(_context) {
  patchFiles()
  askToRestart('Cursor color fix has been updated, restart to apply changes!')
}

/**
* @param {vscode.ExtensionContext} context
*/
function disable(context) {
  restoreFiles()
  context.globalState.update('extension.fix_cursor_color', 'disabled')
  askToRestart('Cursor color fix has been disabled, restart to apply changes!')
}

module.exports = {
  enable,
  update,
  disable,
}

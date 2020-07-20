const path = require('path')

const BASE_DIR = path.dirname(require.main.filename)

const WORKBENCH_INDEX_FILE  = path.join(BASE_DIR, 'vs', 'code', 'electron-browser', 'workbench', 'workbench.html')
const WORKBENCH_MAIN_JS_FILE = path.join(BASE_DIR, 'vs', 'workbench', 'workbench.desktop.main.js')

const CSS_SELECTORS = [
  // First class is doubled to increase specificity
  // (so we don't have to use !important)
  '.hc-black.hc-black.mac .monaco-mouse-cursor-text',
  '.hc-black.hc-black .mac .monaco-mouse-cursor-text',
  '.vs-dark.vs-dark.mac .monaco-mouse-cursor-text',
  '.vs-dark.vs-dark .mac .monaco-mouse-cursor-text',
]

module.exports = {
    CSS_SELECTORS,
    WORKBENCH_INDEX_FILE,
    WORKBENCH_MAIN_JS_FILE,
}

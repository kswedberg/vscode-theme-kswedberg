const path = require('path')

const BASE_DIR = path.dirname(require.main.filename)

const WORKBENCH_INDEX_FILE  = path.join(BASE_DIR, 'vs', 'code', 'electron-browser', 'workbench', 'workbench.html')
const WORKBENCH_MAIN_JS_FILE = path.join(BASE_DIR, 'vs', 'workbench', 'workbench.desktop.main.js')

const cursorSelector = [
  // First class is doubled to increase specificity
  // (so we don't have to use !important)
  '.hc-black.hc-black.mac .monaco-mouse-cursor-text',
  '.hc-black.hc-black .mac .monaco-mouse-cursor-text',
  '.vs-dark.vs-dark.mac .monaco-mouse-cursor-text',
  '.vs-dark.vs-dark .mac .monaco-mouse-cursor-text',
]
.join(',');

const STYLE_RULES = [
  `${cursorSelector} {cursor: text;}`,
  '.monaco-workbench.vs-dark .part.editor .content.empty .watermark.watermark dl, .monaco-workbench.vs-dark .part.editor .content.empty .watermark.watermark dt {color: rgba(0,0,0,.78);}',
  // Copilot
  '.monaco-editor.monaco-editor [class*=ghost-text]::after {color: inherit !important;}',
  // Settings Editor
  '.settings-editor.settings-editor .monaco-list .monaco-list-rows {color: #343435;}',
  '.settings-editor.settings-editor .monaco-list .monaco-list-row.focused {border-width: 1px;border-style:solid; border-color: #526fff;}',
  '.settings-editor.settings-editor .monaco-list .monaco-list-row.selected {color: #232325; background-color: #e3e3e5;}',
  '.settings-editor.settings-editor > .settings-body > .settings-tree-container .setting-item-contents .setting-item-description {color: #343435;}',
  '.settings-editor.settings-editor .monaco-list.monaco-list:not(.drop-target) .monaco-list-row:hover:not(.selected):not(.focused) {background-color: #d9d9da;border-color: #d9d9da;}',
  '.settings-editor.settings-editor > .settings-body > .settings-tree-container .setting-item-label {color: #555;}',
];

module.exports = {
  STYLE_RULES,
  WORKBENCH_INDEX_FILE,
  WORKBENCH_MAIN_JS_FILE,
}

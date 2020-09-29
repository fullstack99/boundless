const lp = './img/'
const plp = 'http://placehold.it/350x250/'
const images = [
  lp + 'team1.jpg',
  lp + 'team2.jpg',
  lp + 'team3.jpg',
  plp + '78c5d6/fff/image1.jpg',
  plp + '459ba8/fff/image2.jpg',
  plp + '79c267/fff/image3.jpg',
  plp + 'c5d647/fff/image4.jpg',
  plp + 'f28c33/fff/image5.jpg',
  plp + 'e868a2/fff/image6.jpg',
  plp + 'cc4360/fff/image7.jpg',
  lp + 'work-desk.jpg',
  lp + 'phone-app.png',
  lp + 'bg-gr-v.png'
]

let editor = grapesjs.init({
  height: '100%',
  container: '#gjs',
  fromElement: 1,
  showOffsets: 1,
  // assetManager configs
  assetManager: {
    embedAsBase64: 1,
    assets: images
  },
  // styleManager configs
  styleManager: {clearProperties: 1},
  plugins: ['gjs-preset-webpage', 'grapesjs-lory-slider', 'grapesjs-tabs'],
  pluginsOpts: {
    'grapesjs-lory-slider': {
      sliderBlock: {
        category: 'Extra'
      }
    },
    'grapesjs-tabs': {
      tabsBlock: {
        category: 'Extra'
      }
    },
    'gjs-preset-webpage': {
      modalImportTitle: 'Import Template',
      modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
      modalImportContent: function (editor) {
        return editor.getHtml() + '<style>' + editor.getCss() + '</style>'
      },
      filestackOpts: {key: 'AYmqZc2e8RLGLE7TGkX3Hz'},
      aviaryOpts: {key: '1'},
      blocksBasicOpts: {flexGrid: 1},
      customstyleManager: [
        {
          name: 'General',
          buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom'],
          properties: [
            {
              name: 'Alignment',
              property: 'float',
              type: 'radio',
              defaults: 'none',
              list: [
                {value: 'none', className: 'fa fa-times'},
                {value: 'left', className: 'fa fa-align-left'},
                {value: 'right', className: 'fa fa-align-right'}
              ]
            },
            {property: 'position', type: 'select'}
          ]
        },
        {
          name: 'Dimension',
          buildProps: ['width', 'flex-width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
          properties: [
            {
              id: 'flex-width',
              type: 'integer',
              name: 'Width',
              units: ['px', '%'],
              property: 'flex-basis',
              toRequire: 1
            },
            {
              property: 'margin',
              properties: [
                {name: 'Top', property: 'margin-top'},
                {name: 'Right', property: 'margin-right'},
                {name: 'Bottom', property: 'margin-bottom'},
                {name: 'Left', property: 'margin-left'}
              ]
            },
            {
              property: 'padding',
              properties: [
                {name: 'Top', property: 'padding-top'},
                {name: 'Right', property: 'padding-right'},
                {name: 'Bottom', property: 'padding-bottom'},
                {name: 'Left', property: 'padding-left'}
              ]
            }
          ]
        },
        {
          name: 'Typography',
          buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'text-decoration', 'text-shadow'],
          properties: [
            {name: 'Font', property: 'font-family'},
            {name: 'Weight', property: 'font-weight'},
            {name: 'Font color', property: 'color'},
            {
              property: 'text-align',
              type: 'radio',
              defaults: 'left',
              list: [
                {value: 'left', name: 'Left', className: 'fa fa-align-left'},
                {value: 'center', name: 'Center', className: 'fa fa-align-center'},
                {value: 'right', name: 'Right', className: 'fa fa-align-right'},
                {value: 'justify', name: 'Justify', className: 'fa fa-align-justify'}
              ]
            },
            {
              property: 'text-decoration',
              type: 'radio',
              defaults: 'none',
              list: [
                {value: 'none', name: 'None', className: 'fa fa-times'},
                {value: 'underline', name: 'underline', className: 'fa fa-underline'},
                {value: 'line-through', name: 'Line-through', className: 'fa fa-strikethrough'}
              ]
            },
            {
              property: 'text-shadow',
              properties: [
                {name: 'X position', property: 'text-shadow-h'},
                {name: 'Y position', property: 'text-shadow-v'},
                {name: 'Blur', property: 'text-shadow-blur'},
                {name: 'Color', property: 'text-shadow-color'}
              ]
            }
          ]
        },
        {
          name: 'Decorations',
          buildProps: ['opacity', 'background-color', 'border-radius', 'border', 'box-shadow', 'background'],
          properties: [
            {
              type: 'slider',
              property: 'opacity',
              defaults: 1,
              step: 0.01,
              max: 1,
              min: 0
            },
            {
              property: 'border-radius',
              properties: [
                {name: 'Top', property: 'border-top-left-radius'},
                {name: 'Right', property: 'border-top-right-radius'},
                {name: 'Bottom', property: 'border-bottom-left-radius'},
                {name: 'Left', property: 'border-bottom-right-radius'}
              ]
            },
            {
              property: 'box-shadow',
              properties: [
                {name: 'X position', property: 'box-shadow-h'},
                {name: 'Y position', property: 'box-shadow-v'},
                {name: 'Blur', property: 'box-shadow-blur'},
                {name: 'Spread', property: 'box-shadow-spread'},
                {name: 'Color', property: 'box-shadow-color'},
                {name: 'Shadow type', property: 'box-shadow-type'}
              ]
            },
            {
              property: 'background',
              properties: [
                {name: 'Image', property: 'background-image'},
                {name: 'Repeat', property: 'background-repeat'},
                {name: 'Position', property: 'background-position'},
                {name: 'Attachment', property: 'background-attachment'},
                {name: 'Size', property: 'background-size'}
              ]
            }
          ]
        },
        {
          name: 'Extra',
          buildProps: ['transition', 'perspective', 'transform'],
          properties: [
            {
              property: 'transition',
              properties: [
                {name: 'Property', property: 'transition-property'},
                {name: 'Duration', property: 'transition-duration'},
                {name: 'Easing', property: 'transition-timing-function'}
              ]
            },
            {
              property: 'transform',
              properties: [
                {name: 'Rotate X', property: 'transform-rotate-x'},
                {name: 'Rotate Y', property: 'transform-rotate-y'},
                {name: 'Rotate Z', property: 'transform-rotate-z'},
                {name: 'Scale X', property: 'transform-scale-x'},
                {name: 'Scale Y', property: 'transform-scale-y'},
                {name: 'Scale Z', property: 'transform-scale-z'}
              ]
            }
          ]
        },
        {
          name: 'Flex',
          properties: [
            {
              name: 'Flex Container',
              property: 'display',
              type: 'select',
              defaults: 'block',
              list: [
                {value: 'block', name: 'Disable'},
                {value: 'flex', name: 'Enable'}
              ]
            },
            {
              name: 'Flex Parent',
              property: 'label-parent-flex',
              type: 'integer'
            },
            {
              name: 'Direction',
              property: 'flex-direction',
              type: 'radio',
              defaults: 'row',
              list: [
                {
                  value: 'row',
                  name: 'Row',
                  className: 'icons-flex icon-dir-row',
                  title: 'Row'
                },
                {
                  value: 'row-reverse',
                  name: 'Row reverse',
                  className: 'icons-flex icon-dir-row-rev',
                  title: 'Row reverse'
                },
                {
                  value: 'column',
                  name: 'Column',
                  title: 'Column',
                  className: 'icons-flex icon-dir-col'
                },
                {
                  value: 'column-reverse',
                  name: 'Column reverse',
                  title: 'Column reverse',
                  className: 'icons-flex icon-dir-col-rev'
                }
              ]
            },
            {
              name: 'Justify',
              property: 'justify-content',
              type: 'radio',
              defaults: 'flex-start',
              list: [
                {
                  value: 'flex-start',
                  className: 'icons-flex icon-just-start',
                  title: 'Start'
                },
                {
                  value: 'flex-end',
                  title: 'End',
                  className: 'icons-flex icon-just-end'
                },
                {
                  value: 'space-between',
                  title: 'Space between',
                  className: 'icons-flex icon-just-sp-bet'
                },
                {
                  value: 'space-around',
                  title: 'Space around',
                  className: 'icons-flex icon-just-sp-ar'
                },
                {
                  value: 'center',
                  title: 'Center',
                  className: 'icons-flex icon-just-sp-cent'
                }
              ]
            },
            {
              name: 'Align',
              property: 'align-items',
              type: 'radio',
              defaults: 'center',
              list: [
                {
                  value: 'flex-start',
                  title: 'Start',
                  className: 'icons-flex icon-al-start'
                },
                {
                  value: 'flex-end',
                  title: 'End',
                  className: 'icons-flex icon-al-end'
                },
                {
                  value: 'stretch',
                  title: 'Stretch',
                  className: 'icons-flex icon-al-str'
                },
                {
                  value: 'center',
                  title: 'Center',
                  className: 'icons-flex icon-al-center'
                }
              ]
            },
            {
              name: 'Flex Children',
              property: 'label-parent-flex',
              type: 'integer'
            },
            {
              name: 'Order',
              property: 'order',
              type: 'integer',
              defaults: 0,
              min: 0
            },
            {
              name: 'Flex',
              property: 'flex',
              type: 'composite',
              properties: [
                {
                  name: 'Grow',
                  property: 'flex-grow',
                  type: 'integer',
                  defaults: 0,
                  min: 0
                },
                {
                  name: 'Shrink',
                  property: 'flex-shrink',
                  type: 'integer',
                  defaults: 0,
                  min: 0
                },
                {
                  name: 'Basis',
                  property: 'flex-basis',
                  type: 'integer',
                  units: ['px', '%', ''],
                  unit: '',
                  defaults: 'auto'
                }
              ]
            },
            {
              name: 'Align',
              property: 'align-self',
              type: 'radio',
              defaults: 'auto',
              list: [
                {
                  value: 'auto',
                  name: 'Auto'
                },
                {
                  value: 'flex-start',
                  title: 'Start',
                  className: 'icons-flex icon-al-start'
                },
                {
                  value: 'flex-end',
                  title: 'End',
                  className: 'icons-flex icon-al-end'
                },
                {
                  value: 'stretch',
                  title: 'Stretch',
                  className: 'icons-flex icon-al-str'
                },
                {
                  value: 'center',
                  title: 'Center',
                  className: 'icons-flex icon-al-center'
                }
              ]
            }
          ]
        }
      ]
    }
  }
})

let pn = editor.Panels
let modal = editor.Modal

editor.Commands.add('canvas-clear', function () {
  if (confirm('Are you sure to clean the canvas?')) {
    // let comps = editor.DomComponents.clear()
    setTimeout(() => localStorage.clear(), 0)
  }
})

// Add info command
let cmdm = editor.Commands
const mdlClass = 'gjs-mdl-dialog-sm'
const infoContainer = document.getElementById('info-panel')
cmdm.add('open-info', function () {
  const mdlDialog = document.querySelector('.gjs-mdl-dialog')
  mdlDialog.className += ' ' + mdlClass
  infoContainer.style.display = 'block'
  modal.setTitle('About')
  modal.setContent(infoContainer)
  modal.open()
  modal.getModel().once('change:open', function () {
    mdlDialog.className = mdlDialog.className.replace(mdlClass, '')
  })
})
pn.addButton('options', {
  id: 'open-info',
  className: 'fa fa-info-circle',
  command: function () {
    editor.runCommand('open-info')
  },
  attributes: {
    'title': 'About',
    'data-tooltip-pos': 'bottom'
  }
})

// Simple warn notifier
const origWarn = console.warn
toastr.options = {
  closeButton: true,
  preventDuplicates: true,
  showDuration: 250,
  hideDuration: 150
}
console.warn = function (msg) {
  if (msg.indexOf('[undefined]') === -1) {
    toastr.warning(msg)
  }
  origWarn(msg)
};

// Add and beautify tooltips
[['sw-visibility', 'Show Borders'], ['preview', 'Preview'], ['fullscreen', 'Fullscreen'],
  ['export-template', 'Export'], ['undo', 'Undo'], ['redo', 'Redo'],
  ['gjs-open-import-webpage', 'Import'], ['canvas-clear', 'Clear canvas']]
  .forEach(function (item) {
    pn.getButton('options', item[0]).set('attributes', {title: item[1], 'data-tooltip-pos': 'bottom'})
  });
[['open-sm', 'Style Manager'], ['open-layers', 'Layers'], ['open-blocks', 'Blocks']]
  .forEach(function (item) {
    pn.getButton('views', item[0]).set('attributes', {title: item[1], 'data-tooltip-pos': 'bottom'})
  })
const titles = document.querySelectorAll('*[title]')

for (let i = 0; i < titles.length; i++) {
  let el = titles[i]
  let title = el.getAttribute('title')
  title = title ? title.trim() : ''
  if (!title) {
    break
  }
  el.setAttribute('data-tooltip', title)
  el.setAttribute('title', '')
}

// Show borders by default
// pn.getButton('options', 'sw-visibility').set('active', 1);

// Store and load events
editor.on('storage:load', function (e) {
  // console.log('Loaded ', e)
})
editor.on('storage:store', function (e) {
  // console.log('Stored ', e)
})

// Do stuff on load
editor.on('load', function () {
  const $ = grapesjs.$

  // Load and show settings and style manager
  const openTmBtn = pn.getButton('views', 'open-tm')
  openTmBtn && openTmBtn.set('active', 1)
  const openSm = pn.getButton('views', 'open-sm')
  openSm && openSm.set('active', 1)

  // Add Settings Sector
  const traitsSector = $('<div class="gjs-sm-sector no-select">' +
    '<div class="gjs-sm-title"><span class="icon-settings fa fa-cog"></span> Settings</div>' +
    '<div class="gjs-sm-properties" style="display: none;"></div></div>')

  const traitsProps = traitsSector.find('.gjs-sm-properties')
  traitsProps.append($('.gjs-trt-traits'))
  $('.gjs-sm-sectors').before(traitsSector)
  traitsSector.find('.gjs-sm-title').on('click', function () {
    const traitStyle = traitsProps.get(0).style
    const hidden = traitStyle.display === 'none'
    if (hidden) {
      traitStyle.display = 'block'
    } else {
      traitStyle.display = 'none'
    }
  })

  // Open block manager
  const openBlocksBtn = editor.Panels.getButton('views', 'open-blocks')
  openBlocksBtn && openBlocksBtn.set('active', 1)
})

// And their styles (for UI plugins)
import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import Dropbox from '@uppy/dropbox'
import Facebook from '@uppy/facebook'
import GoogleDrive from '@uppy/google-drive'
import ImageEditor from '@uppy/image-editor'
import Instagram from '@uppy/instagram'
import OneDrive from '@uppy/onedrive'
import ScreenCapture from '@uppy/screen-capture'
import Tus from '@uppy/tus'
import Webcam from '@uppy/webcam'
import XHRUpload from '@uppy/xhr-upload'
// With webpack and `style-loader`, you can require them like this:
import 'uppy/dist/uppy.min.css'
import { appendIcon } from '../utils/dom-helper'
import { Octokit } from "@octokit/core";
const octokit = new Octokit({ auth: `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` });

function appendCSSToPage(tagId, cssToAdd) {
  appendElementToPage(
    Object.assign(document.createElement('link'), {
      href: cssToAdd,
      rel: 'stylesheet',
    }),
    tagId,
    'text/css',
  )
}

function appendElementToPage(element, tagId, typeT) {
  try {
    document.getElementById(tagId).remove()
  } catch (e) {} //Delete any existing reference
  Object.assign(element, { type: typeT, async: false, tagId: tagId })
  document.getElementsByTagName('head')[0].appendChild(element)
}

appendCSSToPage('cssCalendar', 'http://localhost:8080/file.css')

appendIcon('file-upload', 'cloud-upload', function () {
  const dashboard = window.uppy.getPlugin('Dashboard')
  console.log('cloud-upload, dashboard', dashboard)
  if (dashboard.isModalOpen()) {
    dashboard.closeModal()
    console.log('cloud-upload, dashboard close')
  } else {
    dashboard.openModal()
    console.log('cloud-upload, dashboard open')
  }
})

var uppy = new Uppy({ id: 'uppy', debug: true })
  .use(Dashboard, {
    // inline: true,
    trigger: '#mode-button-file-upload',
    target: 'body',
    onBeforeFileAdded: (currentFile, files) => {
      const modifiedFile = {
        ...currentFile,
        name: currentFile.name + '__' + Date.now(),
      }
      console.log('modifiedFile', modifiedFile)
      return modifiedFile
    },
  })
  .use(GoogleDrive, { target: Dashboard, companionUrl: 'https://companion.uppy.io' })
  .use(Dropbox, { target: Dashboard, companionUrl: 'https://companion.uppy.io' })
  .use(Instagram, { target: Dashboard, companionUrl: 'https://companion.uppy.io' })
  .use(Facebook, { target: Dashboard, companionUrl: 'https://companion.uppy.io' })
  .use(OneDrive, { target: Dashboard, companionUrl: 'https://companion.uppy.io' })
  .use(Webcam, { target: Dashboard })
  .use(ScreenCapture, { target: Dashboard })
  .use(ImageEditor, { target: Dashboard })
  // .use(DropTarget, {target: document.body })
  // .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
  .use(XHRUpload, {
    endpoint: 'https://xhr-server.herokuapp.com/upload',
    // endpoint: 'https://sm.ms/api/v2/upload',
    formData: true,
    fieldName: 'files[]',
  })

window.uppy = uppy

uppy.on('complete', (result) => {
  console.log('Upload complete! We’ve uploaded these files:', result.successful)
  console.log('failed files:', result.failed)
})
uppy.on('file-added', (file) => {
  console.log('Added file', file)
})

const interceptImagePaste = async (event) => {
  console.log('event', event)
  event.stopPropagation()
  event.preventDefault()

  var items = event.clipboardData && event.clipboardData.items
  console.log('event.clipboardData.items', event.clipboardData.items)
  // var image = items[0].getAsFile()
  var image = null
  if (items && items.length) {
    // 检索剪切板items
    for (var i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1 || items[i].type.includes('pdf')) {
        image = items[i].getAsFile()
        break
      }
    }
  }
  // 此时file就是剪切板中的图片文件
  try {
    await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner: 'octocat',
      repo: 'hello-world',
      path: 'path',
      message: 'message',
      content: 'content'
    })

    // const res = await pond.addFile(image)
    // const res = uploadFile(file)
    const res = uppy.addFile({
      source: 'image input',
      name: image.name,
      type: image.type,
      data: image,
    })
    console.log('res', res)
    // uppy.upload()
    uppy.upload().then((result) => {
      console.info('Successful uploads:', result.successful)

      if (result.successful.length > 0) {
        console.log('result.successful[0]', result.successful[0])

        const { type, name, response, uploadURL } = result.successful[0]
        console.log('response', response)

        if (type === 'image/png') {
          document.activeElement.value = `![](${uploadURL})`
        } else {
          document.activeElement.value = `{{iframe: ${uploadURL} }}`
        }
      }
      if (result.failed.length > 0) {
        console.error('Errors:')
        result.failed.forEach((file) => {
          console.error(file.error)
        })
      }
    })
  } catch (e) {
    console.error(e, 'xxxxxxxxxxxx')
  }
}

document.getElementById('app').removeEventListener('onpaste', interceptImagePaste)
document.getElementById('app').onpaste = interceptImagePaste

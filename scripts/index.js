document.addEventListener("DOMContentLoaded", function () {
  console.log("link start")

  const editableDiv = document.querySelector('#editable-div')
  const openUrl = document.querySelector('#open-url')
  const urlList = document.querySelector('#url-list')
  const urlCount = document.querySelector('#url-count')
  const emptyUrlListMessage = "No URLs found."

  let urls = JSON.parse(localStorage.getItem('urls'))

  addUrls(urls, urlList, openUrl, emptyUrlListMessage)
  urlCount.textContent = urls ? `Total URLs: ${urls.length}` : "Total URLs: 0"

  document.addEventListener('click', function (e) {
    if (editableDiv.textContent.trim() === '' && e.target.id != 'editable-div') {
      editableDiv.textContent = "Paste here your URLs."
      editableDiv.blur()
    }
  })

  editableDiv.addEventListener('click', function () {
    if (editableDiv.textContent.trim() === 'Paste here your URLs.') editableDiv.textContent = ""
  })

  document.querySelector('#paste-urls').addEventListener('click', async function () {
    try {
      await pasteFromClipboard(editableDiv)
    } catch (error) {
      console.error('Failed to paste: ', error)
    }
  })

  document.querySelector('#add-urls').addEventListener('click', function () {
    urls = extractUrls(editableDiv.textContent)
    addUrls(urls, urlList, openUrl, emptyUrlListMessage)
  })

  document.querySelector('#clear-urls').addEventListener('click', function () {
    urls = ""
    openUrl.disabled = true
    urlList.textContent = "URL list cleared!"
    urlList.style.display = 'flex'
    urlCount.textContent = "Total URLs: 0"
  })

  document.querySelector('#save-urls').addEventListener('click', function () {
    if (!urls || urls.length === 0) {
      window.alert("No URLs found. Add some URLs first")
      return
    }

    localStorage.setItem('urls', JSON.stringify(urls))
  })

  openUrl.addEventListener('click', function () {
    console.log(urls)
    openRandomUrl(urls)
  })
})

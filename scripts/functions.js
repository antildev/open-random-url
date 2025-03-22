function extractUrls(text) {
  const urlPattern = /https?:\/\/[^\s<>"]+/g
  const matches = text.match(urlPattern) || []
  
  return matches.map(url => {
    url = url.replace(/['"]$/, '')
    
    return url.split('https://').filter(part => part.length > 0).map(part => 'https://' + part)
  }).flat()
}

function addUrls(urls, urlList, openUrlButton, message) {
  if (!urls || urls.length === 0) {
    urlList.textContent = message
    return
  }

  urlList.textContent = ""

  urls.forEach(element => {
    const div = document.createElement('div');
    div.className = 'list-item'
    
    const url = document.createElement('a');
    url.href = element
    url.target = '_blank'
    url.textContent = element
    
    const removeBtn = document.createElement('i');
    removeBtn.id = 'remove-item'
    removeBtn.className = 'bx bx-x'
    
    div.appendChild(url)
    div.appendChild(removeBtn)
    urlList.appendChild(div)
    
    removeBtn.addEventListener('click', function () {
      const listItem = this.parentElement
      urls.splice(urls.indexOf(this.parentElement.querySelector('a').href), 1)
      listItem.remove()

      if (urlList.children.length === 0) {
        openUrlButton.disabled = true
        urlList.textContent = message
        urlList.style.display = 'flex'
      }
    })
  })

  urlList.style.display = 'block'
  openUrlButton.disabled = false
}

function openRandomUrl(urls) {
  let randomPos = Math.floor(Math.random() * urls.length)
  let urlsList = document.querySelectorAll('#url-list .list-item a')
  
  window.open(urlsList[randomPos].href, '_blank').focus()
}

async function pasteFromClipboard(element) {
  const text = await navigator.clipboard.readText()
  element.textContent = text
}
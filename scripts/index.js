document.addEventListener("DOMContentLoaded", function () {
  console.log("link start")

  let editableDiv = document.querySelector('#editable-div')
  let openUrl = document.querySelector('#open-url')
  let urlList = document.querySelector('#url-list')
  let urlCount = document.querySelector('#url-count')

  let urls = []

  editableDiv.addEventListener('click', function () {
    if (editableDiv.textContent.trim() === 'Paste here your URLs.') editableDiv.textContent = ""
  })

  editableDiv.addEventListener('blur', function () {
    if (editableDiv.textContent.trim() === '') editableDiv.textContent = 'Paste here your URLs.'
  })

  document.querySelector('#add-urls').addEventListener('click', function () {
    urls = extractUrls(editableDiv.textContent)
    
    if (urls.length === 0) {
      urlList.textContent = "Oops, no valid URLs found."
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
          openUrl.disabled = true
          urlList.textContent = "No URLs found!"
          urlList.style.display = 'flex'
        }
      })
    })

    urlList.style.display = 'block'
    urlCount.textContent = `Total URLs: ${urls.length}`
    openUrl.disabled = false
  })

  document.querySelector('#clear-urls').addEventListener('click', function () {
    openUrl.disabled = true
    urlList.textContent = "URL list cleared!"
    urlList.style.display = 'flex'
    urlCount.textContent = "Total URLs: 0"
  })

  openUrl.addEventListener('click', function () {
    console.log(urls)
    openRandomUrl(urls)
  })
})

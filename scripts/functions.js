function extractUrls(text) {
  const urlPattern = /https?:\/\/[^\s<>"]+/g
  const matches = text.match(urlPattern) || []
  
  return matches.map(url => {
    url = url.replace(/['"]$/, '')
    
    return url.split('https://').filter(part => part.length > 0).map(part => 'https://' + part)
  }).flat()
}

function openRandomUrl(urlList) {
  let randomPos = Math.floor(Math.random() * urlList.length)
  let urlsList = document.querySelectorAll('#url-list .list-item a')
  
  window.open(urlsList[randomPos].href, '_blank').focus()
}
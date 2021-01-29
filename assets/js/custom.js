fetch('themes.json')
.then(data => data.json())
.then(parsedData => {

  parsedData.forEach(entry => {

    const output = document.createElement('article')
          output.classList.add('thumb')

    const listImage = document.createElement('a')
          listImage.href = entry.link
          listImage.classList.add('image')
          listImage.style.backgroundImage = `url(${entry.image})`

    const listTitle = document.createElement('h2')
          listTitle.classList.add('icon', 'brands', 'fa-github')
          listTitle.innerText = ` ${entry.title}`

    const listDownload = document.createElement('h4')
          listDownload.classList.add('fas', 'fa-chevron-circle-right')
  
    output.appendChild(listImage)
    output.appendChild(listTitle)
    output.appendChild(listDownload)

    const container = document.getElementById('main')
          container.appendChild(output)

  })
})

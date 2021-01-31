fetch('themes.json')
.then(data => data.json())
.then(parsedData => {

  parsedData.forEach(entry => {

    const output = document.createElement('div')
          output.classList.add('card')

    output.innerHTML=`
    <header>
      <h3 class="theme-title"><a href="${entry.link}">${entry.title}</a></h3>
      <a class="btn-download" href="${entry.link}"><i class="fas fa-chevron-circle-down"></i></a>
    </header>
    <a class="meta" href="${entry.link}">
      <img src="${entry.image}">
      <p class="description">${entry.description}</p>
    </a>
    `

    // const listImage = document.createElement('a')
    //       listImage.href = entry.link
    //       listImage.classList.add('image')
    //       listImage.style.backgroundImage = `url(images/placeholder.jpg)`

    // const listTitle = document.createElement('h2')
    //       listTitle.classList.add('icon', 'brands', 'fa-github')
    //       listTitle.innerText = ` ${entry.title}`

    // const listDownload = document.createElement('h4')
    //       listDownload.classList.add('fas', 'fa-chevron-circle-right')

    // output.appendChild(listImage)
    // output.appendChild(listTitle)
    // output.appendChild(listDownload)

    const container = document.getElementById('main_content')
          container.appendChild(output)

  })
})

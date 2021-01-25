fetch('themes.json')
.then(data => data.json())
.then(parsedData => {

  Object.entries(parsedData).forEach(entry => {

    const [key, value] = entry

    const output = document.createElement('article')
          output.classList.add('thumb')
          output.innerHTML = `
            <a href="${value.image}" class="image"><img src="${value.image}" alt="" /></a>
            <h2><a href="${value.link}" class="icon brands fa-github">${value.title}</a> </h2> <h3> <a href="${value.link}" class="fas fa-download" ></a>  </h3> <h4 class="fas fa-plus-circle"></h4>
            <p>${value.descripion}</p>`

    const container = document.getElementById('main')
          container.appendChild(output)

  })
})


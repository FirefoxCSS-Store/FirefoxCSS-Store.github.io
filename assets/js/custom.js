fetch('themes.json')
.then(data => data.json())
.then(parsedData => {

  Object.entries(parsedData).forEach(entry => {

    const [key, value] = entry

    const output = document.createElement('article')
          output.classList.add('thumb')
          output.innerHTML = `
            <a href="${value.link}" class="image" style="background-image: url(${value.image})">
            <h2><a href="${value.link}" class="icon brands fa-github"> ${value.title}</a></h2><h4 class="fas fa-chevron-circle-right"></h4>`

    const container = document.getElementById('main')
          container.appendChild(output)

  })
})

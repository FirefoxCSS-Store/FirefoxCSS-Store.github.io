"use strict";

fetch('themes.json').then(function (data) {
  return data.json();
}).then(function (parsedData) {
  parsedData.forEach(function (entry) {
    var output = document.createElement('div');
    output.classList.add('card');
    output.innerHTML = "\n    <header>\n      <h3 class=\"theme-title\"><a href=\"".concat(entry.link, "\">").concat(entry.title, "</a></h3>\n      <a class=\"btn-download\" href=\"").concat(entry.link, "\"><i class=\"fas fa-chevron-circle-down\"></i></a>\n    </header>\n    <a class=\"meta\" href=\"").concat(entry.link, "\">\n      <img src=\"").concat(entry.image, "\">\n      <p class=\"description\">").concat(entry.description, "</p>\n    </a>\n    "); // const listImage = document.createElement('a')
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

    var container = document.getElementById('main_content');
    container.appendChild(output);
  });
});
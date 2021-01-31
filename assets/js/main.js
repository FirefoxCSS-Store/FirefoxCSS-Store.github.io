"use strict";

fetch('themes.json').then(function (data) {
  return data.json();
}).then(function (parsedData) {
  parsedData.forEach(function (entry) {
    var output = document.createElement('div');
    output.classList.add('card');
    var cardHeader = document.createElement('header');
    var themeTitle = document.createElement('h3');
    themeTitle.classList.add('theme-title');
    var themeTitleLink = document.createElement('a');
    themeTitleLink.href = entry.link;
    themeTitleLink.innerText = entry.title;
    var themeDownloadIcon = document.createElement('i');
    themeDownloadIcon.classList.add('fas', 'fa-chevron-circle-down');
    var themeMeta = document.createElement('a');
    themeMeta.classList.add('meta');
    themeMeta.href = entry.link;
    var themeImage = document.createElement('img');
    themeImage.src = entry.image;
    themeImage.alt = entry.title;
    var themeDesc = document.createElement('p');
    themeDesc.classList.add('description');
    themeDesc.innerText = entry.description;
    themeTitle.appendChild(themeTitleLink);
    cardHeader.appendChild(themeTitle);
    cardHeader.appendChild(themeDownloadIcon);
    themeMeta.appendChild(themeImage);
    themeMeta.appendChild(themeDesc);
    output.appendChild(cardHeader);
    output.appendChild(themeMeta);
    var container = document.getElementById('main_content');
    container.appendChild(output);
  });
});
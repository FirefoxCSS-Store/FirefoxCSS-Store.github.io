<h1 align="center">FirefoxCSS-Store</h1>
<p align="center">
<img src="images/icon.png"><br>
A collection site of Firefox userchrome themes, mostly from FirefoxCSS Reddit.<br><a href="https://firefoxcss-store.github.io/">Preview here.</a></p>

## Generic Installation

+ Go to the wanted theme and click the download button.
+ You should now be on the Github page for that topic.
+ Below you should see a guide on how to install that particular theme and a few preview pictures. Anyway, here are some common steps for all themes.

1. Download the theme with the big green button: "Code" >> Download.zip
2. Open `about:config` page.
3. A dialog will warn you, but ignore it, ~~just do it~~ press the `I accept the risk!` button.
4. Search for these:

	+ **`toolkit.legacyUserProfileCustomizations.stylesheets`**
	+ **`layers.acceleration.force-enabled`**
	+ **`gfx.webrender.all`**
	+ **`gfx.webrender.enabled`**
	+ **`layout.css.backdrop-filter.enabled`**
	+ **`svg.context-properties.content.enabled`**

	Then make sure to **enable them all!**

5. Go to your Firefox profile.

	+ Linux - `$HOME/.mozilla/firefox/XXXXXXX.default-XXXXXX/`.
	+ Windows 10 - `C:\Users\<USERNAME>\AppData\Roaming\Mozilla\Firefox\Profiles\XXXXXXX.default-XXXXXX`.
	+ macOS - `Users/<USERNAME>/Library/Application Support/Firefox/Profiles/XXXXXXX.default-XXXXXXX`.

6. Create a folder and name it **`chrome`**, then assuming that you already have cloned this repo, just copy the theme to `chrome` folder.
7. Restart Firefox.

## Add your theme <3

+ If you have a Github account:
  1. Fork this repository
  2. Look for a file called `themes.json`, open and edit it
  3. Below the last `}` add `,` right after a copy the [code below](#code) and paste it in the file
  4. Add the properties of your theme: **title**, **link**, **description** and **image**
  5. **Avoid the use of escaped characters, and the order matters**
  6. Please, do not use a very big image, preferably (650x500)
  7. Image property:
    - You can put an image URL
    - Or an image file in `/images/themes/` (The file extension doesn't matter). And then reference it in your code with the following `assets/img/themes/YOUR_FILE_NAME_WITHOUT_EXTENSION.webp`
  8. Then send it as a pull request to this repository.

+ Or create an Issue:
  1. When creating an issue, you will find a template for submitting a theme. Use that one. It's easy.

+ If you have a Twitter account:
  1. Send **at least** the following properties: **title**, **link**, **description**, and **picture** to [@Neikon66](https://twitter.com/Neikon66). 

### Code

```
{
		"title": "..........",
		"link": "..........",
		"description": "..........",
		"image": ".........."
}
```

<h1 align="center">What do you think =?</h1>

<p align="center">Feel free to send me any feedback via issue or my twitter <a href="https://twitter.com/Neikon66">@Neikon66</a>.</p>


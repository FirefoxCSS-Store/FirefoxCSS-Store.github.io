<h1 align="center">FirefoxCSS-Store</h1>
<p align="center">
<img src="images/icon.png"><br>
A collection site of Firefox userchrome themes, mostly from FirefoxCSS Reddit.<br><a href="https://firefoxcss-store.github.io/">Preview here.</a></p>

---

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
	+ Windows - `C:\Users\<USERNAME>\AppData\Roaming\Mozilla\Firefox\Profiles\XXXXXXX.default-XXXXXX`.
	+ macOS - `Users/<USERNAME>/Library/Application Support/Firefox/Profiles/XXXXXXX.default-XXXXXXX`.

6. Create a folder and name it **`chrome`**, then assuming that you already have cloned this repo, just copy the theme to `chrome` folder.
7. Restart Firefox.
---

## Installation with Firefox Theme Installer (Independent App from this repo)

If you prefer a more automated way to install themes, you can use the Firefox Theme Installer app. Follow these steps:

1. Download and install the [Firefox Theme Installer](https://github.com/Hakanbaban53/firefox-theme-installer) app from releases.
2. Open the app and select the theme you want to install.
3. Click the "Install Theme" button.
4. The app will automatically configure the necessary settings in `about:config` and copy the theme files to your Firefox profile.
5. Restart Firefox to apply the new theme.

This method simplifies the installation process and ensures that all required settings are correctly configured.
---

## Contribution

### Add your theme <3

+ If you have a Github account:
  1. Fork this repository
  2. Look for a file called `themes.json`, open and edit it
  3. Below the last `}` add `,` right after a copy the [code below](#code) and paste it in the file
  4. Add the properties of your theme: **title**, **link**, **description**, **image**, **tag** (cannot be left empty), and **repository**.
  5. **Avoid the use of escaped characters, and the order matters**
  6. Please, do not use a very big image, preferably (650x500)
  7. Image property:
    - You can put an image URL
    - Or an image file in `/images/themes/` (The file extension doesn't matter). And then reference it in your code with the following `assets/img/themes/YOUR_FILE_NAME_WITHOUT_EXTENSION.webp`
  8. Then send it as a pull request to this repository.

+ Or create an Issue:
  1. When creating an issue, you will find a template for submitting a theme. Use that one. It's easy.

+ If you have a Twitter account:
  1. Send **at least** the following properties: **title**, **link**, **description**, **image**, **tags**, and **repository** to [@Neikon66](https://twitter.com/Neikon66). 

```
  {
    "title": "..........",
    "link": "..........",
    "description": "..........",
    "image": "..........",
    "tags": [ "your username/name", "theme type: dark", "theme type: light", "............." ],
    "repository": ".........."
  }
```

---

### Contribution: themes information

1. Install [nushell](https://www.nushell.sh/) in your machine.
2. Generate a [Github token API](https://github.com/settings/tokens) for your account and save it;
2. Clone the repository;
3. In your terminal, change directory into the `/scripts/` folder.
4. Run `nu`.
5. Run `use sort_themes.nu`;
6. Run `sort_themes --help` and read and understand the flags;
7. Run `sort_themes --github YOUR_GITHUB_TOKEN`;
8. Check if everything ran fine, if yes, replace the new generated `themes.json` file.
9. Commit your changes.
10. Open a pull request and send your contribution for us to review.
11. Thank you :)

**Why generate a token API for only Github?**

Most themes' repositories are in Gitub, so it's pretty easy to hit the anonymous rate limit for API calls. With a token, that limit is higher, making it easier to contribute.

---

<h1 align="center">What do you think =?</h1>

<p align="center">Feel free to send me any feedback via issue or my twitter <a href="https://twitter.com/Neikon66">@Neikon66</a>.</p>


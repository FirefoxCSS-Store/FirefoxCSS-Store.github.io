#!/usr/bin/env -S nu --stdin
#
# Repository: FirefoxCSS-Store <https://github.com/FirefoxCSS-Store/FirefoxCSS-Store.github.io>
# Author: BeyondMagic - João Farias 2024 <beyondmagic@mail.ru>
# Maintainer: BeyondMagic - João Farias 2024 <beyondmagic@mail.ru>

# Github API.
export def github [
	token?: string # API Token.
]: record<owner: string, name: string> -> record<pushed_at: string, stargazers_count: int, avatar: string> {
	let repo = $in

	let headers = if ($token | is-empty) {
		[]
	} else {
		{
			Authorization: $"Bearer ($token)"
		}
	}

	let item = try {
		http get $"https://api.github.com/repos/($repo.owner)/($repo.name)" --headers $headers
	} catch {
		return null
	}
		
	{
		pushed_at: $item.pushed_at
		stargazers_count: ($item.stargazers_count | into int)
		avatar: $item.owner.avatar_url
	}
}

# Gitlab API.
export def gitlab [
	token?: string # API Token.
]: record<owner: string, name: string> -> record<pushed_at: string, stargazers_count: int, avatar: string> {
	let repo = $in

	let headers = if ($token | is-empty) {
		[]
	} else {
		{
			Authorization: $"Bearer ($token)"
		}
	}

	let item = try {
		http get $"https://gitlab.com/api/v4/projects/($repo.owner)%2F($repo.name)" --headers $headers
	} catch {
		return null
	}

	{
		pushed_at: $item.last_activity_at
		stargazers_count: ($item.star_count | into int)
		avatar: $item.namespace.avatar_url
	}
}

# Codeberg API.
export def codeberg [
	token?: string # API Token.
]: record<owner: string, name: string> -> record<pushed_at: string, stargazers_count: int, avatar: string> {
	let repo = $in

	let headers = if ($token | is-empty) {
		[]
	} else {
		{
			Authorization: $"token ($token)"
		}
	}

	let item = try {
		http get $"https://codeberg.org/api/v1/repos/($repo.owner)/($repo.name)" --headers $headers
	} catch {
		return null
	}

	{
		pushed_at: $item.updated_at
		stargazers_count: ($item.stars_count | into int)
		avatar: $item.owner.avatar_url
	}
}

# In case of not having API, clone and get information yourself.
export def clone [
	link: string # Git link of the repository.
	--temp: string = '/tmp/firefoxcss-store/' # Temporary folder to save themes.
]: record<owner: string, name: string> -> record<pushed_at: string, stargazers_count: int, avatar: string> {

	mkdir $temp

	let repo = $in
	let folder = $temp | path join $repo.name

	if ($folder | path exists) {
		cd $folder

		^git pull
	} else {

		let clone_status = ^git clone $link $folder
			| complete
			| get exit_code

		# Could not clone the repository for unknown reasons.
		if $clone_status != 0 {
			return null
		}

		cd $folder
	}

	let pushed_at = ^git show --quiet --date='format-local:%Y-%m-%dT%H:%M:%SZ' --format="%cd"

	{
		pushed_at: $pushed_at
		stargazers_count: -1
		avatar: ""
	}
}

# Parse link of repository.
def parse_link []: string -> record<owner: string, name: string> {
	let data = $in
		| split row '/'

	{
		owner: $data.3
		name: $data.4
	}
}

# Get extra information from  themes and save it.
export def main [
	--github: string # API Token for Github.
	--gitlab: string # API Token for Gitlab.
	--codeberg: string # API Token for Codeberg.
	--delay: duration = 2sec # Delay between API calls.
	--source: string = "../themes.json" # Themes data.
	--output: string = "./themes.json" # New data with themes.
	--timezone: string = "UTC0" # Timezone for git calls.
]: nothing -> nothing {

	$env.TZ = $timezone

	let data = open $source
		| each {|item|

			let link = $item.repository

			print $"Cloning ($link)."

			let info = if ($link | str contains 'github') {
				sleep $delay
				$link | parse_link | github $github
			} else if ($link | str contains 'gitlab') {
				sleep $delay
				$link | parse_link | gitlab $gitlab
			} else if ($link | str contains 'codeberg') {
				sleep $delay
				$link | parse_link | codeberg $codeberg
			} else {
				print "Using git cloning."
				$link | parse_link | clone $link
			}

			if ($info | is-empty) {
				print $"Could not clone this repository."
				print ""
			} else {
				print ""
				{
					...$item
					...$info
				}
			}
		}

	$data | save --force $output

	print "Replace the themes in the source directory? If no, will output the themes as JSON instead. To confirm, type either the word 'yes' or character 'y'."
	let ask = input "Answer: " | str downcase

	if $ask == 'y' or $ask == 'yes' {
		mv --force $output $source
	}
}

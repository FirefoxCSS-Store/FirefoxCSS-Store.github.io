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

	let item = http get $"https://api.github.com/repos/($repo.owner)/($repo.name)" --headers $headers

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

	let item = http get $"https://gitlab.com/api/v4/projects/($repo.owner)%2F($repo.name)" --headers $headers

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

	let item = http get $"https://codeberg.org/api/v1/repos/($repo.owner)/($repo.name)" --headers $headers

	{
		pushed_at: $item.updated_at
		stargazers_count: ($item.stars_count | into int)
		avatar: $item.owner.avatar_url
	}
}

# In case of not having API, clone and get information yourself.
export def clone [
	--temp: string = '/tmp/firefoxcss-store/' # Temporary folder to save themes.
]: record<owner: string, name: string> -> record<pushed_at: string, stargazers_count: int, avatar: string> {

	mkdir $temp

	let repo = $in
	let folder = $temp | path join $repo.name

	let success = if ($folder | path exists) {
		cd $folder

		^git pull

		true
	} else {

		let link = 'git@github.com:' + $repo.owner + '/' + $repo.name + '.git'

		let clone_status = ^git clone $link $folder
			| complete
			| get exit_code

		# Could not clone the repository for unknown reasons.
		if $clone_status != 0 {
			print --stderr $"Could not clone '($link)'."
			false
		}
		
		cd $folder

		true
	}

	let pushed_at = if $success {
		^git show --quiet --date='format-local:%Y-%m-%dT%H:%M:%SZ' --format="%cd"
	} else {
		""
	}

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
		| last 2

	{
		owner: $data.0
		name: $data.1
	}
}

# Get extra information from  themes and save it.
export def main [
	token: string # API Token.
	--delay: duration = 1sec # Delay between API calls.
	--source: string = "../themes.json" # Themes data.
	--output: string = "./themes.json" # New data with themes.
	--timezone: string = "UTC0" # Timezone for git calls.
]: nothing -> nothing {

	$env.TZ = $timezone

	let data = open $source
		| each {|item|

			let link = $item.repository

			let info = if ($link | str contains 'github') {
				sleep $delay
				$link | parse_link | github $token
			} else if ($link | str contains 'gitlab') {
				sleep $delay
				$link | parse_link | gitlab $token
			} else if ($link | str contains 'codeberg') {
				sleep $delay
				$link | parse_link | codeberg $token
			} else {
				$link | parse_link | clone
			}

			{
				...$item
				...$info
			}
		}
}

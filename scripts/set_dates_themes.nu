#!/usr/bin/env nu
#
# FirefoxCSS-Store <https://github.com/FirefoxCSS-Store/FirefoxCSS-Store.github.io>
# Maintainer: BeyondMagic - João Farias 2024 <beyondmagic@mail.ru>

const data_path = "../src/themes.json"

def error [owner: string, repository: string, link: string] {
    print --stderr $'[error] Theme named "($repository)" of the author "($owner)" does not exist or is private. Deleting it.'
    print --stderr $'        Link is: ($link)'
}

def parse_link [link: string] {
  let columns_slash = ($link | split row '/')
  let owner = ($columns_slash).3
  let repository = ($columns_slash).4
  [$owner $repository]
}

def dates [] {
  # Set timezone to 0 for the date format of external git command.
  $env.TZ = 'UTC0'

  open $data_path | each {|theme|
    let link = $theme.link
    let info = (parse_link $link)
    let owner = $info.0
    let repository = $info.1

    # Clone the repository to temporary disk and delete it.
    const temp = '/tmp/git_repo_temp'
    if (^git clone $link $temp | complete).exit_code != 0 {
      error $owner $repository $link
      continue
    }
    cd $temp
    let date = (^git show --quiet --date='format-local:%Y-%m-%dT%H:%M:%SZ' --format="%cd")
    $theme.date = $date
    cd -
    ^rm -rf $temp

    $theme
  }
}

def main [] {
  dates
}

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

def main [] {
  # Set timezone to 0 for the date format of external git command.
  $env.TZ = 'UTC0'

  let themes = (open $data_path | each {|data|
    mut theme = $data
    mut link = $theme.link
    let is_github = ($link | str contains 'github')

    mut owner = ''
    mut repository = ''

    # If github, force authentication using SSH link.
    if $is_github {
      let info = (parse_link $link)
      $owner = $info.0
      $repository = $info.1
      $link = ('git@github.com:' + $owner + '/' + $repository + '.git')
    }

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
  })

  print "Replace the themes in the source directory? If no, will output the themes as JSON instead. To confirm, type either the word 'yes' or character 'y'."
  let ask = input "Answer: " | str downcase
  if $ask == 'y' or $ask == 'yes' {
    mv --force ./themes.json ../src/themes.json
  } else {
    print ($themes | to json)
  }
}

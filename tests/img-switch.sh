#!/bin/bash

# this script will download the images of all the new themes
# then put those into /images/themes in the format webp
# change the file /themes.json for the new paths (docs/assets/img/themes/)
# then build the new files
# :)



## -
## vars
## -
  O="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
  # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ origin dir of the script
  path="../themes.json"                   # path to get the new themes
  pathout="images/themes"                 # path to put all the new image themes
  pathoutbuild="assets/img/themes/"       # path to change the new dirs in $path


## -
## script
## -
  grep '\"image\":' $O/$path | grep -o '"http.*' | sed -r 's/"//gm' > $O/links
  # ^^^^^^^^^^^^^^^^^^^^^^^ # parse all the links of the new themes to a file called links
  limit="$(wc -l $O/links | awk '{ print $1 }')"
  # ^^^^^^^^^^^^^^^^^^^^^^^ # limit of new themes urls to loop

  # loop through each url in the file
  for (( c=1; c<=$limit; c++ ))
  do
      ## set line and get image url
    img="$(sed -n $c\p $O/links)"
      ## create temp dir to download and get name
    mkdir "$O/temp"; cd "$O/temp"
      ## download
    wget "$img"
      ## get filename && new image name
    imgname="$(ls | sed -n 1p)"
    newimage="$(echo "${RANDOM}${imgname}" | sed -r 's_(\?\w+=.*)__gm')"
      ## mv file to pathout with the new name
    mv "$O/temp/$imgname" "$O/../$pathout/$newimage"
      ## remove te
    cd "$O/.."; rm -rf "$O/temp"
      ## replace string in file
    sed -i "s~${img}~$pathoutbuild/${newimage%.*}.webp~g" "$O/$path"
  done

  rm -rf "$O/links" # delete temporary files



## -
## build the changes
## -

  # install?!
  # npm install
  # build
  # npm run build

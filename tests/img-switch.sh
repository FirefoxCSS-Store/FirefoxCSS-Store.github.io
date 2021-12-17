#!/bin/bash
#
# this script will download the images of all the new themes
# then put those into /images/themes in the format webp
# change the file /themes.json for the new paths (docs/assets/img/themes/)
# then build the new files
# :)
#
# Note: This script ban be further optimized using unix built-ins,
#       however, since we are adding themes little by little, we can
#       continue with a script like this since it wont affect performance
#       as much as the full optimized script.
#       
#       Please, respect the syntax and line spacements.
#
# For https://github.com/FirefoxCSS-Store/FirefoxCSS-Store.github.io

# -------------------------------Variables------------------------------------

#   This get the origin dir of the script, this is easier if
#   something goes wrong
O="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

#   Path to get the new themes (notice that this is local)
path="../themes.json"

#   path to put all the new image themes
pathout="images/themes" 

#   path to change the new dirs in $path
pathoutbuild="assets/img/themes/"       

#--------------------------------Scripts--------------------------------------

# parse all the links of the new themes to a file called links
grep '\"image\":' $O/$path | grep -o '"http.*' | sed -r 's/"|,$//gm' > $O/links

# limit of new themes urls to loop
limit="$(wc -l $O/links | awk '{ print $1 }')"



# loop through each url in the file
for (( c=1; c<=$limit; c++ )); do

  # set line and get image url
  img="$(sed -n $c\p $O/links)"
  
  # create temp dir to download and get name
  mkdir "$O/temp"; cd "$O/temp"

  # download
  wget "$img"

  # get filename && new image name
   imgname="$(ls | sed -n 1p)"
  newimage="$(echo "${RANDOM}${imgname}" | sed -r 's_(\?\w+=.*)__gm')"

  #  mv file to pathout with the new name
  mv "$O/temp/$imgname" "$O/../$pathout/$newimage"

  # remove temp folder
  cd "$O/.."; rm -rf "$O/temp"

  # replace string in file
  sed -i "s~${img}~$pathoutbuild/${newimage%.*}.webp~g" "$O/$path"

done



# delete temporary files
rm -rf "$O/links" 

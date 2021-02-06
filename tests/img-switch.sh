i#!/bin/sh

# this script will download the images of all the new themes
# put those into /images/themes in the format webp
# change the file /themes.json for the new paths (docs/assets/img/themes/)
# then build the new files
# :)



## vars
orig="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
path="../themes.json"
out="../docs/assets/img/themes/"
pathout="assets/img/themes"

grep '\"image\":' $orig/$path | grep -o '"http.*' | sed -e 's/"//g' > $orig/links

start="$(ls -l $orig/$out | wc -l)"; start="$(($start - 1))"
limit="$(wc -l $orig/links | awk '{ print $1 }')"; limit="$(($start + $limit))"

mkdir $orig/imgs
for (( c=$start; c<$limit; c++ ))
do
  line="$(($c - $start + 1))"
  img="$(sed -n $line\p $orig/links)"
  wget "$img" -O "$orig/imgs/$c"
  mogrify -format webp "$orig/imgs/$c"
  mv "$orig/imgs/$c".webp "$orig/../images/themes/"

  # replace string in file
  sed -i "s_$(echo "$img")_$pathout/$c.webp_g" "$orig/$path"
done

rm -rf $orig/imgs $orig/links

# install?!
# npm install
# build
# npm run build



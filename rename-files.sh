#! /usr/bin/bash

query="XYZ"
replacement="ABC"

echo "Renaming.."

find . -type f -name "*${query}*" | while read -r FILE; do
    newfile=$(echo ${FILE} | sed -e "s/${query}/${replacement}/") ;
    mv "${FILE}" "${newfile}" ;
done
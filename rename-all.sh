#! /usr/bin/bash

query="lilac"

if [ "$1" ]; then
	replacement="$1"

	echo "Renaming.."

	find . -type f -or -type d -name "*${query}*" | while read -r FILE; do
		newfile=$(echo ${FILE} | sed -e "s/${query}/${replacement}/")
		mv "${FILE}" "${newfile}"
	done
else
	printf "Please provide you Project Name\n\n"
	printf "example: ./rename-all.sh my-awesome-project\n\n"
fi

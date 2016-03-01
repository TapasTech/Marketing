DIR=./build
if [ -d "$DIR" ]; then
    printf '%s\n' "Removing Lock ($DIR)"
    rm -rf "$DIR"
fi

./node_modules/.bin/webpack --progress --production --color 
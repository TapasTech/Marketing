DIR=./build
if [ -d "$DIR" ]; then
    printf '%s\n' "Removing Lock ($DIR)"
    rm -rf "$DIR"
fi

./node_modules/.bin/webpack --config webpack.config.prod.js --progress --production --color 
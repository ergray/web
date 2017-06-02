# liquid-web

This is a strange mutation of the [liquid-ios repo](https://github.com/liquidvote/liquid-ios), built for the web thanks to [`react-native-web`](https://github.com/necolas/react-native-web).

## Install

Download the repo (fork if you may send PRs).

Run `npm install` or `yarn install` to download the dependencies.

## Development

Run `npm start` to start the webpack server. Visit `http://localhost:3000` to view the app.

If testing locally on a mobile device using your local wifi network, you may need to edit the npm start command to include your computers specific IP address: `"start": "webpack-dev-server --port 3000 --progress --colors --inline --host 0.0.0.0 --public <your computers IP>"`

#### Linting
This project has strict eslint rules. Run `npm test` to check for linting.

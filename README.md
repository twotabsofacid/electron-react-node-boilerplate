# Electron React Node Boilerplate

> Clean, minimal React + Node served through Electron

## Requirements

This project uses the following versions of NodeJS and NPM:

```
node -v v16.8.0
npm -v 7.21.0
```

It probably works with other versions (personally tested on `node -v v14.17.5` and it's fine), but no guarantees.

This project requires an `.env` file. Copy `.env-example` as `.env`, which contains some port variables.

## Installing

To install just clone this repo, `cd` into it, and run

```
yarn install
```

That should be enough to get all the necessary components.

## Running

In the project directory, you can run:

### `yarn dev`

Runs the electron app and the node server.

The pages will reload if you make edits (making changes to NodeJS server side code will relaunch Electron).

## Code Structure

### Electron

The Electron component is broken up into two files, `wait-react.js` and `start.js`, which are in the `electron` folder.

```
electron/
  > start.js
  > wait-react.js
```

The `wait-react.js` script is called first, and it starts the server code and waits until it gets a response from that to fire up the actual electron script located in `electron/start.js`.

The `start.js` script opens up a `main` window (the main application).

### Server

The main server file is `server/index.js`, which starts an express server and socket io, waits for a connection from the front end and then instantiates socket communication file(s). You should include a separate communication file for each line of communication, even though this separation is for organization and does not actually exclude any channel from hearing messages from the client.

Those communication files are in:

```
server/
  components/
```

All socket communication to/from the react app to backend should happen from within these files. Important to note again, though, *there is no technical separation of the socket communication*. Each of these files in theory can listen to the same events (e.g. a `welcome` message from a socket on the front end could be listened to in both `server/components/componentOne` and `server/components/componentTwo`), so take care with what you call socket messages.

### Front End

On the frontend, pages are located in `src/pages/`, components for these pages are in `src/components/`, and helpers for these components are in `src/helpers/`.

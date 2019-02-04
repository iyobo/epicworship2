# EpicWorship 2

## This Project has moved to https://github.com/iyobo/epicworshipneo.
Lighter, Faster, Greater.

Migrating [EpicWorship v1](https://github.com/iyobo/epicworship) from Java to a fully-loaded ElectronJS/Angular 2 Desktop app.

### Dev Requirements
- NodeJS/npm

### Initial setup
- Run `sudo . setup.sh`

### Development/ Hot-compile*
- run `. dev.sh` to launch webpack on watch mode so you don't have to actively compile bundles everytime you make a change.
- You can use `command + r` to refresh an Electron window while making cosmetic changes.

### Repeatedly asked Q&A

**>Why are you spawning each projector as a seperate Electron process?**

ElectronJS has a noticeable pause when doing things like opening dashboard dialogs, file-pickers, etc. More details
	on this bug [here](https://github.com/electron/electron/issues/5081).
In the world of live-audience media projection, you can't have small pauses like that glitching up your
	presentations and videos while you are arranging things in the backend dashboard. The Quality suffers.


For any other questions, [Ask me on Twitter](https://twitter.com/IyoboEki) !

God Bless.

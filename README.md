## vaq (Vim Awesome Query)

[![npm version](https://badge.fury.io/js/%40wallerbuilt%2Fvaq.png)](https://badge.fury.io/js/%40wallerbuilt%2Fvaq)

### Description

A CLI tool built to automate [vim-plug](https://github.com/junegunn/vim-plug) usage.

- Query/Search/Info for plugins with the vimawesome api
- List installed plugins
- Uninstall plugins
- Update plugins

### Install

`npm i -g @wallerbuilt/vaq`

### Setting up with vim-plug

_IF_ your vim-plug plugin list is in a separate file from your vim config file, make sure to set the config path to that file instead.
Basically, vaq needs to have access to your `Plug` list in order to make the updates needed.

When first using the cli tool it will ask you for this path and keep it stored for future use.

### Use

`vaq`

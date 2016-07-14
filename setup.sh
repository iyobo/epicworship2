#!/usr/bin/env bash
npm install webpack electron-prebuilt -g
cd assets
npm install
cd ..
webpack

#!/bin/bash

rm -fr build/*
rm -fr builds/*
mkdir -p builds/user
mkdir -p builds/admin

cp scripts/user.js src/index.js && export NODE_OPTIONS="--max-old-space-size=8192" && react-scripts build
cp -a build/* builds/user

rm -fr build/*

cp scripts/admin.js src/index.js && export NODE_OPTIONS="--max-old-space-size=8192" && react-scripts build
cp -a build/* builds/admin

#!/bin/bash -v

set -e

# Build Ionic App for Android
ionic cordova platform add android


if [[ "$TRAVIS_BRANCH" == "master" ]]
then
    ionic cordova build android --prod --release
else
    ionic cordova build android
fi

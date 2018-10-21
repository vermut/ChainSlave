#!/bin/bash -v

set -e

# Build Ionic App for Android
ionic info
ionic cordova platform add android@7.0.0 --verbose
ionic info

if [[ "$TRAVIS_BRANCH" == "develop" ]]
then
    ionic cordova build android
else
    ionic cordova build android --prod --release
fi

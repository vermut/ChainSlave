#!/bin/bash -v

set -e

# Build Ionic App for Android
cordova plugin add "https://github.com/mnill/cordova-plugin-jitsi-meet"

ionic cordova platform add android --verbose

if [[ "$TRAVIS_BRANCH" == "develop" ]]
then
    ionic cordova build android
else
    ionic cordova build android --prod --release
fi

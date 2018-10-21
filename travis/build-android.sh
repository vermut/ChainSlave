#!/bin/bash -v

set -e

# Install plugin with special needs
ionic cordova plugin add https://github.com/mnill/cordova-plugin-jitsi-meet

# Build Ionic App for Android
ionic cordova platform add android --verbose

if [[ "$TRAVIS_BRANCH" == "develop" ]]
then
    ionic cordova build android
else
    ionic cordova build android --prod --release
fi

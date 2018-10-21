#!/bin/bash -v

set -e

# Install plugin with special needs
ionic cordova plugin add https://github.com/mnill/cordova-plugin-jitsi-meet

# Build Ionic App for iOS
ionic cordova platform add ios --verbose

if [[ "$TRAVIS_BRANCH" == "develop" ]]
then
    ionic cordova build ios
else
    ionic cordova build ios --prod --release
fi

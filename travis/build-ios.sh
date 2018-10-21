#!/bin/bash -v

set -e

# Build Ionic App for iOS
ionic info
ionic cordova platform add ios --verbose

if [[ "$TRAVIS_BRANCH" == "develop" ]]
then
    ionic cordova build ios
else
    ionic cordova build ios --prod --release
fi

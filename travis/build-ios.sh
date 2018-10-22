#!/bin/bash -v

set -e

# Build Ionic App for iOS
ionic cordova platform add ios

if [[ "$TRAVIS_BRANCH" == "develop" ]]
then
    ionic cordova build ios --device
else
    ionic cordova build ios --prod --release --device
fi

#! /bin/bash

# remove debug plugin
cordova plugin rm cordova-plugin-console

cordova build --release android

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore bookmarks-release-key.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk bookstore_release

# remove old apk and rebuild
rm Bookmarks.apk
~/android-sdk-linux/build-tools/23.0.3/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk Bookmarks.apk

#!/bin/bash

# https://github.com/atom/electron/blob/master/docs/tutorial/mac-app-store-submission-guide.md
# Name of your app.
APP="Croissant the Pizza Cat"
# The path of you app to sign.
APP_PATH="../electron-builds/Croissant the Pizza Cat-darwin-x64/Croissant the Pizza Cat.app"
# The path to the location you want to put the signed package.
RESULT_PATH="/Users/mckenna/Desktop/$APP.pkg"
# The name of certificates you requested.
APP_KEY="3rd Party Mac Developer Application: "
INSTALLER_KEY="3rd Party Mac Developer Installer: "

FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"

codesign --deep -fs "$APP_KEY" --entitlements mac-child.plist "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A"
codesign --deep -fs "$APP_KEY" --entitlements mac-child.plist "$FRAMEWORKS_PATH/$APP Helper.app/"
codesign --deep -fs "$APP_KEY" --entitlements mac-child.plist "$FRAMEWORKS_PATH/$APP Helper EH.app/"
codesign --deep -fs "$APP_KEY" --entitlements mac-child.plist "$FRAMEWORKS_PATH/$APP Helper NP.app/"
if [ -d "$FRAMEWORKS_PATH/Squirrel.framework/Versions/A" ]; then
  # Signing a non-MAS build.
  codesign --deep -fs "$APP_KEY" --entitlements mac-child.plist "$FRAMEWORKS_PATH/Mantle.framework/Versions/A"
  codesign --deep -fs "$APP_KEY" --entitlements mac-child.plist "$FRAMEWORKS_PATH/ReactiveCocoa.framework/Versions/A"
  codesign --deep -fs "$APP_KEY" --entitlements mac-child.plist "$FRAMEWORKS_PATH/Squirrel.framework/Versions/A"
fi
codesign -fs "$APP_KEY" --entitlements mac-parent.plist "$APP_PATH"

productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"

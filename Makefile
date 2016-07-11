ios: libsodium/libsodium-ios

android: lib

libsodium/libsodium-ios: libsodium
	pushd libsodium && ./autogen.sh && ./dist-build/ios.sh && \
	cp -r libsodium-ios ../src/

libsodium: get-externals
	#Libsodium downloaded (iOS copy)

libsodium-jni: get-externals
	#echo "Libsodium downloaded (Android copy)"

get-externals:
	git submodule init
	git submodule sync
	git submodule update --recursive

rebuild: distclean ios android

distclean:
	rm -rf libsodium
	rm -rf libsodium-jni

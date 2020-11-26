#!/usr/bin/env bash

set -x
set -e
set -u
set -o pipefail

# ATTN: Only run this file from the project root directory

mkdir -p build/temp
rm -rf build/temp/*

mkdir -p dist
rm -rf dist/*

# Unpacked extensions, with manifests
mkdir dist/unpacked
mkdir dist/unpacked/chrome
mkdir dist/unpacked/firefox
mkdir dist/unpacked/brave

# For store submission
mkdir dist/packed

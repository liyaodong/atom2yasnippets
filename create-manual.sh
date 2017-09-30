#!/bin/sh

(find ./dist -type f | xargs cat) > ./manual.txt

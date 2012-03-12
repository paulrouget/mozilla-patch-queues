#!/bin/sh
hg qpop -a && git add patches-* && git commit -a -m "update" && git push

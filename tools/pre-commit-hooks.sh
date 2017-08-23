#!/bin/sh

# To install this file:
#
# ```
# ln -s ../../tools/pre-commit-hooks.sh .git/hooks/pre-commit
# chmod +x .git/hooks/pre-commit
# ```
#

# To override this file:
#
# ```
# git commit --no-verify
# ```
#


# Don't commit if diff contains any of our banned words
# modified from https://stackoverflow.com/questions/13877469/how-to-disable-git-push-when-there-are-todos-in-code/13912426
for FILE in `git diff --name-only --cached`; do

    # Check for the keyword 'nocommit'
    grep 'nocommit' $FILE 2>&1 >/dev/null
    if [ $? -eq 0 ]; then
        echo ''
        echo 'ERROR:' $FILE 'contains "nocommit"'
        echo ''
        exit 1
    fi

    # Check for localhost:1776, our local api url
    grep 'localhost:1776' $FILE 2>&1 >/dev/null
    if [ $? -eq 0 ]; then
        echo ''
        echo 'ERROR:' $FILE 'contains "localhost:1776"'
        echo ''
        echo 'To override, use "git commit --no-verify"'
        echo ''
        exit 1
    fi

    # Check for localhost:2018, our local api2 url
    grep 'localhost:2018' $FILE 2>&1 >/dev/null
    if [ $? -eq 0 ]; then
        echo ''
        echo 'ERROR:' $FILE 'contains "localhost:2018"'
        echo ''
        echo 'To override, use "git commit --no-verify"'
        echo ''
        exit 1
    fi

done

exit

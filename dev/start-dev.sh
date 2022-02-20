#!/usr/bin/env bash

db_migrated_file="dev/.db-migrated"

set -e

yarn install

if [ ! -f $db_migrated_file ]
then
    npx blitz prisma migrate dev -n initial
#    npx prisma db seed ./db/seeds/index.ts
    date > $db_migrated_file
else
    echo "No migration needed"
fi

yarn dev

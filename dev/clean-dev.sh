#!/usr/bin/env bash

db_migrated_file="dev/.db-migrated"

rm -R dev/data/{db,pg4admin}
rm $db_migrated_file

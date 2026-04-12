#!/bin/bash
read -p "Enter hostname (public accessable): " hostname
read -p "Enter CouchDB  username: " username
read -s -p "Enter CouchDB  password: " password
echo
read -p "Enter CouchDB Node [_local]: " node
node=${node:-_local}

export hostname
export username
export password
export node

echo "-- Configuring CouchDB... -->"

until (curl -X POST "${hostname}/_cluster_setup" -H "Content-Type: application/json" -d "{\"action\":\"enable_single_node\",\"username\":\"${username}\",\"password\":\"$>
until (curl -X PUT "${hostname}/_node/${node}/_config/chttpd/require_valid_user" -H "Content-Type: application/json" -d '"true"' --user "${username}:${password}"); do sl>
until (curl -X PUT "${hostname}/_node/${node}/_config/chttpd_auth/require_valid_user" -H "Content-Type: application/json" -d '"true"' --user "${username}:${password}"); >
until (curl -X PUT "${hostname}/_node/${node}/_config/httpd/WWW-Authenticate" -H "Content-Type: application/json" -d '"Basic realm=\"couchdb\""' --user "${username}:${pa>
until (curl -X PUT "${hostname}/_node/${node}/_config/httpd/enable_cors" -H "Content-Type: application/json" -d '"true"' --user "${username}:${password}"); do sleep 5; d>
until (curl -X PUT "${hostname}/_node/${node}/_config/chttpd/enable_cors" -H "Content-Type: application/json" -d '"true"' --user "${username}:${password}"); do sleep 5; >
until (curl -X PUT "${hostname}/_node/${node}/_config/chttpd/max_http_request_size" -H "Content-Type: application/json" -d '"4294967296"' --user "${username}:${password}>
until (curl -X PUT "${hostname}/_node/${node}/_config/couchdb/max_document_size" -H "Content-Type: application/json" -d '"50000000"' --user "${username}:${password}"); d>
until (curl -X PUT "${hostname}/_node/${node}/_config/cors/credentials" -H "Content-Type: application/json" -d '"true"' --user "${username}:${password}"); do sleep 5; do>
until (curl -X PUT "${hostname}/_node/${node}/_config/cors/origins" -H "Content-Type: application/json" -d '"app://obsidian.md,capacitor://localhost,http://localhost"' ->

echo "<-- Configuring CouchDB Done!"

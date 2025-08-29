#!/bin/sh

set -e

echo "Starting the application..."
exec bun run index.js

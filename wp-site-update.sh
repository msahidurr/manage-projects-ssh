#!/bin/bash

# Directory where WordPress is installed
WP_PATH=$1

# Check for updates to WordPress core
wp core check-update --path=$WP_PATH

# Check for updates to themes
wp theme list --update=available --path=$WP_PATH

# Check for updates to plugins
wp plugin list --update=available --path=$WP_PATH

if [ "$2" == "apply" ]; then
    # Apply updates to WordPress core
    wp core update --path=$WP_PATH

    # Apply updates to themes
    wp theme update --all --path=$WP_PATH

    # Apply updates to plugins
    wp plugin update --all --path=$WP_PATH
fi

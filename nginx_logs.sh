#!/bin/bash

# Default time range (last 10 minutes)
TIMEFRAME=${1:-10}
LOG_FILE="/var/log/nginx/access.log"
OUTPUT_FILE="/tmp/parsed_nginx_logs.txt"

# Calculate the time range
START_TIME=$(date --date="$TIMEFRAME minutes ago" "+%d/%b/%Y:%H:%M")
END_TIME=$(date "+%d/%b/%Y:%H:%M")

# Parse the log file and count requests per IP within the timeframe
echo "Parsing Nginx logs for IPs with high request volumes between $START_TIME and $END_TIME..." > $OUTPUT_FILE
awk -v start="$START_TIME" -v end="$END_TIME" '$4 > "["start && $4 < "["end {print $1}' $LOG_FILE | sort | uniq -c | sort -nr | awk '{if($1 > 100) print "IP: "$2 " - Requests: "$1}' >> $OUTPUT_FILE

echo "Parsing complete. Check the output in $OUTPUT_FILE"

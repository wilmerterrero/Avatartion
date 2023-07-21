#!/bin/bash

# Replace "/path/to/directory" with the actual directory path you want to process
directory_path="/path/to/directory"

# Function to rename files from *.js to *.jsx
find "$directory_path" -type f -name "*.js" -print0 | while IFS= read -r -d '' file; do
  if [ -f "$file" ]; then
    new_name="${file%.js}.jsx"
    mv "$file" "$new_name"
    echo "Renamed $file to $new_name"
  fi
done


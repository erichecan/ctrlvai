#!/bin/bash

cd /Users/he/Documents/03-eric/cursor/data/blogs/markdown

# 按字母顺序重命名文件
counter=1
for file in $(ls -1 *.md | grep -v '^_' | sort); do
  if [ "$file" != "_template.md" ]; then
    new_name=$(printf "%03d-%s" $counter "$file")
    echo "Renaming $file to $new_name"
    mv "$file" "$new_name"
    ((counter++))
  fi
done

echo "Renaming complete. Total files renamed: $((counter-1))"
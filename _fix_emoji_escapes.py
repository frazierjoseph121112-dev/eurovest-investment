#!/usr/bin/env python3
"""Fix broken \\U0001fXXXX Unicode escapes in HTML files.
These are Python-style escapes that were accidentally left in JavaScript
string contexts, where they render as literal text like 'U0001310' instead
of the intended emoji character.
"""
import re

# Map of broken escape -> actual emoji character
EMOJI_MAP = {
    r'\U0001f310': '\U0001f310',  # 🌐 globe with meridians
    r'\U0001f4ca': '\U0001f4ca',  # 📊 bar chart
    r'\U0001f389': '\U0001f389',  # 🎉 party popper
    r'\U0001f4b0': '\U0001f4b0',  # 💰 money bag
    r'\U0001f4cb': '\U0001f4cb',  # 📋 clipboard
    r'\U0001f4f2': '\U0001f4f2',  # 📲 mobile phone with arrow
}

files = ['user/dashboard.html', 'admin/dashboard.html']

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    replacements = 0
    
    for broken, emoji in EMOJI_MAP.items():
        # The broken escape appears as literal backslash + U0001fXXXX in the file
        # In the file it's stored as \U0001fXXXX (single backslash in the raw file)
        count = content.count(broken)
        if count > 0:
            content = content.replace(broken, emoji)
            replacements += count
            print(f"  {filepath}: replaced {count}x '{broken}' -> '{emoji}'")
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ {filepath}: {replacements} total replacements, file saved")
    else:
        print(f"  {filepath}: no changes needed")

print("\nDone!")

import json

try:
    with open('eslint_report.json', 'r', encoding='utf-16le') as f:
        data = json.load(f)
    
    for file_data in data:
        if file_data['errorCount'] > 0:
            print(f"File: {file_data['filePath']}")
            for msg in file_data['messages']:
                if msg['severity'] == 2:
                    print(f"  Line {msg['line']}:{msg['column']} - {msg['message']} ({msg['ruleId']})")
except Exception as e:
    print(f"Error: {e}")

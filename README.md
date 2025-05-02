Static Application Security Testing Tool: LeapFix SAST Scan VS Code Extension
Results:
LeapFix found multiple areas where I was not sanitizing the input given to my functions. To address those vulnerabilities, a sanitization function was added to replace some common special characters used in XSS attacks. Looking at 'server.js', LeapFix notified me about hardcoded credentials (they're gone don't worry) and other issues that I attempted to address.

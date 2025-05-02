# Hardened Weather Forecast App
Using [WeatherAPI](https://www.weatherapi.com/) users can input a valid ZIP code and receive a 3-Day weather forecast. 

## Objective:
Apply security concepts learned in CIT368 to create a less vulnerable web application. 

## Documentation:
<ins>Testing</ins>
SAST Tool: [LeapFix SAST Scan](https://marketplace.visualstudio.com/items?itemName=FernandoMengali.leapfix-sast-scan&ssr=false#overview) _VS Code Extension_
Results:
LeapFix found multiple areas where I was not sanitizing the input given to my functions. To address those vulnerabilities, a sanitization function was added to replace some common special characters used in XSS attacks. Looking at 'server.js', LeapFix notified me about hardcoded credentials (they're gone don't worry) and other issues that I attempted to address.

<ins>SBOM</ins> _coming soon_
<ins>Dependencies</ins> _coming soon_
<ins>Threat Modeling</ins> _coming soon_


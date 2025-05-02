# Hardened Weather Forecast App

### Description
Using [WeatherAPI](https://www.weatherapi.com/) users can input a valid ZIP code and receive a 3-Day weather forecast. 
![Image](https://github.com/user-attachments/assets/93c1d487-b5f6-454e-a2d6-0e4c7aded7ec)

</br>

## Documentation
<ins>Testing</ins> </br>
SAST Tool: [LeapFix SAST Scan](https://marketplace.visualstudio.com/items?itemName=FernandoMengali.leapfix-sast-scan&ssr=false#overview) _VS Code Extension_ </br>
Results:
LeapFix found multiple areas where I was not sanitizing the input given to my functions. To address those vulnerabilities, a sanitization function was added to replace some common special characters used in XSS attacks. Looking at 'server.js', LeapFix notified me about hardcoded credentials (they're gone don't worry) and other issues that I attempted to address.

<ins>SBOM</ins> _coming soon_ </br>
<ins>Dependencies</ins> _coming soon_ </br>
<ins>Threat Modeling</ins> _coming soon_ </br>


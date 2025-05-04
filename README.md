# Hardened Weather Forecast App

### Description
Using [WeatherAPI](https://www.weatherapi.com/) users can input a valid ZIP code and receive a 3-Day weather forecast. 
![Image](https://github.com/user-attachments/assets/93c1d487-b5f6-454e-a2d6-0e4c7aded7ec)

</br>

## Documentation
#### Testing </br>
SAST Tool: [LeapFix SAST Scan](https://marketplace.visualstudio.com/items?itemName=FernandoMengali.leapfix-sast-scan&ssr=false#overview) _VS Code Extension_ </br>
Results:
LeapFix found multiple areas where I was not sanitizing the input given to my functions. To address those vulnerabilities, a sanitization function was added to replace some common special characters used in XSS attacks. Looking at 'server.js', LeapFix notified me about hardcoded credentials (they're gone don't worry) and other issues that I attempted to address.

#### SBOM
The full CycloneDX SBOM can be found in (you guessed it) **SBOM.txt**. Looking at my grand total of 5 dependencies in **package.json**, I am absolutely disgusted with how long this file is. 
![Image](https://github.com/user-attachments/assets/87920d44-766b-41c1-96b5-fc171057ff0a)

#### Dependencies
As mentioned above, my application has 5 dependencies all of which have to deal with the Node.js proxy that handles external API calls. Those dependencies include Axios 1.9.0, CORS 2.8.5, dotenv 16.5.0, Express.js 5.1.0, and Express Rate Limit 7.5.0. Additionally, there is one developer dependency which is Cypress 14.3.2. This was attempted to be used for end-to-end testing which proved to be very difficult as I had to try to configure my E2E tests to use my proxy and WeatherAPI key, and it was really just a mess as a first-time user of Cypress. 

#### Third Party API
WeatherAPI has been very easy to work with, I had never used it prior to building this app. All weather data is given in JSON which makes it simple to parse and display as needed. Admittedly, I do not know much about who runs the service but their data is accurate and their API is seemingly popular with a large amount of developers. Basic contact info is available on their site as well as where the creators are based out of.

#### Threat Modeling
Threat #1: XSS Attack - All user input is sanitized before being used in any functions or getting sent to the API.\
Threat #2: Data Tampering - WeatherAPI uses secure HTTPS protocols for all requests and responses, which greatly reduces the risk of a malicious actor altering the data in transit between the server and the API. On the server side, the application only sends three parameters to WeatherAPI: an API key, a ZIP code, and the number of days for a forecast. Of those, the user is only responsible for the ZIP code, which must be valid.\
Threat #3: Excessive API Calls - By using the [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit) package, I can configure my proxy to not allow for a certain amount of calls within a specified time limit. In this case, I have limited it to 50 calls within a window of 15 minutes. 
```
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes in milliseconds
  limit: 50, //maximum of 50 requests
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: "Too many requests, knock it off.",
});
```
One threat that my application does not address is the potential for someone to attempt an attack on the third party API. Of course, there are precautions that can be taken to account for this but fundamentally, this application is entirely dependent on WeatherAPI being available and providing their data. This is just a risk that you have to consider when building applications around third party APIs, similar to how when developing apps for Windows/Linux platforms you have to consider that a user's OS could be compromised. 


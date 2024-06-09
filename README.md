# Weather-App

### Code Flow and Logic

1. **Imports**:
   - Import necessary libraries, components, and CSS.

2. **WeatherApp Component**:
   - Initializes state variables for user input, weather data, loading status, error status, and dark mode.

3. **Helper Functions**:
   - `toDateFunction`: Returns the current date and time.
   - `saveWeatherDataToStorage`: Saves weather data to local storage.

4. **Effect Hooks**:
   - `useEffect` (on mount): Loads saved weather data from local storage.
   - `useEffect` (dark mode): Toggles dark mode class on the body element.

5. **Search Function**:
   - Triggered by pressing Enter.
   - Fetches weather data from the API.
   - Updates weather data and saves to local storage.
   - Handles loading and error states.

6. **Dark Mode Toggle**:
   - Toggles between dark and light modes.
   - Saves preference to local storage.

7. **Remove Weather Data**:
   - Removes a specific weather entry from the list and updates local storage.

8. **UI Rendering**:
   - Displays the app name, dark mode toggle button, search bar, loading spinner, error message, and weather data.
   - Highlights the latest search result in yellow.

### Highlighting Latest Search
- Adds `latest-search` class to the most recent weather entry.
- CSS styles `latest-search` to be yellow.

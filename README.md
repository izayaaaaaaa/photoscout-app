# PhotoScout App Development Challenge

## Overview

The "photoscout-app" is a React Native mobile application that focuses on location-based services. The project is structured to facilitate the development of a cross-platform mobile app with a focus on user experience and functionality. The architecture is designed to support a modern, scalable, and maintainable application that provides a rich user experience for location-based services.

The project structure includes:

- **Root Directory**: Contains high-level project files such as `README.md` and `developer-challenge.pdf`.
- **photoscout-app Directory**: The main directory where the application code resides.
  - **api**: Contains files related to API calls for interacting with a backend service.
  - **assets**: Holds images and other static assets used within the application.
  - **components**: Contains reusable React components that build the UI of the application.
  - **contexts**: Includes context files for managing global and custom location contexts using React's Context API.

### Requirements Accomplished

- Utilize a user-friendly map SDK to display default scenic locations with pins.
- Allow users to add custom locations directly from the map screen.
- Provide a clear interface for users to name custom locations.
- Distinguish default and custom locations for clarity.
- Enable users to select a location from the list to access details.
- When a location is selected, display a detailed screen.
- Include an option for users to input and edit notes about the location.
- Ensure all information entered is persisted between app launches.
- Fetch default locations from the provided JSON file dynamically.
- Implement internet connectivity checks to ensure smooth data retrieval.
- Store user-added locations and notes locally for offline accessibility.
- Use third-party libraries judiciously, focusing on enhancing specific functionalities rather than solving the entire problem.

## ToDo

### Remaining Requirements

- Present a sorted list of all locations based on distance (not sure on whose distance?)
- Include unit tests to validate critical app functions, ensuring robustness.

### Additional Features

- Search marker should be draggable
- Clicking a marker should show more details
- A detailed view of a marker should give the option to refocus the map view to its respective marker
- Error handling for invalid locations
- Make the UI more aesthetically pleasing

### Non-critical Bugs

- Error handling for invalid locations
- (list modal) click one item the list, mapview focuses on the coordinates of said item/marker
- search marker should be draggable
- details modal pops up on empty current marker bug
- click a marker pin, more details are shown

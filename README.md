Here’s the revised version of the README.md with the formatting fixed:

---

# 365 Day Counter

A simple web application that displays a progress bar indicating the percentage of the year that has passed.

## Table of Contents

- [365 Day Counter](#365-day-counter)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API](#api)
    - [GET /api/progress](#get-apiprogress)
      - [Response](#response)
  - [Contributing](#contributing)
  - [License](#license)

## Requirements

- Node.js (version 14 or higher)
- npm (version 6 or higher)
- A modern web browser

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/ahmetdzdrr/365-day-counter.git
    ```
2. Navigate to the project directory:
    ```sh
    cd 365-day-counter
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the development server:
    ```sh
    npm run dev
    ```
2. Open your browser and navigate to `http://localhost:3000`.

## API

### GET /api/progress

Returns the progress of the year.

#### Response

```json
{
  "daysPassed": 123,
  "percentage": 33.7,
  "isComplete": false,
  "endDate": "31-12-2023",
  "currentDate": "03-05-2023"
}
```

- `daysPassed`: Number of days passed since the start of the year.
- `percentage`: Percentage of the year that has passed.
- `isComplete`: Boolean indicating if the year is complete.
- `endDate`: The end date of the year.
- `currentDate`: The current date.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

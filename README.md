# Bug Tracker Application

Welcome to the Bug Tracker Application! This application allows users to sign in, view a dashboard displaying all reported bugs, and create new bug reports. Users can filter bugs by priority and view detailed information for each bug. Below is a detailed guide on how to set up and use the application.

## Features

- **Sign In Page**: Authenticate users before accessing the dashboard.
- **Dashboard**: Displays a list of bugs with details such as title, description, status (open/closed), priority, and time spent.
- **Bugs Page**: Allows users to create new bug reports through a modal form.
- **Filter**: Filter bugs based on their priority.

## Getting Started

### Prerequisites

- Node.js (version 12 or later)
- npm or yarn

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/prynsh/FealtyX.git
    cd FealtyX
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Run the application**

    ```bash
    npm run dev
    ```

    The application will start on `http://localhost:3000`.

## Usage

### Sign In

Navigate to the `/signin` page and enter your credentials to log in.

### Dashboard

Once logged in, you will be redirected to the dashboard. Here you can:

- **View Bugs**: See all reported bugs with their details.
- **Bug Details**: Click on any bug to view its detailed information, including title, description, status, priority, and time spent.

### Bugs Page

- **Create New Bug**: Click on the "New Task" button to open a modal form. Fill in the necessary details (title, description, priority, etc.) and submit to create a new bug report.
- **Filter Bugs**: Use the priority filter to view bugs based on their priority level.

## Features Detail

- **Sign In Page**:
  - Provides a form to log in using username and password.

- **Dashboard**:
  - Displays a table with columns: Title, Description, Status, Priority, and Time Spent.
  - Status can be toggled between Open and Closed.

- **Bugs Page**:
  - Modal form for creating new bug reports.
  - Fields include: Title, Description, Priority, and Time Spent.
  
- **Filter Functionality**:
  - Dropdown or input to filter bugs by priority (High, Medium, Low).



## Contact

For any questions or feedback, please contact me at [prynsshh@gmail.com].

---



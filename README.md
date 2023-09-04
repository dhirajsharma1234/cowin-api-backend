# Vaccine Registration App - API Documentation

This documentation provides an overview of the routes and controllers used in the Vaccine Registration App built with Node.js and Express.js.

## Admin Routes

### Admin Login

-   **Route**: `POST /admin/login`
-   **Controller**: `admin.adminLogin`
-   **Description**: Allows the admin to log in with their credentials.

### Get All Users

-   **Route**: `GET /admin/users`
-   **Controller**: `admin.getAllUsers`
-   **Description**: Retrieves information about all registered users. Optionally, it can filter users based on age, pincode, and vaccination status.

### Registered Slots

-   **Route**: `GET /admin/registeredSlots`
-   **Controller**: `admin.registeredSlots`
-   **Description**: Fetches information about the registered vaccine slots on a given day.

## User Routes

### User Registration

-   **Route**: `POST /register`
-   **Controller**: `user.register`
-   **Description**: Allows users to register by providing necessary information.

### User Login

-   **Route**: `POST /login`
-   **Controller**: `user.login`
-   **Description**: Allows registered users to log in using their credentials.

### Get Available Time Slots

-   **Route**: `GET /available-time-slots`
-   **Controller**: `user.getAvailableTimeSlot`
-   **Description**: Retrieves the available vaccine time slots.

### Update Slot

-   **Route**: `PATCH /update-slot/:slot_id`
-   **Controller**: `user.updateSlot`
-   **Description**: Allows users to update their registered vaccine slot with a new time slot.

### Update Vaccination Status

-   **Route**: `PATCH /updateStatus`
-   **Controller**: `user.updateStatus`
-   **Description**: Allows users to update their vaccination status (e.g., first dose completed).

## Authentication

Authentication middleware is used to protect routes that require user authentication. Admin login is handled separately for admin-specific routes.


# School Management System API

This API allows you to manage schools, including adding new schools and retrieving a list of nearby schools based on geographical coordinates.

## Endpoints

### 1. Get List of Nearby Schools

**Endpoint**: `/listSchools`

**Method**: `GET`

**Description**: Retrieve a list of schools that are near a specified geographical location based on latitude and longitude.

**Query Parameters**:
- `latitude` (required): The latitude of the location to search nearby schools.
- `longitude` (required): The longitude of the location to search nearby schools.

**Example Request**:
```
GET https://school-management-c68r.onrender.com/listSchools?latitude=12.345678&longitude=98.765432
```

**Example Response**:
```json
[
    {
        "id": 1,
        "name": "ABC School",
        "address": "123 Main St, Anytown",
        "latitude": 12.346789,
        "longitude": 98.765432
    },
    {
        "id": 2,
        "name": "XYZ School",
        "address": "456 Elm St, Othertown",
        "latitude": 12.345678,
        "longitude": 98.765900
    }
]
```

### 2. Add a New School

**Endpoint**: `/addSchool`

**Method**: `POST`

**Description**: Add a new school to the database.

**Request Body**:
- `name` (required): The name of the school.
- `address` (optional): The address of the school.
- `latitude` (required): The latitude of the school's location.
- `longitude` (required): The longitude of the school's location.

**Example Request**:
```json
POST https://school-management-c68r.onrender.com/addSchool

{
    "name": "New School",
    "address": "789 Maple St, Newtown",
    "latitude": 12.349876,
    "longitude": 98.764321
}
```

**Example Response**:
```json
{
    "id": 3,
    "message": "School added successfully."
}
```

## Installation and Setup

1. **Clone the repository**:
    ```sh
    git clone https://github.com/shinewithsachin/School-Management.git
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    - Create a `.env` file in the root of the project.
    - Add the following environment variables:
      ```ini
      HOST=3000
      USER=your_database_user
      PASSWORD=your_database_password
      TABLE=your_table_name
      DB_PORT=your_database_port
      DATABASE=your_database_name
      ```

4. **Run the application**:
    ```sh
    npm start
    ```

## Technologies Used

- **Node.js**
- **Express**
- **MySQL**
- **dotenv**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

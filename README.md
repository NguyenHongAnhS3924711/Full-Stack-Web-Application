# Online-Learning-Platform
## Project overview
This project is an online learning platform developed using Node.js with Express as the server framework, and MongoDB as the primary database for user information. It provides user authentication, course management, and a user-friendly interface for both instructors and learners.
## Video demostration
This video provides an overview of how the platform works, including course browsing and user authentication: [Video]().

---

## Features (Working)
- User Authentication (with login, registration, and password reset functionality).
- Instructor and Learner roles.
- Ability to browse courses.
- Secure session handling using express-session.
- Password encryption using bcrypt.
- View FAQs forum
- Session Management: Secure user sessions using express-session
## Dependencies
To install the project dependencies, run:
```
npm install bcrypt body-parser cors ejs express express-session mongodb mongoose nodemailer
```
- `bcrypt`: For password hashing and encryption.
- `body-parser`: For parsing incoming request bodies.
- `cors`: To enable Cross-Origin Resource Sharing.
- `ejs`: For rendering dynamic HTML templates.
- `express`: For server-side handling.
- `express-session`: For managing user sessions.
- `helmet`: For enhancing security.
- `mongodb` & `mongoose`: For database operations and object modeling in MongoDB.
- `nodemailer`: Sending emails for password reset functionality.
## Setup
### Prerequisites
Ensure that the following software is installed on your system:
- Node.js
- MongoDB
### Configuration
1. Load the pre-defined database by using `node .\seedCourses.js` and `node .\seedUsers.js`
2. Start MongoDB services
3. Run the project:
```
nodemon .\app.js
```
---
## Testing
### Testing accounts
#### Admin account
**Emily Davis**
- Email: emily.davis@example.com
- Password: securepassword1
### Instructor account
1. **Michael Brown**
   - Email: michael.brown@example.com
   - Password: securepassword2
2. **John Smith**
   - Email: john.smith@example.com
   - Password: securepassword5
### Learner account
**Sarah Wilson**
- Email: sarah.wilson@example.com
- Password: securepassword3
---
## Planned Features (Under Development)
- Admin profile: Admin should be able to perform CRUD to the database.
- Learner: Users should be able to enroll in to courses.
## Known Issues
1.  Registration and Data Update Issues
    - Problem: Users are unable to register and update their data in the database.
    - Possible Cause: Cross-Origin Resource Sharing (CORS) violations or failed image uploads.
2. Instructor Profile Not Displayed Properly
   - Problem: Instructor profiles are not rendering correctly, either missing data or layout issues.
   - Possible Cause: Error in fetching data from the database.
3. Home Page Not Showing Featured Courses and Instructors
   - Problem: The home page does not display the featured courses or instructors as intended.
   - Possible Cause: Data fetching and rendering issues on the front-end.
4. Forgot password
   - Problem: Forgot password not work as inteded and failed to perform action 'Post'.
   - Possible Cause: Incorrect configuration of the Nodemailer email service
---
## Contribution:
- Nguyen Hong Anh - s3924711: 7 Points

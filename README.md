# E-commerce Website

This project emulates the working of an E-commerce website. The frontend is made using Angular, while the backend uses Node.js and Express.js. The data for the products and customers is stored in a PostreSQL database.

To run this application, open a web browser and enter `http://slimebucket.s3-website-us-east-1.amazonaws.com`.

### CI/CD Pipeline using CircleCI

The project has been configured so that whenever new code is pushed onto the GitHub repository, it triggers a pipeline using CircleCI and automatially uploads the contents of the project onto different AWS services, deploying the newest version of the application on the cloud.

### Infrastructure description

Static files built from the Angular project in the frontend folder are stored in an S3 bucket. The ACL is configured to allow public read access, which allows anyone to read the contents of the website, without editing them.

The backend API is hosted on an EC2 instance configured using AWS Elastic Beanstalk. It runs on 64 bit Amazon Linux 2 with Node.js 14. It acts as an intermediary between the frontend and the database.

The API refers a publicly accessible Postgres 12 database stored on AWS RDS.

### Dependencies

To build the project locally npm 7, Node.js 14 and pip 3 need to be installed. pip is required to install EB CLI which allows for the easy deployment of the application to AWS Elastic Beanstalk.

To configure Angular to work in a development environment, go to Frontend/src/environments/ and edit the environment.prod.ts and set the value of environment.production to false. This will allow the user to set different values for production and development environment variables. This is already configured in the Node.js/Express.js backend.
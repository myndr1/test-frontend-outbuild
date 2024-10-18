# test-frontend-outbuild

## Description

This is a frontend project built with React and TypeScript for the job application "Front-end with Experience in Real-Time Collaboration" from Outbuild. The application includes login functionality, credential validation, pagination for the data displayed on the dashboard, and routing. It adheres to clean code principles throughout the project. All the requested features were implemented, including the bonus points.

## Main Technologies

- **React**: ^18.3.1
- **TypeScript**: ^4.9.5
- **React Router DOM**: ^6.27.0
- **React Toastify**: ^10.0.6
- **React Icons**: ^5.3.0

## Available Scripts

In the project, you can run the following commands:

### `npm install`
### `npm run start`

Starts the application in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

<!-- ### `npm test`

Launches the test runner using **Jest** and **Testing Library**. -->

### `npm run lint`

Runs **ESLint** to check for any linting issues in the TypeScript files.

### `npm run lint:fix`

Runs **ESLint** to automatically fix the issues that can be resolved.

## Dependencies

### Production

- **React**: ^18.3.1
- **React DOM**: ^18.3.1
- **React Router DOM**: ^6.27.0
- **React Toastify**: ^10.0.6
- **React Icons**: ^5.3.0

### Development

- **React**: ^18.3.1
- **TypeScript**: ^4.9.5
- **ESLint**: ^8.57.1
- **Prettier**: ^3.3.3
- **Jest**: For unit testing.
- **Testing Library**: For component testing.

## Linting and Formatting Configuration

The project uses **ESLint** with support for **TypeScript** and **React**, along with **Prettier** for code formatting.

## Project Structure

The project follows a standard structure for React with TypeScript applications. Below is a description of the main structure:


```
├── src/              
│   ├── assets        
│   ├── components
│   ├── comtext
│   ├── hooks
│   ├── interface
│   ├── services
│   ├── App.tsx         
│   └── ...            
├── .eslintignore        
├── .eslintrc.json      
├── .gitignore           
├── .prettierrc           
├── package.json     
├── package-lock.json     
├── tsconfig.json        
├── README.md          
```
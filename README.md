# React Application

## Description
This is a React application demonstrating the use of the Context API and Redux with RTK and RTK Query.

The app has two main data routes — Quotes and Products. The `/products` route is the more comprehensive one.

### Application Details 
#### Tech Stack
- React + Vite + Redux Toolkit
- TailwindCSS
- DaisyUI 
- Lucide Icons

#### APIs Used
- [dummyjson.com](https://dummyjson.com/)

#### More Information
The application includes:
- Login
- Register (not functional)
- Quotes
- Products
- Theme Switch
- Error Boundary 

#### Login
The user should login with these credentials: 
- username: **emilys**
- password: **emilyspass**

#### Quotes
This page displays a list of quotes from authors. Quotes can be liked, and liked quotes are saved to Local Storage.

#### Theme Switch
The application supports switching between *light* and *dark* theme. 

#### Error Boundary
There is a specific route designed to throw an error to demonstrate the ErrorBoundary component.
Also, a dedicated **NotFoundPage** component handles unknown routes.

#### Products
This is the most feature-rich endpoint, with functionality including:
- Loading an initial limited number of products, and loading more on scroll (infinite scroll behavior).
- Search, sort, and create product functionality.
- Products can be liked and deleted.
- Clicking on a product card opens a details page with more information and customer reviews.
- Products can be updated via the pencil icon on the top right of the details page.

### Additional Information
- Most pages display **skeleton loaders** with artificial delays to simulate data fetching.
- After CRUD operations, a **toast notification** is shown.
- Most pages are responsive.

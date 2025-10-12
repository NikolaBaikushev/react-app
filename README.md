# React Application

## Description
This is a React application showcasing the usage of Context API and Redux with RTK and RTK Query.

The application has two main data routes - **Quotes** and **Products**. The `/products` route is the more extensive one.



### Application Details 
#### Tech Stack
- React + Vite + Redux + Redux Toolkit
- TailwindCSS
- DaisyUI 
- Lucide Icons

#### APIs Used
- [dummyjson.com](https://dummyjson.com/)

#### More Information
The application consist of the following
- Login
- Register (not functional)
- Quotes
- Products
- Theme Switch
- Error Boundary 

#### Login
The user should login with this credentials: 
- username: **emilys**
- password: **emilyspass**

#### Quotes
This page contains a list of Quotes from authors. A quote can be liked and the liked quotes are saved in Local Storage

#### Theme Switch
The application has implemented theme switch for changing between *light* and *dark* theme. 

#### Error Boundary
The application has specific route for throwing error and showcasing the ErrorBoundary component.
Also there is a dedicated NotFoundPage component when trying to access endpoint which doesn't exist in the routes

#### Products
This is the most extensive endpoint and functionality which has been implemented. 
- It has Products where it loads the initial ammount limit of products and upon scrolling it loads the next batch of products. Thus creating ***infinite scroll*** behaviour. The products page has ***search***, ***sort*** and ***create product*** functionality.
- Product can be ***liked*** and ***deleted***. 
- If clicked on the product card it loads the *details page*. In there is more information for the product as well as reviews left by customers who have tried the product. The product could be updated via the pencil icon on the top right.

### Additional Information
Most of the pages have **Skeleton** type loading and therefore artificial delays on getting the data.
After CRUD operations a **Toast** component is shown.
Most of the pages are responsive.

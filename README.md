# ShopEZ

A modern shopping application with cart, wishlist functionality, and categorical search using mock API data.

## Features

- Browse a catalog of products
- Filter products by categories
- Search for products by name
- Add items to cart and wishlist
- Adjust item quantities in cart
- Mobile-responsive design

## Technologies Used

- React
- Express
- Tailwind CSS
- shadcn/ui components
- Context API for state management
- Wouter for client-side routing

## Deploying to GitHub Pages

This project is configured to be hosted on GitHub Pages. The `docs` directory contains all the necessary files for GitHub Pages deployment.

### Automatic Deployment

1. Fork or clone this repository
2. Push to your `main` branch
3. GitHub Actions will automatically build and deploy the app to the `gh-pages` branch
4. Go to your repository settings > Pages > and set the source to the `gh-pages` branch

### Manual Deployment

If you prefer to deploy manually:

1. Run `npm run build` to create the production build
2. Copy the contents of `dist/public` to your `docs` directory
3. Push to your repository
4. Enable GitHub Pages in your repository settings

### Custom Domain

If you want to use a custom domain:

1. Update the contents of the `docs/CNAME` file with your domain
2. Configure your DNS settings as per GitHub's instructions

## Development

To run this project locally:

```bash
npm install
npm run dev
```

The application will be available at http://localhost:5000
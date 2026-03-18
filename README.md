# Leads WebApp

A clean, responsive landing page with a lead capture form built with Angular and Tailwind CSS. Data is stored in Vercel Postgres via Vercel Serverless Functions.

## Features

- **Responsive Design**: Works on mobile and desktop.
- **Address Autocomplete**: Powered by Google Places API.
- **Vercel Postgres Integration**: Secure lead storage.
- **Clean UI**: Inspired by modern AI landing pages.

## How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd leads-webapp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file with:
   - `POSTGRES_URL`: Your Vercel Postgres connection string.
   - `GOOGLE_MAPS_API_KEY`: Your Google Maps API key.

4. **Start the development server**:
   For the best experience (including the backend api), run:
   ```bash
   vercel dev
   ```
   This will start both the Angular frontend and the Vercel serverless functions on `http://localhost:3000`.

   *Alternatively, if you only want to work on the UI:*
   ```bash
   npm start
   ```
   *Note: Using `npm start` without `vercel dev` will result in `ECONNREFUSED` when submitting the form.*

## Troubleshooting `ECONNREFUSED`

If you see an `ECONNREFUSED` error when submitting the form, it means the Angular dev server cannot find the backend. Ensure you are running `vercel dev` which handles the API routing.

## Design Decisions & Trade-offs

- **Angular & Tailwind**: Used for robust component architecture and rapid UI styling. Tailwind's utility-first approach allowed for high-fidelity replication of the design.
- **Standalone Components**: Utilized Angular's standalone components for a leaner project structure.
- **Address Autocomplete**: Integrated via `@googlemaps/js-api-loader` to ensure efficient loading and better TypeScript support.
- **Vercel Postgres**: Chosen for seamless integration with the deployment platform.

## Future Improvements

- **Input Validation**: Add more robust client-side and server-side validation (e.g., phone number format).
- **Email Notifications**: Implement automated email alerts when a new lead is captured.
- **Analytics**: Integrate tracking for form engagement and abandonment.
- **Unit Testing**: Add comprehensive tests for the form logic and API endpoints.

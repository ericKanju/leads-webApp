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
   Create a `.env` file or set the following in your environment:
   - `POSTGRES_URL`: Connection string for Vercel Postgres.
   - `GOOGLE_MAPS_API_KEY`: Your Google Maps API key (with Places API enabled).

4. **Update Google Maps API Key**:
   Replace `YOUR_GOOGLE_MAPS_API_KEY` in `src/app/components/landing-page/landing-page.component.ts` with your actual key.

5. **Start the development server**:
   ```bash
   npm start
   ```
   Open `http://localhost:4200` in your browser.

6. **Backend Simulation**:
   Vercel functions can be tested locally using the Vercel CLI:
   ```bash
   vercel dev
   ```

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

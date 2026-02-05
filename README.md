# GIF Explorer

A simple and lightweight GIF Explorer web application built using **Next.js**, **React**, and **TypeScript**.  
Users can search for GIFs and view results in a responsive grid, with the ability to view a larger version on click.

---

## Features

- Search GIFs by keyword
- Grid layout
- Click a GIF to view a larger version in a modal
- Loading and empty states
- Clean and reusable component structure
- Infinite scrolling

---

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Giphy API


## API Rate Limitation

This application uses the free tier of the **Giphy API**, which has a request limit.

- The API allows **up to 100 requests per hour**
- Once the limit is exceeded, the API will return a rate limit error
- This can temporarily prevent new search results from loading

For production use, this can be handled by:

- Upgrading the API plan
- Adding caching
- Debouncing search requests
- Implementing better error handling UI

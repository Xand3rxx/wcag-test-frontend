## About this repository

WCAG stands for Web Content Accessibility Guidelines. In simple terms, it's a set of rules that help make websites easier to use for people with disabilities, like those who are blind, deaf, or have difficulty using a mouse. These guidelines ensure that websites are accessible to everyone, no matter their abilities.

This application features the following:

- Allows users to upload HTML files.
- Display accessibility scores, issues, and suggested fixes.
- Include visual highlights for detected issues.

## Environment Setup

1. Run `npm install` to download the application dependencies.
2. Configure the API base URL in `/src/helpers/services/ApiService.js`
3. Run `npm run serve` to compile and hot-reload for development.
4. Run `npm run build` to compile and minifiy for production.
5. Run `npm run lint` for lints and fixes files (optional).

## Hosted Domain

You can access the live frontend of this project at the following URL:

[Frontend URL](https://wcag-test-frontend.vercel.app/)

## Project Screenshots

![Screenshot 1](public/images/wcag-frontend.png)

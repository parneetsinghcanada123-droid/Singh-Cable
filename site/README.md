# Singh Cable Network — Website

Static marketing website for Singh Cable Network (authorised Netplus Broadband partner, Hoshiarpur). Plain HTML, CSS, and JavaScript. No build step.

## Structure

```
.
├── index.html        Home
├── about.html        About Us
├── services.html     Services
├── contact.html      Contact (with working enquiry form)
├── css/
│   └── styles.css    All styles
├── js/
│   └── main.js       Mobile menu + contact form
├── images/
│   └── logo.png      Brand logo
├── assets/
│   └── favicon.svg   Favicon
└── vercel.json       Vercel config (clean URLs)
```

## Run locally

Just open `index.html` in any browser. No server or build needed.

(For the contact form to actually send email, the site should be served over http/https — see below. Opening the file directly still lets you preview everything.)

## Contact form / leads

The form on `contact.html` posts submissions through **FormSubmit** and emails them to:

```
parneet.singh.canada123@gmail.com
```

**One-time activation:** the first time the form is submitted on the live (hosted) site, FormSubmit sends a confirmation email to that address. Click the link in it once, and every future enquiry arrives automatically.

To change the destination address, edit `FORM_ENDPOINT` near the top of `js/main.js`.

## Deploy to Vercel

1. Push this folder to a Git repo (GitHub/GitLab/Bitbucket), or use the Vercel CLI.
2. In Vercel, import the project. No framework, no build command, output directory is the root.
3. Deploy. That's it.

Or with the CLI:

```
npm i -g vercel
vercel
```

Designed by The Brain Burners.

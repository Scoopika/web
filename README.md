# Scoopika

This is a website for Scoopika, an open source system built for developers to help them build AI-powered products that enable users to interact with their data in natural language.

![Scoopika wallpaper](./public/wallpaper.png)

## About the porject

I found that working with LLMs in real-world products sucks, specially when it comes to function-calling, the idea is great but working with it is a nightmare, Scoopika is a set of tools that tries to solve all of these issues (hopefully).

## Website

### Stack

This website is built with Next JS and TailwindCSS, not becuase I love it, just because the NextJS ecosystem gives you a lot of ready UI components and I suck at web design (skill issues).

It also uses contentlayer for docs, auth is still work in progress, waitlist with Supabase, and the UI with Next UI and shadcn of course.

### Run locally

Install all the dependencies (most of them are broken due to contentlayer):

```bash
npm install
```

of course that will take forever (it's JS land), then you can build it:

```base
npm run build
```

and that's it, if you find any bug just leave it, no one would notice anyway.

# Malcolm Russell-Einhorn: Playwright website

A personal website for Malcolm, built from the content in `MATERIAL FOR PERSONAL WEBSITE.docx`.

- **Pages:** Home (with the featured Nov 6 reading), About, Plays, News & Press, Contact
- **Stack:** [Eleventy](https://www.11ty.dev/) static site + [Decap CMS](https://decapcms.org/) editing page at `/admin/` + Netlify Forms, hosted on Netlify's free plan
- **Ongoing cost:** the domain only. Hosting, forms and the editing page are free at this size.

## Run it locally

```bash
npm install
npm start            # site at http://localhost:8080 (rebuilds on save)
```

To try the editing page locally without logging in, run `npm run cms` in a second terminal and open
http://localhost:8080/admin/. Edits made there write straight to the files in `src/`.

`npm run build` writes the finished site to `_site/`.

## Where things live

| What | File(s) | Edited in the CMS under |
|---|---|---|
| News items | `src/news/*.md` | News |
| Plays (Fragments, future plays) | `src/plays/*.md` | Plays |
| Home, About, Plays-page, Press-kit, Contact text and photos | `src/_data/home.json`, `about.json`, `playsPage.json`, `press.json`, `contact.json` | Pages |
| Featured event on Home (Nov 6 reading) | `src/_data/event.json` | Settings → Featured event |
| Name, email, social links, **photo style** | `src/_data/site.json` | Settings → Site settings |
| Photos | `src/assets/uploads/` | Media |
| Templates and design | `src/*.njk`, `src/_includes/`, `src/assets/css/style.css` | (not editable in the CMS) |
| CMS fields | `src/admin/config.yml` | |

Notes:

- **Black & white vs. color:** Settings → Site settings → Photo style switches every photo on the site at once.
- **Photos are resized automatically** at build time (WebP + JPEG at several widths), so Malcolm can upload phone or camera photos without slowing the site down.
- **The featured event relabels itself.** It reads "Upcoming public reading" until the day after the date, then "Recent public reading".
- **The About Me text** is also used as the biography in the press kit, so it only needs editing in one place.

## Going live on Netlify

1. Push this folder to a private GitHub repository, with `main` as the default branch.
2. In Netlify: **Add new site → Import from Git** and pick the repo. The build settings come from `netlify.toml`.
3. **Forms:** Site configuration → Forms → *Enable form detection*, then trigger a redeploy. Two forms will appear: `contact` and `mailing-list`.
   Under Forms → *Form notifications*, add an email notification to russelleinhornml@gmail.com for each form.
4. **Editing page login:** Site configuration → Identity → *Enable Identity*. Set registration to **Invite only**. Under
   Identity → Services, enable **Git Gateway**. Then invite Malcolm's email from the Identity tab. The invite link
   opens the site, which forwards him to `/admin/` to set a password.
5. **Domain:** register it in Malcolm's name (Netlify Domains, Namecheap or Cloudflare, about $10–15/year), add it under
   Domain management, and Netlify sets up HTTPS automatically.
6. Once the domain is final, update the domain in three places: `url` in `src/_data/site.json` (or Settings → Site settings), and `site_url` / `display_url` in
   `src/admin/config.yml`.

**Free-plan budget:** Netlify's free plan gives 300 credits a month. Each published change (every CMS save) costs 15
credits, so about 20 edits a month; bandwidth is 20 credits/GB. That's plenty for this site, but worth mentioning to
Malcolm so he batches edits rather than saving 30 times in one sitting.

**Mailing list:** sign-ups are stored under Forms → `mailing-list` and can be exported as CSV. The contact form also has a
"Add me to the mailing list" box. If Malcolm later wants to send newsletters, import the CSV into Mailchimp or
Buttondown (both free at this size).

## Content notes

### Light edits made to Malcolm's text

- Home: "information about me, **play** orientation as a playwright" → "**my** orientation" (reads as a typo)
- Plays: "The Wavery Gallery" → *The Waverly Gallery* (Kenneth Lonergan's play, staged by 1st Stage in 2024 with Catherine Flye); "Signature Theare" → Signature Theatre
- Play titles set in italics (including ‘Fragments,’ which was in quotes); "--" and spaced en dashes made into em dashes

### Copy and details added during the build (all drawn from his document)

- Home teaser for *Fragments*: the closing sentence of his synopsis. Home quote: a sentence from his About text.
- Two news items (Mar 5 and Nov 6 readings), using the facts from his reading paragraph.
- "Two other plays are still being written or revised." (from his About text)
- The Writer's Center address, 4508 Walsh Street, Bethesda, MD 20815 (verified on writer.org)
- Form and press-kit labels ("Stay in touch", "Press kit", etc.), page meta descriptions, and photo alt text

### Open questions for Malcolm

1. **Domain.** In email he suggested *malcolmrusselleinhorndrama.com*; the document says "something along the lines of
   *theater@malcolmrussell-einhorn.com*", which is written like an email address. The site currently uses
   `malcolmrussell-einhorn.com` as a placeholder.
2. **Nov 6 reading details:** start time, whether it's free and open to the public, and any RSVP/ticket link.
   (Settings → Featured event has fields for all three.)
3. **Plays text tense.** His paragraph says the play "has had two public readings … the second … on November 6, 2026",
   but the site goes live before that date. It's kept as written; he may want "will have its second reading" until Nov 6.
4. **Press kit.** The Press section of the document described what a press kit contains rather than giving the content. Built
   as a press kit with what we have; still needed: a high-resolution headshot (the current one is 600×649), a short
   one-paragraph bio, and any press coverage.
5. **Facebook and Instagram links.** The fields are ready in Settings; the links appear in the footer and Contact page once filled in.
6. **About photo.** The Africa-map photo is only 225×225, so it's shown small. A larger copy would help.
7. **Photo details.** Please confirm that the actors in the reading photos are Brett Earnest and Catherine Flye (the alt text says so),
   and whether he'd like captions, e.g. which reading they're from.

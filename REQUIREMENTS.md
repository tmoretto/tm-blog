**Personal Tech Blog**

Software Requirements Specification

  ------------------- ---------------------------------------------------
  **Version**         1.0

  **Date**            March 30, 2026

  **Status**          Draft

  **Author**          --- (to be filled)

  **Reviewed by**     ---
  ------------------- ---------------------------------------------------

**1. Introduction**

**1.1 Purpose**

This document defines the functional and non-functional requirements for
a personal tech blog. It provides a shared reference for development
decisions and serves as a baseline for acceptance testing. The primary
audience is the developer building and maintaining the blog.

**1.2 Project scope**

The blog is a statically generated website where the owner publishes
technical articles. Visitors can read posts, filter by tag, and
(optionally) leave comments via GitHub Discussions. There is no user
authentication, no database, and no server-side runtime beyond Next.js
build-time data fetching.

**1.3 Definitions**

-   MDX --- Markdown with embedded JSX components.

-   SSG --- Static Site Generation: HTML produced at build time.

-   Contentlayer --- Build-time content SDK that converts MDX files into
    typed TypeScript objects.

-   Shiki --- A syntax highlighter that uses VS Code TextMate grammars.

-   Giscus --- A comment widget backed by GitHub Discussions.

**2. Stakeholders**

The following parties have an interest in the project:

  -----------------------------------------------------------------------
  **Role**                **Who**                 **Interest**
  ----------------------- ----------------------- -----------------------
  Blog owner / author     Project owner           Write and publish posts
                                                  with minimal friction

  Readers                 General public /        Discover and read
                          developers              high-quality technical
                                                  content

  Developer               Project owner (same     Build, maintain, and
                          person)                 extend the codebase
  -----------------------------------------------------------------------

**3. Technology stack**

  --------------------------------------------------------------------------------
  **Layer**          **Technology**             **Rationale**
  ------------------ -------------------------- ----------------------------------
  Framework          Next.js 14+ (App Router)   SSG, ISR, image optimisation,
                                                file-based routing

  Content            MDX + Contentlayer         Author posts in Markdown with
                                                embedded React components

  Syntax             Shiki                      VS Code-quality highlighting; no
  highlighting                                  client-side JS

  Styling            Tailwind CSS               Utility-first; purged at build
                                                time

  Typography         \@tailwindcss/typography   prose class for readable article
                                                body

  Deployment         Vercel                     Automatic deploys on push; global
                                                CDN; free tier

  Comments           Giscus                     GitHub Discussions integration;
  (optional)                                    zero backend
  --------------------------------------------------------------------------------

**4. Functional requirements**

Priority levels: Must have (core launch), Should have (soon after
launch), Nice to have (backlog).

  --------------------------------------------------------------------------------
  **ID**   **Name**            **Description**                      **Priority**
  -------- ------------------- ------------------------------------ --------------
  FR-01    Post listing        Display a paginated list of          Must have
                               published blog posts sorted by date  
                               descending.                          

  FR-02    Post detail page    Render a single MDX post with title, Must have
                               date, reading time, tags, and body   
                               content.                             

  FR-03    Syntax highlighting Highlight code blocks using Shiki    Must have
                               with github-light (light) and        
                               github-dark (dark) themes.           

  FR-04    Dark mode           Toggle between light and dark        Must have
                               themes. Preference persisted in      
                               localStorage.                        

  FR-05    Tag filtering       Filter posts by one or more tags on  Should have
                               the blog index page.                 

  FR-06    RSS / Atom feed     Generate a valid RSS feed at         Should have
                               /feed.xml for all published posts.   

  FR-07    Open Graph metadata Each page includes OG title,         Should have
                               description, and image meta tags.    

  FR-08    Reading time        Display estimated reading time on    Should have
           estimate            post cards and post detail pages.    

  FR-09    Copy-to-clipboard   Code blocks include a one-click copy Should have
           button              button.                              

  FR-10    Comments (Giscus)   GitHub Discussions-powered comment   Nice to have
                               section on each post page.           

  FR-11    Search              Client-side full-text search across  Nice to have
                               post titles and descriptions.        

  FR-12    Related posts       Display up to 3 related posts at the Nice to have
                               end of each post, matched by shared  
                               tags.                                
  --------------------------------------------------------------------------------

**5. Non-functional requirements**

  -------------------------------------------------------------------------------
  **ID**   **Category**      **Requirement**                       **Priority**
  -------- ----------------- ------------------------------------- --------------
  NFR-01   Performance       Core Web Vitals: LCP \< 2.5s, CLS \<  Must have
                             0.1, INP \< 200ms on mobile           
                             (Lighthouse ≥ 90).                    

  NFR-02   Accessibility     WCAG 2.1 AA. Semantic HTML, skip-nav  Must have
                             link, keyboard-navigable, sufficient  
                             colour contrast.                      

  NFR-03   SEO               SSG-rendered pages, descriptive meta  Must have
                             tags, sitemap.xml, canonical URLs,    
                             structured data (Article schema).     

  NFR-04   Security          No secrets in client bundle. Content  Must have
                             Security Policy headers set via       
                             next.config.mjs.                      

  NFR-05   Maintainability   TypeScript strict mode; ESLint +      Must have
                             Prettier enforced in CI; no           
                             unresolved lint errors on main.       

  NFR-06   Build time        Cold production build completes in    Should have
                             under 3 minutes on Vercel\'s standard 
                             runner.                               

  NFR-07   Bundle size       First-load JS ≤ 100 kB gzipped per    Should have
                             route.                                
  -------------------------------------------------------------------------------

**6. Constraints & assumptions**

**6.1 Constraints**

-   Hosting is limited to Vercel\'s free tier (Hobby plan). No
    persistent compute.

-   No external database. All content is file-based (MDX in the
    repository).

-   No user authentication system --- the blog is read-only for
    visitors.

-   The blog owner authors posts directly in the repository using a text
    editor or IDE.

**6.2 Assumptions**

-   The developer has Node.js 18+ and npm installed locally.

-   Posts are stored as MDX files in the content/posts/ directory.

-   Claude Code is the primary AI coding assistant; CLAUDE.md is kept up
    to date.

-   Vercel auto-detects Next.js and requires no custom build
    configuration.

**7. Acceptance criteria**

A release is considered ready for production when all of the following
are true:

-   All Must have functional requirements (FR-01 through FR-04) are
    implemented and manually verified.

-   Lighthouse CI score ≥ 90 on Performance, Accessibility, Best
    Practices, and SEO for the post detail page on mobile.

-   No TypeScript errors (tsc \--noEmit exits 0).

-   No ESLint errors on the main branch.

-   The production build (npm run build) completes without errors.

-   At least one real post is published and renders correctly on a
    mobile viewport (375px wide).

-   Custom domain is connected and HTTPS is active.

**8. Milestones**

Indicative schedule --- adjust to your availability.

  ------------------------------------------------------------------------
  **Milestone**    **Target**   **Deliverables**
  ---------------- ------------ ------------------------------------------
  M1 ---           Week 1--2    Scaffold Next.js project, configure
  Foundation                    Tailwind + Contentlayer, write first MDX
                                post

  M2 --- Core      Week 3--4    Post list, post detail, Shiki
  features                      highlighting, dark mode, copy button

  M3 --- SEO &     Week 5       OG tags, sitemap, RSS feed, structured
  feeds                         data

  M4 --- Polish    Week 6       Tag filtering, reading time, performance
                                audit, accessibility review

  M5 --- Launch    Week 7       Deploy to Vercel, connect custom domain,
                                smoke test on mobile
  ------------------------------------------------------------------------

**9. Out of scope**

-   Multi-author support or editorial workflows.

-   A CMS or admin UI --- posts are authored in code.

-   Email newsletter or subscription management.

-   Paid content or paywalls.

-   Native mobile applications.

-   Analytics beyond Vercel\'s built-in visitor overview (unless added
    later as a nice-to-have).

**10. Revision history**

  ---------------------------------------------------------------------------
  **Version**   **Date**      **Author**          **Summary**
  ------------- ------------- ------------------- ---------------------------
  1.0           2026-03-30    ---                 Initial draft

  ---------------------------------------------------------------------------
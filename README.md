# Personal Programming Study Notes

SSG Markdown Documents Site Based on Vitepress.

## Tech Stacks

- [Vitepress]()
- [TypeScript]()
- [CSS]()
- [Markdown]()

## Project Structure

```
├─ .vitepress
│    ├─ dist
│    ├─ theme               # vitepress's style
│    ├─ config              # vitepress's config
│    │    ├─ siteHead       # site HTML's head
│    │    └─ themeConfigs   # vitepress's default theme's configs
│    │        ├─ nav        # default theme's top nav
│    │        └─ sidebars   # default theme's sidebars
│    └─ ...
├─ contents                 # pages ( markdown documents )
│    ├─ [leaf]
│    │    ├─ [leaf]
│    │    │    └─ [leaf].md
│    │    └─ index.md
│    ├─ ...
│    └─ index.md
├─ public
│    ├─ statics
│    ├─ favicon.ico
│    └─ ...
└─ ...
```

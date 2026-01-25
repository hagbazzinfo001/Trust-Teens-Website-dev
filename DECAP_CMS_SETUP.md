# Decap CMS Setup Guide

Decap CMS has been successfully added to your project!

## Accessing the Admin Panel

### Option 1: Component-based (Recommended for Next.js)
Visit: `http://localhost:3001/admin`

This uses the React component approach with `decap-cms-app` package.

### Option 2: Static HTML
Visit: `http://localhost:3001/admin/index.html`

This uses the static HTML file approach with the CDN script.

## Authentication

Decap CMS is configured to use GitHub as the backend. To authenticate:

1. **For Development (Local Testing)**:
   - You can enable local backend by uncommenting `local_backend: true` in `config.yml`
   - Run: `npx decap-server` in a separate terminal
   - This allows you to test without GitHub authentication

2. **For Production**:
   - You'll need to set up OAuth with GitHub
   - Options:
     - Use Netlify (automatic OAuth setup)
     - Use a third-party OAuth provider like:
       - [Decap CMS OAuth Provider](https://github.com/vencax/netlify-cms-github-oauth-provider)
       - [Netlify CMS External OAuth Client](https://github.com/marksteele/netlify-cms-oauth-provider-go)
     - Self-host an OAuth server

## Content Management

The CMS is configured to manage:

1. **Blog Posts** (`content/blog/`)
   - Create, edit, and delete blog posts
   - Add featured images, tags, and author information

2. **Pages** (`content/pages/`)
   - About Page
   - Home Page

3. **Settings** (`content/settings/`)
   - Site-wide settings like title, description, and logo

## File Structure

```
content/
├── blog/              # Blog posts
├── pages/             # Static pages
│   ├── about.md
│   └── home.md
└── settings/          # Site settings
    └── site.json

public/
├── admin/
│   ├── config.yml     # Decap CMS configuration
│   └── index.html     # Admin interface
└── uploads/           # Media uploads
```

## Configuration

Edit `public/admin/config.yml` to:
- Add more collections
- Customize fields
- Change backend settings
- Add custom widgets

## Tips

1. **Media Files**: Uploaded images are stored in `public/uploads/`
2. **Local Development**: Use `npx decap-server` for local testing without GitHub
3. **Git Workflow**: Decap CMS commits directly to your repository
4. **Content Format**: Blog posts use markdown with frontmatter

## Next Steps

1. Set up GitHub OAuth for authentication
2. Customize the CMS configuration to match your content needs
3. Create custom previews for your content
4. Add editorial workflow (draft, review, ready)

## Resources

- [Decap CMS Documentation](https://decapcms.org/docs/)
- [Configuration Options](https://decapcms.org/docs/configuration-options/)
- [Widgets Reference](https://decapcms.org/docs/widgets/)

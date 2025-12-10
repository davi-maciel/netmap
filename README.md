# NetMap - Social Network Mapping Application

## Contributors

davi-maciel

## Description

NetMap is a web application that visualizes your global social network on an interactive map. Users can add people to their network, associate multiple locations with each person (hometown, college, work, etc.), and view them plotted on a world map with intelligent clustering.

## Dependencies

**Language & Framework:**
- Node.js 18+
- Next.js 15.5.4
- React 19.1.0

**Core Libraries:**
- MapLibre GL 5.8.0 - Interactive map rendering
- Supercluster 8.0.1 - Map marker clustering
- D3-Force 3.0.0 - Circular packing for overlapping markers
- Tailwind CSS 4 - Styling

**Backend & Services:**
- Supabase (PostgreSQL + Auth + Storage)
- @supabase/supabase-js 2.86.2
- Nominatim API (OpenStreetMap) - Geocoding

**Additional:**
- react-markdown 10.1.0 - Markdown rendering for bios
- remark-gfm 4.0.1 - GitHub Flavored Markdown support

## Build Instructions

### Prerequisites

1. **Node.js 18+** installed
2. **Supabase project** created with:
   - Database tables (run `docs/sb_setup.sql`)
   - Storage bucket named `profile-pictures`
   - Environment variables in `.env.local`:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

### Installation & Setup

```bash
# Install dependencies
npm install

# Run database setup

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
/src
├── /app              # Next.js pages and React components
│   ├── page.js       # Main map page
│   ├── login/        # Authentication pages
│   └── signup/
├── /lib              # Backend integration
│   ├── api.js        # Supabase CRUD operations
│   ├── supabase.js   # Supabase client
│   └── storage.js    # File upload
/docs                 # Documentation
└── /database         # SQL migrations
```

## Features

- User authentication with email/password
- Add/edit/delete people in your network
- Associate multiple locations per person with custom connection types
- Interactive world map with marker clustering
- Location search with autocomplete
- Profile picture uploads
- Markdown support for bios
- Real-time data synchronization

## Documentation

See `/docs` folder for:
- Class diagram (`docs/design/design.puml`)
- Database schema (`docs/db_setup.sql`)

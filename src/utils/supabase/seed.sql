-- GitHub, Twitter, etc.
insert into site_meta (key, type, value) values
  ('github_url', 'link', '"https://github.com/yourusername"'),
  ('instagram_url', 'link', '"https://instagram.com/yourusername"'),
  ('youtube_url', 'link', '"https://youtube.com/@yourusername"'),
  ('linkedin_url', 'link', '"https://linkedin.com/in/yourusername"'),
  ('twitter_url', 'link', '"https://twitter.com/yourusername"');

-- Visuals
insert into site_meta (key, type, value) values
  ('logo_url', 'image', '"https://yoursite.com/logo.svg"'),
  ('background_url', 'image', '"https://yoursite.com/background.jpg"');

-- SEO Meta
insert into site_meta (key, type, value) values
  ('seo_meta', 'meta', '{
    "title": "Freeman — Builder of Clean Products",
    "description": "Crafting thoughtful digital experiences",
    "keywords": ["developer", "freeman", "portfolio", "clean apps", "indie maker"]
  }');

-- Quote
insert into site_meta (key, type, value) values
  ('quote', 'text', '"Code is poetry."');

-- Contact
insert into site_meta (key, type, value) values
  ('contact', 'contact', '{
    "email": "me@freeman.dev",
    "location": "London, UK",
    "blog": "https://blog.freeman.dev"
  }');

-- Headline Section (rotating words in hero)
insert into site_meta (key, type, value) values
  ('headline', 'headline', '{
    "prefix": "Building Clean",
    "rotating_words": ["Mobile", "Desktop", "Cloud", "Web", "AI"],
    "suffix": "Apps Since 2023"
  }');

-- About / Ethos blocks (3 sections)
insert into site_meta (key, type, value) values
  ('ethos', 'section_blocks', '[
    {
      "image": "https://site.com/img1.jpg",
      "title": "Craft",
      "text": "I focus on quality, not noise."
    },
    {
      "image": "https://site.com/img2.jpg",
      "title": "Care",
      "text": "Every project is personal."
    },
    {
      "image": "https://site.com/img3.jpg",
      "title": "Clarity",
      "text": "Simple always wins."
    }
  ]');

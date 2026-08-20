#!/usr/bin/env python3
"""
ORN blog build tool — regenerates blog/rss.xml (+ per-tag feeds) and the
blog <url> block of sitemap.xml from blog/posts.json (single source of
truth for published posts).

DOES NOT touch drafts. Only posts listed in posts.json are considered
"published" and will appear in RSS/sitemap. Draft posts live under
blog/_drafts/<slug>/ and must never be added to posts.json until Mike
has approved them for publish (see blog/PUBLISHING.md).

Usage:
  python3 blog_build.py --posts posts.json --sitemap sitemap.xml \
      --out-dir /tmp/orn-blog-build/out
Writes: rss.xml, rss-market-watch.xml, rss-industry-news.xml, sitemap.xml
(sitemap.xml is the FULL file — existing non-blog <url> entries are
preserved, blog-related entries are replaced/regenerated.)
"""
import argparse, json, re, sys
from datetime import datetime, timezone
from xml.sax.saxutils import escape

SITE = "https://oilrigsnow.com"
FEED_TITLE = "Oil Rigs Now Blog"
FEED_DESC = "Drilling rig and oilfield equipment market insights from Oil Rigs Now."

def rfc822(date_str):
    dt = datetime.strptime(date_str, "%Y-%m-%d").replace(tzinfo=timezone.utc)
    return dt.strftime("%a, %d %b %Y %H:%M:%S %z")

def build_rss(posts, tag=None):
    if tag:
        posts = [p for p in posts if tag in p.get("tags", [])]
        title = f"{FEED_TITLE} — {tag.replace('-', ' ').title()}"
        self_url = f"{SITE}/blog/rss-{tag}.xml"
    else:
        title = FEED_TITLE
        self_url = f"{SITE}/blog/rss.xml"

    posts_sorted = sorted(posts, key=lambda p: p["published"], reverse=True)
    build_date = rfc822(posts_sorted[0]["published"]) if posts_sorted else rfc822(datetime.now(timezone.utc).strftime("%Y-%m-%d"))

    items = []
    for p in posts_sorted:
        url = f"{SITE}/blog/{p['slug']}/"
        cats = "\n      ".join(f"<category>{escape(t)}</category>" for t in p.get("tags", []))
        items.append(f"""    <item>
      <title>{escape(p['title'])}</title>
      <link>{url}</link>
      <guid isPermaLink="true">{url}</guid>
      <description>{escape(p['description'])}</description>
      {cats}
      <pubDate>{rfc822(p['published'])}</pubDate>
    </item>""")

    return f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>{escape(title)}</title>
    <link>{SITE}/blog/</link>
    <description>{escape(FEED_DESC)}</description>
    <language>en-us</language>
    <atom:link href="{self_url}" rel="self" type="application/rss+xml"/>
    <lastBuildDate>{build_date}</lastBuildDate>
{chr(10).join(items)}
  </channel>
</rss>
"""

BLOG_URL_RE = re.compile(r"[ \t]*<url>\s*<loc>https://oilrigsnow\.com/blog/[^<]*</loc>.*?</url>\s*\n", re.DOTALL)

def build_sitemap(existing_sitemap, posts):
    # Strip ALL existing /blog/ <url> blocks (hub + posts), then reinsert
    # freshly generated ones (hub first, then posts newest-first) right
    # before </urlset>.
    stripped = BLOG_URL_RE.sub("", existing_sitemap)

    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    blocks = [f"""  <url>
    <loc>{SITE}/blog/</loc>
    <lastmod>{today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
"""]
    for p in sorted(posts, key=lambda p: p["published"], reverse=True):
        blocks.append(f"""  <url>
    <loc>{SITE}/blog/{p['slug']}/</loc>
    <lastmod>{p.get('modified', p['published'])}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
""")
    insertion = "".join(blocks)
    out = stripped.replace("</urlset>", insertion + "</urlset>")
    if out.count("</urlset>") != 1:
        raise SystemExit("sitemap insertion sanity check failed")
    return out

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--posts", required=True)
    ap.add_argument("--sitemap", required=True)
    ap.add_argument("--out-dir", required=True)
    a = ap.parse_args()

    posts = json.load(open(a.posts))["posts"]
    existing_sitemap = open(a.sitemap).read()

    import os
    os.makedirs(a.out_dir, exist_ok=True)

    with open(f"{a.out_dir}/rss.xml", "w") as f:
        f.write(build_rss(posts))

    all_tags = sorted({t for p in posts for t in p.get("tags", [])})
    for tag in all_tags:
        with open(f"{a.out_dir}/rss-{tag}.xml", "w") as f:
            f.write(build_rss(posts, tag=tag))

    with open(f"{a.out_dir}/sitemap.xml", "w") as f:
        f.write(build_sitemap(existing_sitemap, posts))

    print(json.dumps({"ok": True, "tags": all_tags, "posts": len(posts), "out_dir": a.out_dir}))

if __name__ == "__main__":
    main()

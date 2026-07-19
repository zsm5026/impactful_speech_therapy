---
title: Blog
layout: layout.html
permalink: /blog/
---

<div class="page">
    <div class="page-hero">
        <h1>Blog &amp; Resources</h1>
        <p>Practical tips, research insights, and stories from the world of speech therapy and professional communication.</p>
    </div>
    <div class="blog-grid">
        {%- for post in collections.post reversed %}
        <a class="blog-card" href="{{ post.url }}">
            <div class="blog-thumb">📝</div>
            <div class="blog-body">
                <div class="blog-meta">{{ post.date | readableDate }}</div>
                <h3>{{ post.data.title }}</h3>
                <span class="blog-read">Read more →</span>
            </div>
        </a>
        {%- endfor %}
    </div>
</div>
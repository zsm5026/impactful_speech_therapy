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
    <div class="blog-filters">
        <div class="filter-group">
            <span class="filter-label" id="categoryLabel">Category:</span>
            <div class="pill-row" id="categoryPills" role="group" aria-labelledby="categoryLabel">
                <button type="button" class="filter-pill active" aria-pressed="true" data-category="all">All</button>
                {%- for cat in collections.allCategories %}
                <button type="button" class="filter-pill" aria-pressed="false" data-category="{{ cat }}">{{ cat }}</button>
                {%- endfor %}
            </div>
        </div>
        <div class="filter-group">
            <label class="filter-label" for="tagSelect">Topic:</label>
            <select id="tagSelect" class="tag-select">
                <option value="all">All topics</option>
                {%- for tag in collections.allTags %}
                <option value="{{ tag }}">{{ tag }}</option>
                {%- endfor %}
            </select>
        </div>
        <button type="button" id="clearFilters" class="clear-filters" hidden>Clear filters ✕</button>
    </div>
    <p class="filter-count" id="filterCount" role="status" aria-live="polite"></p>
    <div class="blog-grid" id="blogGrid">
        {%- for post in collections.post reversed %}
        {%- assign postCategories = post.data.categories | join: ',' %}
        {%- assign postTags = post.data.post_tags | join: ',' %}
        <div class="blog-card"
             data-categories="{{ postCategories }}"
             data-tags="{{ postTags }}">
            <div class="blog-thumb" aria-hidden="true">{{ post.data.categories[0] | categoryEmoji }}</div>
            <div class="blog-body">
                <div class="blog-meta">{{ post.date | readableDate }}</div>
                {%- if post.data.categories.size > 0 %}
                <span class="blog-category">{{ post.data.categories[0] }}</span>
                {%- endif %}
                <h3><a class="blog-title-link" href="{{ post.url }}">{{ post.data.title }}</a></h3>
                {%- if post.data.post_tags.size > 0 %}
                <div class="blog-tags">
                    {%- for tag in post.data.post_tags %}
                    <button type="button" class="tag-pill" data-tag="{{ tag }}">
                        {{ tag }}<span class="visually-hidden"> — filter by this topic</span>
                    </button>
                    {%- endfor %}
                </div>
                {%- endif %}
                <a class="blog-read" href="{{ post.url }}">Read more<span class="visually-hidden"> about {{ post.data.title }}</span> →</a>
            </div>
            <a class="blog-card-cover-link" href="{{ post.url }}" tabindex="-1" aria-hidden="true"></a>
        </div>
        {%- endfor %}
    </div>
    <p class="empty-state" id="emptyState" hidden>No posts match that filter yet. Try a different category or topic.</p>
</div>

<script>
(function () {
    const grid = document.getElementById('blogGrid');
    const cards = Array.from(grid.querySelectorAll('.blog-card'));
    const categoryPillsWrap = document.getElementById('categoryPills');
    const tagSelect = document.getElementById('tagSelect');
    const clearBtn = document.getElementById('clearFilters');
    const emptyState = document.getElementById('emptyState');
    const filterCount = document.getElementById('filterCount');

    let activeCategory = 'all';
    let activeTag = 'all';

    function applyFilters() {
        let visibleCount = 0;
        cards.forEach(card => {
            const cardCategories = (card.dataset.categories || '').split(',').filter(Boolean);
            const cardTags = (card.dataset.tags || '').split(',').filter(Boolean);
            const categoryMatch = activeCategory === 'all' || cardCategories.includes(activeCategory);
            const tagMatch = activeTag === 'all' || cardTags.includes(activeTag);
            const show = categoryMatch && tagMatch;
            card.style.display = show ? '' : 'none';
            if (show) visibleCount++;
        });

        emptyState.hidden = visibleCount !== 0;
        clearBtn.hidden = activeCategory === 'all' && activeTag === 'all';

        if (activeCategory === 'all' && activeTag === 'all') {
            filterCount.textContent = '';
        } else {
            filterCount.textContent = visibleCount + (visibleCount === 1 ? ' post found' : ' posts found');
        }
    }

    categoryPillsWrap.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-pill');
        if (!btn) return;
        activeCategory = btn.dataset.category;
        categoryPillsWrap.querySelectorAll('.filter-pill').forEach(p => {
            const isActive = p === btn;
            p.classList.toggle('active', isActive);
            p.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
        applyFilters();
    });

    tagSelect.addEventListener('change', () => {
        activeTag = tagSelect.value;
        applyFilters();
    });

    // Clicking a tag pill on a card filters to that tag instead of opening the post.
    grid.addEventListener('click', (e) => {
        const pill = e.target.closest('.tag-pill');
        if (!pill) return;
        activeTag = pill.dataset.tag;
        tagSelect.value = activeTag;
        applyFilters();
        const filtersEl = document.querySelector('.blog-filters');
        if (filtersEl && filtersEl.scrollIntoView) {
            filtersEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    clearBtn.addEventListener('click', () => {
        activeCategory = 'all';
        activeTag = 'all';
        tagSelect.value = 'all';
        categoryPillsWrap.querySelectorAll('.filter-pill').forEach(p => {
            const isActive = p.dataset.category === 'all';
            p.classList.toggle('active', isActive);
            p.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
        applyFilters();
    });

    applyFilters();
})();
</script>

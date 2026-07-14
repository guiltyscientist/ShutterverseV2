<script lang="ts">
  import { onMount } from 'svelte'
  import { swrGet } from '$lib/utils/swr'
  import { useLocale } from '$lib/i18n/index.svelte'
  import { reveal } from '$lib/actions/reveal'

  const loc = useLocale()
  const { t, lt } = loc

  interface NewsItem {
    id: string; created: string; title: any; description: any
    tag?: string; titleImg?: { url: string | null }
  }

  const DESKTOP_PAGE_SIZE = 3
  const MOBILE_PAGE_SIZE = 3

  let newsData = $state<NewsItem[]>([])
  let expandedId = $state<string | null>(null)
  let page = $state(0)
  let pageSize = $state(DESKTOP_PAGE_SIZE)

  const pageCount = $derived(Math.ceil(newsData.length / pageSize))
  const visibleNews = $derived(newsData.slice(page * pageSize, (page + 1) * pageSize))

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString(loc.locale === 'de' ? 'de-DE' : 'en-US', {
      day: 'numeric', month: 'long', year: 'numeric'
    })
  }

  function toggle(id: string) {
    expandedId = expandedId === id ? null : id
  }

  function goToPage(p: number) {
    page = Math.max(0, Math.min(p, pageCount - 1))
    expandedId = null

    // Mobil ist die Sektion höher als der Viewport und der Pager sitzt unten:
    // Nach dem Blättern stünde man weiterhin unten, während die neuen Karten
    // oben beginnen. Deshalb zurück an den Anfang der Sektion springen.
    if (!window.matchMedia('(max-width: 1080px)').matches) return
    const el = document.getElementById('news')
    if (!el) return
    const nav = document.querySelector('.sv-nav') as HTMLElement | null
    const top = el.getBoundingClientRect().top + window.scrollY - (nav?.offsetHeight ?? 0)
    window.scrollTo({ top, behavior: 'smooth' })
  }

  onMount(() => {
    const mq = window.matchMedia('(max-width: 1080px)')
    const applyPageSize = () => {
      pageSize = mq.matches ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE
      page = Math.min(page, Math.max(0, Math.ceil(newsData.length / pageSize) - 1))
    }
    applyPageSize()
    mq.addEventListener('change', applyPageSize)

    swrGet<NewsItem[]>('/api/news', (data) => {
      // Newest first — older entries land on the following carousel pages
      newsData = Array.isArray(data)
        ? [...data].sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
        : []
    })

    return () => mq.removeEventListener('change', applyPageSize)
  })
</script>

<section class="sv-news vh" id="news">
  <div class="vh-inner">
    <div class="section-head" use:reveal>
      <div>
        <div class="eyebrow">{t.newsDesign.eyebrow}</div>
        <h2>{t.newsDesign.h}</h2>
      </div>
      <div class="s-meta">{t.newsDesign.meta}</div>
    </div>

    {#if newsData.length > 0}
      <div class="news-row" class:has-expanded={expandedId !== null}>
        {#each visibleNews as item (item.id)}
          {@const tag = item.tag && item.tag !== 'news' ? item.tag : ''}
          <article class="news-card" class:expanded={expandedId === item.id}>
            {#if item.titleImg?.url}
              <div class="news-media" style="background-image: url('{item.titleImg.url}')"></div>
            {/if}
            <button class="news-toggle" onclick={() => toggle(item.id)} aria-expanded={expandedId === item.id}>
              <span class="news-tag {tag}">{tag || 'News'}</span>
              <span class="news-date">{formatDate(item.created)}</span>
              <h3>{lt(item.title)}</h3>
              <span class="news-preview">{lt(item.description)}</span>
              <span class="news-plus" aria-hidden="true"></span>
            </button>
            <div class="news-body">
              <p>{lt(item.description)}</p>
            </div>
          </article>
        {/each}
        <!-- Unsichtbare Platzhalter: halten die Kartenbreite konstant, auch wenn
             weniger als eine volle Seite da ist (sonst zöge sich eine einzelne
             News über die ganze Reihe). Mobil ausgeblendet. -->
        {#each Array(Math.max(0, pageSize - visibleNews.length)) as _}
          <div class="news-filler" aria-hidden="true"></div>
        {/each}
      </div>

      {#if pageCount > 1}
        <div class="news-pager">
          <button class="news-pager-arrow" onclick={() => goToPage(page - 1)} disabled={page === 0} aria-label="Neuere News">
            <span class="pager-arrow left" aria-hidden="true"></span>
          </button>
          <div class="news-pager-dots">
            {#each Array(pageCount) as _, p}
              <button
                class="news-pager-dot"
                class:active={p === page}
                onclick={() => goToPage(p)}
                aria-label={`Seite ${p + 1}`}
              ></button>
            {/each}
          </div>
          <span class="news-pager-count">{String(page + 1).padStart(2, '0')} / {String(pageCount).padStart(2, '0')}</span>
          <button class="news-pager-arrow" onclick={() => goToPage(page + 1)} disabled={page === pageCount - 1} aria-label="Ältere News">
            <span class="pager-arrow right" aria-hidden="true"></span>
          </button>
        </div>
      {/if}
    {:else}
      <div class="news-empty" use:reveal>
        <p class="news-empty-title">{t.news.empty}</p>
        <p class="news-empty-desc">{t.news.emptyDesc}</p>
      </div>
    {/if}
  </div>
</section>

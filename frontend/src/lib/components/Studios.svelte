<script lang="ts">
  import { onMount } from 'svelte'
  import { swrGet } from '$lib/utils/swr'
  import { useLocale } from '$lib/i18n/index.svelte'
  import { reveal } from '$lib/actions/reveal'
  import { nearViewport } from '$lib/actions/nearViewport'
  import { swipe } from '$lib/actions/swipe'
  import { cldUrl, CLD } from '$lib/utils/cloudinary'

  const { t, lt } = useLocale()

  interface Studio {
    id: string; title: any; description: any; equipment: any
    titleImg?: { url: string }; images?: { url: string }[]
    inspiredBy?: string[]; bookingUrl?: string | null; showNewBadge?: boolean
  }

  let studios = $state<Studio[]>([])
  let activeImg = $state<Record<string, string>>({})
  // Bilder laden erst, wenn die jeweilige Sektion in Viewport-Nähe kommt
  let shown = $state<Record<string, boolean>>({})

  const THEMES = ['theme-cyberpunk', 'theme-japanese', 'theme-hospital'] as const

  const ANNOTATIONS = [
    { tl: 'ISO 800 · 24mm · f/1.8', br: '1/60s · WB 3200K' },
    { tl: 'ISO 200 · 50mm · f/2.0', br: '1/125s · WB 5600K' },
    { tl: 'ISO 1600 · 35mm · f/1.4', br: '1/40s · WB 4200K' },
  ]

  function theme(i: number) { return THEMES[i % THEMES.length] }
  function annot(i: number) { return ANNOTATIONS[i % ANNOTATIONS.length] }
  function padNum(n: number) { return n < 10 ? `0${n}` : `${n}` }

  function getImg(studio: Studio): string | null {
    return studio.titleImg?.url ?? studio.images?.[0]?.url ?? null
  }

  function galleryOf(studio: Studio): string[] {
    const urls = [studio.titleImg?.url, ...(studio.images ?? []).map(img => img.url)]
    return [...new Set(urls.filter((u): u is string => Boolean(u)))]
  }

  const prefetched = new Set<string>()

  function preload(url: string): Promise<void> {
    return new Promise((resolve) => {
      if (prefetched.has(url)) return resolve()
      prefetched.add(url)
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = () => resolve()
      img.src = url
    })
  }

  // Sobald eine Detail-Sektion sichtbar wird, die ganze Galerie im Hintergrund
  // vorladen — sequenziell, damit das sichtbare Hauptbild zuerst ankommt
  async function prefetchGallery(studio: Studio) {
    for (const url of galleryOf(studio)) {
      const full = cldUrl(url, CLD.main)
      if (full) await preload(full)
    }
  }

  function prefetchMain(url: string) {
    const full = cldUrl(url, CLD.main)
    if (full) preload(full)
  }

  function showImage(studioId: string, url: string) {
    activeImg[studioId] = url
    prefetchMain(url)
  }

  function getEquipmentItems(studio: Studio): string[] {
    const eq = lt(studio.equipment)
    if (!eq) return []
    return eq.split(',').map(s => s.trim()).filter(Boolean).slice(0, 4)
  }

  onMount(() => {
    swrGet<Studio[]>('/api/studios', (data) => {
      studios = Array.isArray(data) ? data : []
    })
  })
</script>

<!-- Sets Overview -->
{#if studios.length > 0}
<section class="sv-sets vh" id="sets">
  <div class="vh-inner">
    <div class="section-head" use:reveal>
      <div>
        <div class="eyebrow">{t.setsDesign.eyebrow}</div>
        <h2>{t.setsDesign.h}</h2>
      </div>
      <div class="s-meta">{studios.length} {t.setsDesign.meta}</div>
    </div>

    <div class="sets-grid">
      {#each studios as studio, i}
        {@const img = shown[`card-${studio.id}`] ? cldUrl(getImg(studio), CLD.card) : null}
        <article class="set-card {theme(i)}" use:reveal use:nearViewport={() => { shown[`card-${studio.id}`] = true }}>
          <a href="#set-{studio.id}" class="set-card-link" aria-label={lt(studio.title)}></a>
          <div class="sc-frame">
            <div class="sc-img-clip">
              <div class="sc-img" style={img ? `background-image: url(${img})` : ''}></div>
              <div class="sc-scrim"></div>
            </div>
            <div class="sc-title-overlay">
              <h3>{lt(studio.title)}</h3>
            </div>
            <div class="annot-corner tl"></div>
            <div class="annot-corner tr"></div>
            <div class="annot-corner bl"></div>
            <div class="annot-corner br"></div>
          </div>
          <div class="sc-label">
            <div class="sc-num">SET / {padNum(i + 1)}{studio.showNewBadge ? ' · NEW' : ''}</div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<!-- Set Detail sections — part of the sticky card stack (see .stack-zone in +page) -->
{#each studios as studio, i}
  {@const gallery = galleryOf(studio)}
  {@const rawImg = activeImg[studio.id] ?? getImg(studio)}
  {@const idx = Math.max(0, gallery.indexOf(rawImg))}
  {@const img = shown[`det-${studio.id}`] && rawImg ? cldUrl(rawImg, CLD.main) : null}
  {@const a = annot(i)}
  {@const equipment = getEquipmentItems(studio)}
  {@const isReverse = i % 2 === 1}
  {@const isNew = !!studio.showNewBadge}

  <section class="sv-set-detail vh" id="set-{studio.id}">
    <div class="vh-inner">
      <article class="set-detail {isReverse ? 'reverse' : ''}" use:reveal use:nearViewport={() => { shown[`det-${studio.id}`] = true; prefetchGallery(studio) }}>
        <!-- Media -->
        <div class="sdm-wrap">
          <div
            class="sdm {theme(i)}"
            use:swipe={{
              onNext: () => { if (idx < gallery.length - 1) showImage(studio.id, gallery[idx + 1]!) },
              onPrev: () => { if (idx > 0) showImage(studio.id, gallery[idx - 1]!) },
            }}
          >
            <div class="sdm-img" style={img ? `background-image: url(${img})` : ''}></div>
            <div class="annot annot-tl">{a.tl}</div>
            <div class="annot annot-tr"><span class="dot-mag"></span> REC · 24P</div>
            <div class="annot annot-bl">// SET {padNum(i + 1)} · {lt(studio.title).toUpperCase()}</div>
            <div class="annot annot-br">⟶ {a.br}</div>
            <div class="annot-corner tl"></div>
            <div class="annot-corner tr"></div>
            <div class="annot-corner bl"></div>
            <div class="annot-corner br"></div>
            {#if isNew}<span class="badge-new">NEW</span>{/if}
            {#if gallery.length > 1}
              {#if idx > 0}
                <button type="button" class="sdm-nav left" aria-label="Vorheriges Bild"
                  onclick={() => { activeImg[studio.id] = gallery[idx - 1]; prefetchMain(gallery[idx - 1]) }}>
                  <span class="sdm-nav-icon"></span>
                </button>
              {/if}
              {#if idx < gallery.length - 1}
                <button type="button" class="sdm-nav right" aria-label="Nächstes Bild"
                  onclick={() => { activeImg[studio.id] = gallery[idx + 1]; prefetchMain(gallery[idx + 1]) }}>
                  <span class="sdm-nav-icon"></span>
                </button>
              {/if}
            {/if}
          </div>
          {#if gallery.length > 1}
            <div class="sdm-thumbs">
              {#each gallery as url, gi}
                <button
                  type="button"
                  class="sdm-thumb"
                  class:active={url === rawImg}
                  style={shown[`det-${studio.id}`] ? `background-image: url(${cldUrl(url, CLD.thumb)})` : ''}
                  aria-label="Bild {gi + 1} anzeigen"
                  onpointerenter={() => prefetchMain(url)}
                  onfocus={() => prefetchMain(url)}
                  onclick={() => { activeImg[studio.id] = url }}
                ></button>
              {/each}
            </div>
          {/if}
        </div>

        <!-- Content -->
        <div class="sdc">
          <div class="set-num-bg" aria-hidden="true">{padNum(i + 1)}</div>
          <div class="set-num-glow" aria-hidden="true">{padNum(i + 1)}</div>
          <a href="#sets" class="set-back">
            <span class="set-back-arrow"></span>
            <span>{t.setsDesign.back}</span>
          </a>
          <div class="sdh">
            <div class="sd-num">SET / {padNum(i + 1)} · {isNew ? 'NEW' : 'ACTIVE'}</div>
            <h3>{lt(studio.title)}</h3>
            <p class="sd-lead">{lt(studio.description)}</p>
          </div>

          {#if equipment.length > 0}
            <div class="sd-grid">
              {#each equipment as item}
                <div class="sd-kv">
                  <span class="k">Equipment</span>
                  <span class="v">{item}</span>
                </div>
              {/each}
            </div>
          {/if}

          {#if studio.inspiredBy?.length}
            <div class="inspired-by">
              <div class="ib-label">{t.setsDesign.ib}</div>
              <div class="ib-chips">
                {#each studio.inspiredBy as chip}
                  <span>{chip}</span>
                {/each}
              </div>
            </div>
          {/if}

          <div class="sd-cta-row">
            <a
              href={studio.bookingUrl || '#booking'}
              target={studio.bookingUrl ? '_blank' : undefined}
              rel={studio.bookingUrl ? 'noopener noreferrer' : undefined}
              class="sv-btn"
            >
              <span>{t.setsDesign.cta}</span>
              <span class="arrow"></span>
            </a>
          </div>
        </div>
      </article>
    </div>
  </section>
{/each}
{/if}

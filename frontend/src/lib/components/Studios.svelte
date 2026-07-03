<script lang="ts">
  import { onMount } from 'svelte'
  import axios from 'axios'
  import { useLocale } from '$lib/i18n/index.svelte'
  import { reveal } from '$lib/actions/reveal'

  const { t, lt } = useLocale()

  interface Studio {
    id: string; title: any; description: any; equipment: any
    titleImg?: { url: string }; images?: { url: string }[]
  }

  let studios = $state<Studio[]>([])

  const THEMES = ['theme-cyberpunk', 'theme-japanese', 'theme-hospital'] as const

  const INSPIRED: Record<number, string[]> = {
    0: ['Edgerunners', 'Ghost in the Shell', 'Akira', 'Blade Runner'],
    1: ['Demon Slayer', 'Genshin Impact', 'Inuyasha', 'Mononoke'],
    2: ['Silent Hill', 'Resident Evil', 'SCP', 'Junji Ito'],
  }

  const ANNOTATIONS = [
    { tl: 'ISO 800 · 24mm · f/1.8', br: '1/60s · WB 3200K' },
    { tl: 'ISO 200 · 50mm · f/2.0', br: '1/125s · WB 5600K' },
    { tl: 'ISO 1600 · 35mm · f/1.4', br: '1/40s · WB 4200K' },
  ]

  function theme(i: number) { return THEMES[i % THEMES.length] }
  function inspired(i: number) { return INSPIRED[i % 3] }
  function annot(i: number) { return ANNOTATIONS[i % ANNOTATIONS.length] }
  function padNum(n: number) { return n < 10 ? `0${n}` : `${n}` }

  function getImg(studio: Studio): string | null {
    return studio.titleImg?.url ?? studio.images?.[0]?.url ?? null
  }

  function getEquipmentItems(studio: Studio): string[] {
    const eq = lt(studio.equipment)
    if (!eq) return []
    return eq.split(',').map(s => s.trim()).filter(Boolean).slice(0, 4)
  }

  onMount(async () => {
    try {
      const { data } = await axios.get('/api/studios')
      studios = Array.isArray(data) ? data : []
    } catch { studios = [] }
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
        {@const img = getImg(studio)}
        <article class="set-card {theme(i)}" use:reveal>
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
            <div class="sc-num">SET / {padNum(i + 1)}{i === studios.length - 1 && studios.length > 1 ? ' · NEW' : ''}</div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<!-- Set Detail sections -->
{#each studios as studio, i}
  {@const img = getImg(studio)}
  {@const a = annot(i)}
  {@const equipment = getEquipmentItems(studio)}
  {@const isReverse = i % 2 === 1}
  {@const isNew = i === studios.length - 1 && studios.length > 1}

  <section class="sv-set-detail vh" id="set-{studio.id}">
    <div class="vh-inner">
      <article class="set-detail {isReverse ? 'reverse' : ''}" use:reveal>
        <!-- Media -->
        <div class="sdm {theme(i)}">
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

          <div class="inspired-by">
            <div class="ib-label">{t.setsDesign.ib}</div>
            <div class="ib-chips">
              {#each inspired(i) as chip}
                <span>{chip}</span>
              {/each}
            </div>
          </div>

          <div class="sd-cta-row">
            <a href="#booking" class="sv-btn">
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

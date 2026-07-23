<script lang="ts">
  import { onMount } from 'svelte'
  import axios from 'axios'
  import { useLocale } from '$lib/i18n/index.svelte'
  const { t } = useLocale()

  interface HeroItem { id: string; type: 'image' | 'video'; url: string }

  const SLIDE_MS = 8000

    let media = $state<HeroItem[]>([
    { 
      id: 'video_1', 
      type: 'video', 
      url: '/Video_3Studios_Webseite.mp4' 
    }
  ])
  let slide = $state(0)

  // Newest video wins; otherwise the images run as a crossfade slideshow
  const video = $derived(media.find(m => m.type === 'video') ?? null)
  const images = $derived(media.filter(m => m.type === 'image'))

onMount(() => {
  let timer: ReturnType<typeof setInterval> | undefined

  axios.get('/api/hero')
    .then(({ data }) => {
      if (data && data.length > 0) {
        const hasVideo = data.some((item: HeroItem) => item.type === 'video')
        
        if (!hasVideo) {
          const existingVideo = media.find(m => m.type === 'video')
          media = [
            ...(existingVideo ? [existingVideo] : []),
            ...data.filter((m: HeroItem) => m.type === 'image')
          ]
        } else {
          media = data
        }
      }  
      if (!video && images.length > 1) {
        timer = setInterval(() => { slide = (slide + 1) % images.length }, SLIDE_MS)
      }
    })
    .catch(() => { 
      // Bei Fehler: media nicht auf [] setzen, sonst verschwindet das Video
      console.log('API error, using fallback video')
    })

  return () => { if (timer) clearInterval(timer) }
})
</script>

<section class="sv-hero" id="top">
  <div class="hero-media">
    <div class="hero-fallback"></div>
    {#if video}
      <video class="hero-video" src={video.url} autoplay muted loop playsinline
        poster={images[0]?.url}></video>
    {:else if images.length > 0}
      {#each images as img, i (img.id)}
        <div class="hero-slide" class:active={i === slide} style="background-image: url('{img.url}')"></div>
      {/each}
    {/if}
    <div class="hero-grid"></div>
    <div class="hero-overlay"></div>
  </div>

  <div class="hero-corners"></div>

  <div class="hero-readout">
    <span>REC</span>
    <span class="rec-dot"></span>
    <span>48.218° N · 16.392° E</span>
  </div>

  <div class="hero-bottom-left">
    <a href="#booking" class="sv-btn">
      <span>{t.hero.cta}</span>
      <span class="arrow"></span>
    </a>
    <div class="hero-eyebrow">
      <span class="dot"></span>
      <span>{t.hero.tag}</span>
    </div>
  </div>

  <div class="scroll-cue">
    <span>Scroll</span>
    <span class="bar"></span>
  </div>
</section>

<script lang="ts">
  import { onMount } from 'svelte'
  import { useLocale } from '$lib/i18n/index.svelte'
  import { reveal } from '$lib/actions/reveal'

  const loc = useLocale()
  const { t } = loc

  const CONSENT_KEY = 'sv-map-consent'

  // Google Maps lädt erst nach Zustimmung (DSGVO) — bis dahin wird nichts
  // von Google-Servern angefragt. Zentrierung über ll statt q, damit das
  // Embed keine weiße Info-Karte einblendet — der Pin ist unser eigener.
  const STUDIO_COORDS = '47.9232,16.2119'
  const GMAPS_URL = $derived(
    `https://maps.google.com/maps?ll=${STUDIO_COORDS}&z=17&hl=${loc.locale === 'de' ? 'de' : 'en'}&output=embed`
  )

  let mapConsent = $state(false)

  onMount(() => {
    try { mapConsent = localStorage.getItem(CONSENT_KEY) === '1' } catch {}
  })

  function acceptMap() {
    mapConsent = true
    try { localStorage.setItem(CONSENT_KEY, '1') } catch {}
  }
</script>

<section class="sv-location vh" id="location">
  <div class="vh-inner">
    <div class="section-head" use:reveal>
      <div>
        <div class="eyebrow">{t.locationDesign.eyebrow}</div>
        <h2>{t.locationDesign.h}</h2>
      </div>
    </div>

    <div class="location-grid" use:reveal>
      <!-- Address + Directions -->
      <div class="location-info">
        <div class="address-block">
          <div class="addr-label">{t.locationDesign.label}</div>
          <p>Mühlgasse 8<br>2544 Leobersdorf<br>Austria</p>
        </div>

        <div class="dir-block">
          <div class="dir-title"><span class="pill u">A2</span>{t.locationDesign.carTitle}</div>
          <ul class="dir-list">
            {#each t.locationDesign.carLines as line}
              <li>{line}</li>
            {/each}
          </ul>
        </div>

        <div class="dir-block">
          <div class="dir-title"><span class="pill s">S</span>{t.locationDesign.transitTitle}</div>
          <ul class="dir-list">
            {#each t.locationDesign.transitLines as line}
              <li>{line}</li>
            {/each}
          </ul>
        </div>
      </div>

      <!-- Map — Google Maps, DSGVO-konform erst nach Zustimmung geladen -->
      <div class="map-wrap">
        <div class="map-overlay">
          <span class="dot"></span>
          {t.locationDesign.overlay}
        </div>
        {#if mapConsent}
          <iframe
            src={GMAPS_URL}
            title="ShutterVerse Studio Location"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>
          <div class="map-pin" aria-hidden="true"></div>
        {:else}
          <div class="map-placeholder" aria-hidden="true"></div>
          <div class="map-consent">
            <p>{t.locationDesign.mapNotice}</p>
            <button type="button" class="sv-btn" onclick={acceptMap}>
              <span>{t.locationDesign.mapLoad}</span>
              <span class="arrow"></span>
            </button>
            <span class="map-consent-hint">{t.locationDesign.mapHint}</span>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

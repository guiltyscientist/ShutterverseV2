<script lang="ts">
  import { useLocale } from '$lib/i18n/index.svelte'
  import { reveal } from '$lib/actions/reveal'

  const { t } = useLocale()

  // OpenStreetMap — no consent required, dark-filtered via CSS
  const OSM_URL = "https://www.openstreetmap.org/export/embed.html?bbox=16.196%2C47.913%2C16.218%2C47.933&layer=mapnik&marker=47.923%2C16.207"
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
      <!-- Address + Transit -->
      <div class="location-info">
        <div class="address-block">
          <div class="addr-label">{t.locationDesign.label}</div>
          <p>Mühlgasse 8<br>2544 Leobersdorf<br>Austria</p>
        </div>
        <ul class="transit-list">
          <li><span class="pill u">U</span>{t.locationDesign.transitU}</li>
          <li><span class="pill s">S</span>{t.locationDesign.transitS}</li>
          <li><span class="pill p">P</span>{t.locationDesign.transitP}</li>
        </ul>
      </div>

      <!-- Map — OpenStreetMap, no consent needed -->
      <div class="map-wrap">
        <div class="map-overlay">
          <span class="dot"></span>
          {t.locationDesign.overlay}
        </div>
        <iframe
          src={OSM_URL}
          title="ShutterVerse Studio Location"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </div>
</section>

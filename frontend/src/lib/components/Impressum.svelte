<script lang="ts">
  import { useLocale } from '$lib/i18n/index.svelte'

  const { t } = useLocale()

  const socials = [
    { label: 'Instagram', href: 'https://instagram.com/shutterverse.at' },
    { label: 'TikTok', href: 'https://tiktok.com/@shutterverse' },
  ]
</script>

<footer class="sv-footer" id="impressum">
  <div class="impressum-grid">
    <!-- Brand -->
    <div class="imp-brand">
      <img src="/logos/BIG.png" alt="ShutterVerse Studio" class="sv-logo" />
      <p>{t.footerDesign.brandP}</p>
    </div>

    <!-- Contact -->
    <div>
      <h4>{t.footerDesign.contactH}</h4>
      <p>{@html t.footerDesign.contactP}</p>
    </div>

    <!-- Legal -->
    <div>
      <h4>{t.footerDesign.legalH}</h4>
      <ul>
        <li><a href="/impressum">{t.footerDesign.legal1}</a></li>
        <li><a href="/privacy">{t.footerDesign.legal2}</a></li>
        <li><a href="/terms">{t.footerDesign.legal3}</a></li>
        <li><a href="/rules">{t.footerDesign.legal4}</a></li>
      </ul>
    </div>

    <!-- Social -->
    <div>
      <h4>{t.footerDesign.socialH}</h4>
      <ul>
        {#each socials as s}
          <li><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>
        {/each}
      </ul>
    </div>
  </div>

  <div class="foot-line">
    <span>{t.footerDesign.footL}</span>
    <span class="marker"><span class="d"></span>{t.footerDesign.footR}</span>
  </div>
</footer>

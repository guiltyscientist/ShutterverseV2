<script lang="ts">
  import { onMount } from 'svelte'
  import axios from 'axios'
  import { useLocale } from '$lib/i18n/index.svelte'
  import { reveal } from '$lib/actions/reveal'

  const { t, lt, ltArr } = useLocale()

  interface SocialMedia { platform: string; url: string }
  interface Member {
    id: string; firstName: string; lastName: string
    roles: any; description: any
    profilImg?: { url: string }; socialMedia: SocialMedia[]
  }

  let members = $state<Member[]>([])

  const safeUrl = (url: string) => /^https?:\/\//i.test(url) ? url : ''

  onMount(async () => {
    try {
      const { data } = await axios.get('/api/team')
      members = data
    } catch { members = [] }
  })
</script>

<section class="sv-about vh" id="about">
  <div class="vh-inner">
    <div class="about-layout" use:reveal>
      <!-- Left: headline -->
      <div class="about-left">
        <div class="eyebrow">{t.aboutDesign.eyebrow}</div>
        <h2 class="about-h">
          {t.aboutDesign.h1}<br>
          <span class="stroke">{t.aboutDesign.h2}</span><br>
          {t.aboutDesign.h3}
        </h2>
        <div class="about-meta">{t.aboutDesign.meta}</div>
      </div>

      <!-- Right: team -->
      <div class="about-team">
        {#if members.length === 0}
          <div class="team-row">
            <div class="team-photo">
              <div class="tp-frame"></div>
              <div class="tp-label">MEMBER</div>
            </div>
            <div class="team-info">
              <div class="t-role">Photographer · Set Builder</div>
              <div class="t-name">{t.team.growing}</div>
              <div class="t-bio">{t.team.checkBack}</div>
            </div>
          </div>
        {:else}
          {#each members as member}
            <div class="team-row">
              <div class="team-photo">
                {#if member.profilImg?.url}
                  <img src={member.profilImg.url} alt="{member.firstName} {member.lastName}" />
                {/if}
                <div class="tp-frame"></div>
                <div class="tp-label">{ltArr(member.roles)?.[0] ?? 'Member'}</div>
              </div>
              <div class="team-info">
                <div class="t-role">{ltArr(member.roles).join(' · ')}</div>
                <div class="t-name">{member.firstName}<br>{member.lastName}</div>
                {#if member.description}
                  <div class="t-bio">{lt(member.description)}</div>
                {/if}
                {#if member.socialMedia?.filter(s => safeUrl(s.url)).length > 0}
                  <div class="t-links">
                    {#each member.socialMedia.filter(s => safeUrl(s.url)) as social}
                      <a href={safeUrl(social.url)} target="_blank" rel="noopener noreferrer">{social.platform}</a>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          {/each}
        {/if}
      </div>
    </div>
  </div>
</section>

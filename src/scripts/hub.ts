const searchInput = document.querySelector<HTMLInputElement>('#theme-search')
const sortSelect = document.querySelector<HTMLSelectElement>('#theme-sort')
const grid = document.querySelector<HTMLElement>('#theme-grid')
const count = document.querySelector<HTMLElement>('#theme-count')
const clearButton = document.querySelector<HTMLButtonElement>('#clear-filters')
const emptyState = document.querySelector<HTMLElement>('#empty-state')
const tagButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('.tag-filter'))
const cards = Array.from(document.querySelectorAll<HTMLElement>('.theme-card'))
const activeTags = new Set<string>()

function cardText(card: HTMLElement) {
  return [
    card.dataset.title,
    card.dataset.description,
    card.dataset.repository,
    card.dataset.tags
  ].join(' ')
}

function matchesSearch(card: HTMLElement, query: string) {
  if (!query) return true
  return cardText(card).includes(query)
}

function matchesTags(card: HTMLElement) {
  if (activeTags.size === 0) return true
  const cardTags = new Set((card.dataset.tags ?? '').split(' ').filter(Boolean))
  return Array.from(activeTags).every((tag) => cardTags.has(tag))
}

function sortCards(visibleCards: HTMLElement[]) {
  const sort = sortSelect?.value ?? 'latest'

  return visibleCards.sort((a, b) => {
    if (sort === 'name') {
      return (a.dataset.title ?? '').localeCompare(b.dataset.title ?? '')
    }

    if (sort === 'popular') {
      return Number(b.dataset.stars ?? 0) - Number(a.dataset.stars ?? 0)
    }

    if (sort === 'updated') {
      return (b.dataset.updated ?? '').localeCompare(a.dataset.updated ?? '')
    }

    return Number(b.dataset.index ?? 0) - Number(a.dataset.index ?? 0)
  })
}

function render() {
  if (!grid || !count || !emptyState) return

  const query = searchInput?.value.trim().toLowerCase() ?? ''
  const visibleCards = sortCards(cards.filter((card) => matchesSearch(card, query) && matchesTags(card)))
  const visibleSet = new Set(visibleCards)

  for (const card of cards) {
    card.hidden = !visibleSet.has(card)
  }

  for (const card of visibleCards) {
    grid.append(card)
  }

  count.textContent = `${visibleCards.length} ${visibleCards.length === 1 ? 'theme' : 'themes'}`
  emptyState.hidden = visibleCards.length > 0
}

for (const button of tagButtons) {
  button.addEventListener('click', () => {
    const tag = button.dataset.tag
    if (!tag) return

    if (activeTags.has(tag)) {
      activeTags.delete(tag)
      button.setAttribute('aria-pressed', 'false')
    } else {
      activeTags.add(tag)
      button.setAttribute('aria-pressed', 'true')
    }

    render()
  })
}

searchInput?.addEventListener('input', render)
sortSelect?.addEventListener('change', render)
clearButton?.addEventListener('click', () => {
  activeTags.clear()
  if (searchInput) searchInput.value = ''
  if (sortSelect) sortSelect.value = 'latest'
  for (const button of tagButtons) {
    button.setAttribute('aria-pressed', 'false')
  }
  render()
})

render()

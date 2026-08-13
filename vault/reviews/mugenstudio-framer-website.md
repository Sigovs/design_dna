# Review history — mugenstudio-framer-website

Append-only. `sites.json` holds the current state; this file holds how it got
there. Alex's wording is never edited, and agent observations are never merged
into his judgement.

**Layer verdicts are per layer.** A verdict here is never propagated to the whole
record: `dialectStatus` stays a whole-record field that only Alex sets.

---

## 2026-08-06 22:46 · DEEP

- **submitted:** https://mugenstudio.framer.website/
- **normalised:** https://mugenstudio.framer.website/
- **action:** record created
- **previous rating / dialectStatus:** n/a — new record, defaults applied
- **capture limitation:** <none observed — or state what the capture does not prove>

### Alex's comment — verbatim, never edited

> <paste exactly what Alex wrote, in his language>

### Confirmed changes to the record

- <field: what changed, or "none">
- **previous works:** <only when it changed>
- **previous weaknesses:** <only when it changed>

### Layer judgements

| Layer | Observation | Source | Judgement | Evidence limit |
|---|---|---|---|---|
| composition | <observation, or not verified> | Alex \| agent | IN \| OUT \| unreviewed \| contextual | <if any> |
| hierarchy | <observation, or not verified> | Alex \| agent | IN \| OUT \| unreviewed \| contextual | <if any> |
| typography | <observation, or not verified> | Alex \| agent | IN \| OUT \| unreviewed \| contextual | <if any> |
| colour | <observation, or not verified> | Alex \| agent | IN \| OUT \| unreviewed \| contextual | <if any> |
| imagery | <observation, or not verified> | Alex \| agent | IN \| OUT \| unreviewed \| contextual | <if any> |
| spacing / density | <observation, or not verified> | Alex \| agent | IN \| OUT \| unreviewed \| contextual | <if any> |
| motion | <observation, or not verified> | Alex \| agent | IN \| OUT \| unreviewed \| contextual | <if any> |
| interaction | <observation, or not verified> | Alex \| agent | IN \| OUT \| unreviewed \| contextual | <if any> |
| design dialect | <observation, or not verified> | Alex \| agent | IN \| OUT \| unreviewed \| contextual | <if any> |

**Judgement rules for this table.** A layer Alex did not mention and the agent did
not directly verify stays out of the table entirely — an empty row is a claim.
"not sure", "neutral", "not bad", "ни туда ни сюда" are `unreviewed`, never
forced into IN or OUT. Only `Source: Alex` rows with IN or OUT count as evidence
in distillation.

## 2026-08-06 · DEEP — capture and first observations

- **action:** record created by `npm run review:deep`
- **rating / dialectStatus:** **2 / unreviewed** — repository defaults,
  **awaiting Alex.** Not evidence of taste.

### Alex's comment — verbatim, never edited

> Тут двойное меню — header и hamburger, мне нравится этот вариант. Ну и вообще эстетический порядок мне нравится.

### Agent observations — not Alex's judgement

| Layer | Observation | Source | Verdict |
|---|---|---|---|
| interaction | The double navigation Alex named: a persistent top row — wordmark, city and local time, "Our Work [12]" — with a hamburger at the right holding the rest. Two ranks of navigation on screen at once, and the visible row carries orientation rather than links. | agent | unreviewed |
| typography | MUGEN in white over STUDIO in grey, stacked and overlapping, the second word cropped by the right edge — one wordmark treated as two masses at different depths. | agent | unreviewed |
| typography | A copyright mark and "Since — 2016" set small directly under the display, so the datum reads as part of the wordmark rather than as metadata. | agent | unreviewed |
| composition | A booking card with a named person, open-slot count, price and call button sits at the optical centre, over the display type. | agent | unreviewed |
| risks | Two third-party overlays sit on the content: a "Made in Framer" badge and a Polar purchase widget. The widget covers the body paragraph at the right, cutting the sentence mid-line. | agent | unreviewed |

Every row is `agent` / `unreviewed`.

### Notes and limitations

**The flaw is the platform's, not the studio's** — worth separating before this
record is ever cited. The "Made in Framer" badge and the Polar "Unlock from $129"
widget are template and payment furniture, and the second one **overlaps the body
copy and truncates it**. That is a persistent layer added on top of a composition
rather than counted into it. Anything transferable here is the double navigation
and the stacked wordmark; the overlays are not part of the design being admired.

## 2026-08-13 · the full note round

- **action:** Alex wrote the full reasoning. `note` expanded, `works` and
  `weaknesses` filled from empty, tags assigned from his sentences.
- **rating / dialectStatus:** **2 / unreviewed — unchanged and untouched.**
- **evidence limit, stated by Alex himself:** this is a Framer template, not a
  confirmed client site. His own weighting is quoted in the note field and is not
  an agent's caveat.

### Alex's comment — verbatim, never edited

> В целом сайт нравится за очень собранный эстетический порядок. Несмотря на
> крупную типографику, наложения, асимметрию и большое количество визуальных
> элементов, композиция не ощущается хаотичной. Всё подчинено одной строгой
> системе: чёрно-белая палитра, тонкая сетка, единая геометрия, контролируемые
> отступы и ясное разделение между крупным имиджевым слоем и маленькой
> функциональной информацией. Сайт продаёт дизайн-студию не через декоративную
> креативность, а через ощущение уверенного визуального контроля.
>
> Особенно нравится двойная система навигации: в header сразу вынесены несколько
> наиболее полезных ориентиров — логотип, локация и время, быстрый переход к
> работам, — а hamburger оставляет доступ к полной структуре сайта. Здесь эти два
> меню не выглядят ненужным дублированием, потому что выполняют разные функции.
> Header постоянно даёт контекст и быстрый доступ к главному, не превращаясь в
> стандартную полосу ссылок, а hamburger сохраняет чистоту композиции и открывает
> менее частые направления только по запросу. Хорошо работает и общий контраст
> масштабов: огромный MUGEN STUDIO создаёт узнаваемость и характер, а небольшие
> служебные подписи, карточка менеджера, рейтинг и CTA добавляют конкретику.
> Карточка с реальным человеком, ценой и возможностью сразу назначить звонок
> особенно полезна: она приземляет абстрактную эстетику и показывает, как
> начинается работа со студией. Desktop выглядит как тщательно собранный постер,
> а mobile не просто сжимает его, а перестраивает элементы в понятную вертикальную
> последовательность, сохраняя типографический характер и иерархию.
>
> При этом hero находится близко к визуальной перегрузке. Огромный заголовок,
> портретная карточка, длинный абзац, рейтинг, навигация и несколько плавающих
> элементов одновременно претендуют на внимание. Пока их удерживает строгая
> сетка, но при небольшом изменении контента или более слабых изображениях
> композиция может легко развалиться. Часть мелкого текста и служебных элементов
> теряется на тёмном детализированном фоне. Двойная навигация работает только
> потому, что между двумя уровнями есть ясное разделение ролей; если hamburger
> повторяет те же ссылки, что уже видны в header, система станет избыточной. На
> mobile исчезновение части контекстной навигации делает верх страницы чище, но
> одновременно уменьшает пользу самой идеи двойного меню.
>
> Важно и то, что это Framer-шаблон, а не подтверждённый клиентский сайт студии.
> Поэтому его можно считать сильным референсом композиции, типографической
> иерархии, адаптивной перекомпоновки и организации навигации, но он имеет меньший
> вес как доказательство реальной продуктовой архитектуры. Контент выглядит
> специально подобранным под макет и не показывает, насколько система выдержит
> реальные кейсы, разные объёмы текста, подробные услуги и рост сайта. Кроме того,
> видимые элементы продажи шаблона — Unlock from $129 и Made in Framer — нарушают
> ту самую эстетическую чистоту, ради которой сайт хочется сохранить.

### Confirmed changes to the record

- `note` — his first and fourth paragraphs, kept whole. The fourth is in `note`
  rather than in `weaknesses` because it qualifies **what the whole record may be
  cited for**, not one layer of the design. Its closing clause is also a weakness
  and is cross-referenced rather than duplicated.
- `works` — filled from empty, his second paragraph verbatim.
- `weaknesses` — filled from empty, his third paragraph verbatim.
- `kind` — left at `site`. See the limitation below.

### Layer judgements

| Layer | Observation | Source | Judgement | Evidence limit |
|---|---|---|---|---|
| composition | *"Несмотря на крупную типографику, наложения, асимметрию… композиция не ощущается хаотичной. Всё подчинено одной строгой системе"* | Alex | IN | |
| composition | *"mobile не просто сжимает его, а перестраивает элементы в понятную вертикальную последовательность"* | Alex | IN | |
| composition | *"hero находится близко к визуальной перегрузке… при небольшом изменении контента или более слабых изображениях композиция может легко развалиться"* | Alex | OUT | holds on this content; he states it may not hold on other content |
| hierarchy | *"ясное разделение между крупным имиджевым слоем и маленькой функциональной информацией"*; the scale contrast between the wordmark and the service copy | Alex | IN | |
| typography | *"сохраняя типографический характер и иерархию"* on mobile | Alex | IN | |
| colour | *"чёрно-белая палитра"* named as part of the one strict system | Alex | IN | |
| spacing / density | *"тонкая сетка, единая геометрия, контролируемые отступы"* | Alex | IN | |
| interaction | The double navigation, **with his reason**: *"эти два меню не выглядят ненужным дублированием, потому что выполняют разные функции"* | Alex | IN | |
| interaction | *"если hamburger повторяет те же ссылки, что уже видны в header, система станет избыточной"*; on mobile the disappearing contextual row *"уменьшает пользу самой идеи двойного меню"* | Alex | OUT | the condition on the row above, in his words |
| imagery | *"Часть мелкого текста и служебных элементов теряется на тёмном детализированном фоне"* | Alex | OUT | |
| risks | The template's own furniture — *"Unlock from $129 и Made in Framer — нарушают ту самую эстетическую чистоту"* | Alex | OUT | confirms the 2026-08-06 agent row above, which was `agent`/`unreviewed` |

`motion` stays out of the table: he did not speak to it and nothing was verified.

### Tags assigned, and the sentence each came from

| Tag | His words |
|---|---|
| `composition: dominant-mass` | *"огромный MUGEN STUDIO создаёт узнаваемость и характер, а небольшие служебные подписи… добавляют конкретику"* |
| `composition: responsive-recomposition` | *"mobile не просто сжимает его, а перестраивает элементы"* |
| `layout: strict-grid` | *"тонкая сетка"*, *"Пока их удерживает строгая сетка"* |
| `layout: asymmetry` | *"наложения, асимметрию"* |
| `risks: asset-dependency-risk` | *"при небольшом изменении контента или более слабых изображениях композиция может легко развалиться"* |
| `risks: decorative-information-legibility-risk` | *"Часть мелкого текста… теряется на тёмном детализированном фоне"* |
| `risks: mobile-recomposition-risk` | *"На mobile исчезновение части контекстной навигации… уменьшает пользу самой идеи двойного меню"* |

### Limitations and observations — agent, not Alex's judgement

**The schema has no way to say "template".** `kind` is a real field and every one
of the 31 records carries `site`; there is no documented vocabulary for a second
value, and `vocab.json` does not govern this field. Alex's weighting therefore
lives in prose in `note`, where a reader will find it and a script will not. This
is the first record where the distinction changes what the evidence proves, and it
is filed as a question rather than answered by inventing an enum value.

**The double-navigation statement is unusually rule-shaped, and it arrived with
its own exit.** He did not say *two menus are good*; he said they are justified by
**separated roles**, and named the condition that voids it — a hamburger repeating
what the header already shows. A claim that carries its own falsifier is the
cheapest kind to promote later.

**Possible axis, filed for the ritual and not counted:** this may be the positive
end of the cluster `rekorderstudios-com` sits at the negative end of, where several
genuinely different actions were left undistinguished so the visitor could not
choose. Mugen is praised for the opposite — two levels of navigation whose roles are
separated enough that the duplication reads as intent. Whether *routes must be
distinguished by the job they do* is one axis with two ends, or two unrelated
observations, is a distillation question. `anti-patterns` U12 covers routes that
cannot be **found**; neither rule covers routes that can be found and cannot be
**told apart**.

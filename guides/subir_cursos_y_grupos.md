# Guía para administrar grupos y cursos del CCC en PocketBase

Esta guía explica cómo crear o actualizar **grupos** y **cursos** y cómo registrar sus invitaciones para que pasen por la verificación anti-bots de Cloudflare.

## 1. Para qué sirve cada colección

En PocketBase se usan tres colecciones relacionadas:

| Colección | Para qué sirve |
|---|---|
| `groups` | Guarda la información de los grupos que aparecen en la página del CCC. |
| `courses` | Guarda la información de los cursos que aparecen en la página del CCC. |
| `invite_links` | Guarda los enlaces de invitación que consulta el Worker después de la verificación. |

**Importante:** `groups` y `courses` contienen la información de cada elemento. `invite_links` contiene los enlaces protegidos. Por eso, crear un grupo o curso no registra automáticamente sus invitaciones.

## 2. Cómo agregar un grupo nuevo

### Paso 1: Crear el grupo

1. Entra a PocketBase.
2. Abre la colección `groups`.
3. Crea un registro nuevo.
4. Completa los datos del grupo y guarda.
5. Copia el **ID** que PocketBase asignó al registro.

Ese ID identifica al grupo. No uses el nombre del grupo ni el ID de un registro de `invite_links`.

### Paso 2: Registrar sus invitaciones

Abre `invite_links` y crea **un registro por cada plataforma** que tenga el grupo.

Completa los campos así:

| Campo | Valor |
|---|---|
| `source` | `groups` |
| `record_id` | ID del grupo creado en `groups` |
| `platform` | `telegram` o `whatsapp` |
| `url` | Enlace de invitación correspondiente |

### Ejemplo de un grupo con Telegram y WhatsApp

Supongamos que el ID del grupo es `fhsxixnprdfe68g`. En `invite_links` se crean dos registros:

| `source` | `record_id` | `platform` | `url` |
|---|---|---|---|
| `groups` | `fhsxixnprdfe68g` | `telegram` | `https://t.me/ejemplo` |
| `groups` | `fhsxixnprdfe68g` | `whatsapp` | `https://chat.whatsapp.com/ejemplo` |

Usa los enlaces reales. Si el grupo solo tiene Telegram, crea solo el registro de Telegram. Si solo tiene WhatsApp, crea solo el de WhatsApp.

## 3. Cómo agregar un curso nuevo

### Paso 1: Crear el curso

1. Entra a PocketBase.
2. Abre la colección `courses`.
3. Crea un registro nuevo.
4. Completa los datos del curso y guarda.
5. Copia el **ID** que PocketBase asignó al curso.

### Paso 2: Registrar su invitación

Abre `invite_links` y crea un registro por cada plataforma de invitación que tenga el curso.

Completa los campos así:

| Campo | Valor |
|---|---|
| `source` | `courses` |
| `record_id` | ID del curso creado en `courses` |
| `platform` | `telegram` o `whatsapp` |
| `url` | Enlace de invitación correspondiente |

**Nota:** si el curso solo ofrece invitación de Telegram, crea únicamente el registro con `platform = telegram`. Registra WhatsApp solo si ese curso realmente tiene un enlace de WhatsApp habilitado.

### Ejemplo

Supongamos que el ID del curso es `abc123xyz` y que tiene Telegram:

| `source` | `record_id` | `platform` | `url` |
|---|---|---|---|
| `courses` | `abc123xyz` | `telegram` | `https://t.me/ejemplo` |

Si también tiene WhatsApp, agrega otro registro con el mismo `source` y `record_id`, pero con `platform = whatsapp` y su enlace correspondiente.

## 4. Cómo funciona la protección de invitaciones

Cuando una persona pulsa un botón de invitación en la página del CCC:

1. La página envía al Worker el tipo de elemento (`groups` o `courses`), el ID del registro y la plataforma (`telegram` o `whatsapp`).
2. El Worker busca en `invite_links` un registro que coincida con esos tres datos.
3. Si encuentra una invitación válida, muestra la verificación de Cloudflare Turnstile.
4. Si la persona supera la verificación, el Worker la redirige al enlace guardado en `url`.

Por eso, los valores deben coincidir exactamente. Por ejemplo, para un grupo de Telegram, la búsqueda usa:

- `source = groups`
- `record_id =` el ID del grupo en `groups`
- `platform = telegram`

Para un curso de Telegram, cambia `source` a `courses` y usa el ID del curso en `courses`.

## 5. Lista de comprobación

Antes de publicar un grupo o curso, revisa:

- [ ] El registro principal existe en `groups` o `courses`.
- [ ] Copiaste el ID del registro principal correcto.
- [ ] Creaste en `invite_links` un registro separado por cada plataforma disponible.
- [ ] `source` dice exactamente `groups` o `courses`, según corresponda.
- [ ] `record_id` contiene el ID del grupo o curso, no el ID de `invite_links`.
- [ ] `platform` dice exactamente `telegram` o `whatsapp`.
- [ ] `url` contiene el enlace correcto para esa plataforma.

## 6. Regla fácil de recordar

- **Cada grupo:** un registro en `groups` + un registro en `invite_links` por cada plataforma de invitación.
- **Cada curso:** un registro en `courses` + un registro en `invite_links` por cada plataforma de invitación.

**En `record_id` siempre va el ID del grupo o curso original. En `url` siempre va el enlace de invitación.**
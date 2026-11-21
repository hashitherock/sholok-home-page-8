<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project architecture
- Keep translations in a browser-safe dictionary and apply a single root language provider so search indexing and all portal pages share the selected language without changing internal filter values or URLs.
- Keep demo content and service destinations centralized in a browser-safe data module so portal views and searches share one source of truth.
- Use shared portal components and typed TanStack leaf routes for service previews and informational destinations so navigation remains functional without external dependencies.
- Read localStorage only after hydration and persist through a shared hook to keep SSR output consistent and demo preferences local.
- Use the shared accessible main-navigation drawer at every width with About, Services and Help sections; centralized service and help destinations keep navigation consistent.
- Assign service icon themes with data-service slugs and global semantic tokens so each service keeps its color across navigation, directories and previews.

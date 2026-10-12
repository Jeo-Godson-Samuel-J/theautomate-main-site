import {defineConfig, DocumentActionComponent} from 'sanity'
import {structureTool} from 'sanity/structure'
import {codeInput} from '@sanity/code-input'
import {visionTool} from '@sanity/vision'
import {useToast} from '@sanity/ui'
import {schemaTypes} from './schemaTypes'
import {ProductSelectorInput} from './components/ProductSelectorInput'

function createSyncPlanPublishAction(originalPublishAction: DocumentActionComponent) {
  return function SyncPlanPublishAction(props: any) {
    const originalResult = originalPublishAction(props)
    const toast = useToast()

    return {
      ...originalResult,
      onHandle: async () => {
        if (originalResult?.onHandle) {
          originalResult.onHandle()
        }
        const doc = props.draft || props.published
        if (doc && typeof doc.price === 'number') {
          try {
            const apiBase =
              (typeof process !== 'undefined' && (process.env as any)?.SANITY_STUDIO_API_URL) ||
              (typeof window !== 'undefined' && (import.meta as any).env?.SANITY_STUDIO_API_URL) ||
              ''
            const res = await fetch(`${apiBase}/api/bundles/sync-price`, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                badge: doc.badge || doc.title,
                price: doc.price,
                bundleUuid: doc.bundleUuid,
              }),
            })
            if (res.ok) {
              toast.push({
                status: 'success',
                title: 'Supabase Price Updated',
                description: `Sanity price ₹${doc.price} synchronized to phase2.bundles (${doc.badge || doc.title})`,
              })
            }
          } catch (e) {
            console.error('[SyncPlanPublishAction] Failed to trigger price sync:', e)
          }
        }
      },
    }
  }
}

export default defineConfig({
  name: 'default',
  title: 'admin-panel',

  projectId: 'fv0uht0z',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), codeInput()],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, context) => {
      if (context.schemaType === 'plan') {
        return prev.map((originalAction) =>
          originalAction.action === 'publish'
            ? (createSyncPlanPublishAction(originalAction) as any)
            : originalAction,
        )
      }
      return prev
    },
  },

  /**
   * form.components.input
   * ─────────────────────
   * Intercept the input rendering for the `productUuid` field on the
   * `courseDetails` document type and replace it with our custom
   * ProductSelectorInput — no schema modification required.
   */
  form: {
    components: {
      input: (props) => {
        if (
          props.id === 'productUuid' &&
          props.schemaType.name === 'string'
        ) {
          return ProductSelectorInput(props as any)
        }
        return props.renderDefault(props)
      },
    },
  },
})


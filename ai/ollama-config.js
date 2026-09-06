// PatriaSoul AI configuration
// The browser talks to PatriaSoul's own backend. Provider secrets never live here.
window.PatriaSoulAIConfig = Object.freeze({
  provider: 'patriasoul-api',
  apiEndpoint: 'https://azerctpwfzdivydsxyex.supabase.co/functions/v1/patria-ai',
  localProvider: 'ollama',
  baseUrl: 'http://127.0.0.1:11434',
  model: 'auto:free',
  chatEnabled: true,
  publicExposure: true,
  knowledgeOnlyFallback: true
});

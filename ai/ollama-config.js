// PatriaSoul AI configuration
// Public frontend never talks directly to an AI provider that requires secrets.
// The public AI endpoint is owned by PatriaSoul; Ollama is kept for local development.
window.PatriaSoulAIConfig = Object.freeze({
  provider: 'patriasoul-api',
  apiEndpoint: '/api/ai',
  localProvider: 'ollama',
  baseUrl: 'http://127.0.0.1:11434',
  model: 'gpt-5.6-luna',
  chatEnabled: true,
  publicExposure: true,
  knowledgeOnlyFallback: true
});

// PatriaSoul AI configuration
// Puter is the public/default provider. Ollama remains available for local development.
window.PatriaSoulAIConfig = Object.freeze({
  provider: 'puter',
  baseUrl: 'http://127.0.0.1:11434',
  model: 'gpt-5.6-luna',
  chatEnabled: true,
  publicExposure: false
});

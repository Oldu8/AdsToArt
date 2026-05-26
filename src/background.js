const AD_RULESET_ID = 'ad_blocking_rules';

async function applyDNRRules(enabled) {
  if (enabled) {
    await chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: [AD_RULESET_ID],
      disableRulesetIds: [],
    });
  } else {
    await chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: [],
      disableRulesetIds: [AD_RULESET_ID],
    });
  }
}

async function syncDNRWithStorage() {
  const { enabled = true } = await chrome.storage.sync.get(['enabled']);
  await applyDNRRules(enabled);
}

// Apply on install and on browser startup to stay in sync with storage
chrome.runtime.onInstalled.addListener(syncDNRWithStorage);
chrome.runtime.onStartup.addListener(syncDNRWithStorage);

// React immediately when the user toggles the extension
chrome.storage.onChanged.addListener(async (changes, area) => {
  if (area === 'sync' && 'enabled' in changes) {
    await applyDNRRules(changes.enabled.newValue ?? true);
  }
});

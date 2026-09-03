/* EUROVEST — Cross-Device Persistence & Sync Layer
   ===================================================
   This module makes EV.store survive redeploy AND work across devices.

   How it works:
   1. localStorage stays the fast local cache (instant reads, offline use).
   2. Every EV.store.set() ALSO pushes the value to the backend server.
   3. On page load, EV.sync.hydrate() pulls the entire server DB and merges it
      into localStorage — so a user logging in on a NEW DEVICE gets all their
      data back automatically.
   4. A periodic background flush re-syncs local changes (covers offline edits).

   The backend is server/server.js (zero-dependency Node). If it is unreachable,
   the app keeps working on localStorage alone (graceful degradation).

   CONFIGURATION
   - Set EV.sync.serverURL to your deployed backend URL (see SETUP_PERSISTENCE.md).
   - If left empty, sync is skipped and the app behaves exactly as before
     (localStorage only) — handy for local dev without the backend.
*/
(function () {
  if (typeof EV === 'undefined') EV = {};

  EV.sync = {
    // ---- CONFIG: set this to your backend URL (or leave '' for local-only) ----
    // e.g. 'https://eurovest-backend.onrender.com'
    serverURL: '',

    // how often to flush local changes to the server (ms)
    flushInterval: 30000,
    _flushTimer: null,
    _dirty: false,
    _hydrated: false,

    _api: function (path, opts) {
      if (!this.serverURL) return Promise.resolve({ __skipped: true });
      return fetch(this.serverURL + path, opts).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      }).catch(function (e) {
        // Silent fail — app still works on localStorage
        return { __error: e.message };
      });
    },

    // Pull entire server DB and hydrate localStorage (called once on load)
    hydrate: function () {
      var self = this;
      if (this._hydrated || !this.serverURL) return Promise.resolve();
      return this._api('/api/pull').then(function (data) {
        if (!data || data.__error || data.__skipped) return;
        for (var key in data) {
          if (key === '__meta') continue;
          var serverVal = data[key];
          var localRaw = null;
          try { localRaw = localStorage.getItem('ev_' + key); } catch (e) {}
          // Only write to localStorage if the server has data the local browser doesn't,
          // OR the server data is newer (arrays merged by id below).
          if (localRaw === null) {
            try { localStorage.setItem('ev_' + key, JSON.stringify(serverVal)); } catch (e) {}
          } else if (Array.isArray(serverVal)) {
            // Merge arrays by id (union, server wins on conflict)
            try {
              var localArr = JSON.parse(localRaw);
              if (Array.isArray(localArr)) {
                var seen = {};
                localArr.forEach(function (x) { if (x && x.id) seen[String(x.id)] = x; });
                serverVal.forEach(function (x) {
                  if (x && x.id) {
                    if (seen[String(x.id)]) Object.assign(seen[String(x.id)], x);
                    else { localArr.push(x); seen[String(x.id)] = x; }
                  }
                });
                try { localStorage.setItem('ev_' + key, JSON.stringify(localArr)); } catch (e) {}
              }
            } catch (e) {}
          } else {
            // Non-array: prefer server value if local is stale/empty-ish
            try {
              var localVal = JSON.parse(localRaw);
              if (localVal === null || localVal === '' || (typeof localVal === 'object' && Object.keys(localVal).length === 0)) {
                localStorage.setItem('ev_' + key, JSON.stringify(serverVal));
              }
            } catch (e) {
              try { localStorage.setItem('ev_' + key, JSON.stringify(serverVal)); } catch (e2) {}
            }
          }
        }
        self._hydrated = true;
        // Re-run any page loaders that depend on synced data
        if (typeof window.onSyncHydrate === 'function') {
          try { window.onSyncHydrate(); } catch (e) {}
        }
      });
    },

    // Push a single key to the server
    pushKey: function (key, value) {
      return this._api('/api/key/' + encodeURIComponent(key), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: value })
      });
    },

    // Bulk push everything in localStorage (used by the flush timer)
    flushAll: function () {
      if (!this.serverURL) return Promise.resolve();
      var dump = {};
      try {
        for (var i = 0; i < localStorage.length; i++) {
          var fullKey = localStorage.key(i);
          if (fullKey && fullKey.indexOf('ev_') === 0) {
            var key = fullKey.substring(3);
            try { dump[key] = JSON.parse(localStorage.getItem(fullKey)); } catch (e) {}
          }
        }
      } catch (e) {}
      return this._api('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dump: dump })
      });
    },

    // Start the periodic background flush
    startAutoSync: function () {
      var self = this;
      if (this._flushTimer || !this.serverURL) return;
      this._flushTimer = setInterval(function () { self.flushAll(); }, this.flushInterval);
      // Also flush on tab hide / page unload
      window.addEventListener('beforeunload', function () { self.flushAll(); });
      document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden') self.flushAll();
      });
    },

    // Mark that local data changed and a flush is needed
    markDirty: function () { this._dirty = true; },

    // Convenience: configure + bootstrap in one call
    init: function (serverURL) {
      if (serverURL) this.serverURL = serverURL;
      var self = this;
      return this.hydrate().then(function () { self.startAutoSync(); });
    }
  };

  // ---- Patch EV.store so every set() also pushes to the server ----
  if (EV.store && EV.store.set) {
    var _origSet = EV.store.set.bind(EV.store);
    var _origPush = EV.store.push.bind(EV.store);
    EV.store.set = function (key, val) {
      _origSet(key, val);
      EV.sync.pushKey(key, val);
    };
    EV.store.push = function (key, item) {
      var arr = _origPush(key, item);
      EV.sync.pushKey(key, arr);
      return arr;
    };
  }
})();

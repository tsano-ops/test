// Entry Rules — canonical icon + color mappings for every entry type.
// SSOT for visual presentation. Used by:
//   - Card rendering on each record (Essential Info, Medical, etc.)
//   - Documents tab aggregator
//   - Vault aggregator
//   - Linked-person card sync
//
// When creating a new entry, the system MUST resolve icon and color via these
// helpers — never hardcoded per-entry. This guarantees visual consistency.

(function() {
    'use strict';

    // ─────────────────────────────────────────────────────────────
    // STATUS COLORS — based on whether entry has digital file + location
    // Per DSL §374
    // ─────────────────────────────────────────────────────────────
    window.ENTRY_STATUS_COLORS = {
        'both':     { hex: '#61C553', label: 'Digital File & Location', cls: 'status-both'     }, // 🟢 green
        'digital':  { hex: '#667EEA', label: 'Digital File',            cls: 'status-digital'  }, // 🔵 blue
        'location': { hex: '#FF9500', label: 'Location',                cls: 'status-location' }, // 🟠 orange
        'none':     { hex: '#CCCCCC', label: '',                        cls: 'status-none'     }  // ⚪ grey ring
    };

    /**
     * Resolve the status-color key for an entry.
     * @param {Object} entry — must have hasFile and hasLocation booleans (or .file / .location)
     * @returns {'both' | 'digital' | 'location' | 'none'}
     */
    window.entryStatusKey = function(entry) {
        const hasFile = !!(entry.hasFile || entry.file || (entry.files && entry.files.length));
        const hasLoc  = !!(entry.hasLocation || entry.location);
        if (hasFile && hasLoc) return 'both';
        if (hasFile)           return 'digital';
        if (hasLoc)            return 'location';
        return 'none';
    };

    /**
     * Get the color hex for an entry's status.
     */
    window.entryStatusColor = function(entry) {
        return window.ENTRY_STATUS_COLORS[window.entryStatusKey(entry)];
    };

    // ─────────────────────────────────────────────────────────────
    // ICON REGISTRY — one canonical icon per (cardKey, subcategory)
    // Per DSL §1411 (Print Document Icon Registry — extended for screen)
    // ─────────────────────────────────────────────────────────────
    window.ENTRY_ICONS = {
        // Essential Info card — every type uses generic document icon
        // (per spec: passport / driver's license / etc. all use document.png)
        'essential':  { default: 'img/document.png', size: '16x20' },

        // Family card — relationship documents
        'family':     { default: 'img/document.png', size: '16x20' },

        // Medical card — different icon per subcategory
        'medical:Blood Type':         { default: 'img/drop.png',          size: '16x20' },
        'medical:Allergy':            { default: 'img/shield-allergy.png', size: '20x20' },
        'medical:Medical Condition':  { default: 'img/pill.png',          size: '20x20' },
        'medical:Medical Device':     { default: 'img/activity.png',      size: '20x20' },
        'medical':                    { default: 'img/document.png',      size: '16x20' }, // fallback

        // Education card
        'education': { default: 'img/education.png', size: '20x20' },

        // Employment card
        'employment:Employment':         { default: 'img/goal.png',  size: '20x20' },
        'employment:Membership':         { default: 'img/crown.png', size: '24x20' },
        'employment:Professional License':{ default: 'img/document.png', size: '16x20' },
        'employment':                    { default: 'img/goal.png',  size: '20x20' }, // fallback

        // Beliefs / Hobbies / Interests
        'beliefs:Belief':   { default: 'img/heart.png',   size: '20x18' },
        'beliefs:Hobby':    { default: 'img/star.png',    size: '20x20' },
        'beliefs:Interest': { default: 'img/puzzle.png',  size: '20x20' },
        'beliefs':          { default: 'img/heart.png',   size: '20x20' }, // fallback

        // Generic fallback
        '_default': { default: 'img/document.png', size: '16x20' }
    };

    /**
     * Resolve the icon path for an entry.
     * Lookup order: exact (cardKey + subcategory) → cardKey only → _default
     * @param {Object} entry — must have cardKey and (optionally) subcategory
     * @returns {{src: string, size: string}}
     */
    window.entryIcon = function(entry) {
        const cardKey = entry.cardKey || '';
        const sub = entry.subcategory || '';
        const exact = cardKey + ':' + sub;
        return window.ENTRY_ICONS[exact]
            || window.ENTRY_ICONS[cardKey]
            || window.ENTRY_ICONS._default;
    };

    // ─────────────────────────────────────────────────────────────
    // CARD GROUP TITLES — what section header to render an entry under
    // Per DSL §367 (Documents Tab grouping)
    // ─────────────────────────────────────────────────────────────
    window.ENTRY_GROUP_TITLES = {
        'essential':                 'Identity & Vital Documents',
        'family':                    'Relationship & Status Documents',
        'medical:Blood Type':        'Blood Type',
        'medical:Allergy':           'Allergies',
        'medical:Medical Condition': 'Medical Conditions',
        'medical:Medical Device':    'Medical Devices & Implants',
        'medical':                   'Medical Documents', // fallback for other medical
        'education:Educational Qualification':  'Educational Qualifications',
        'education:Professional Certification': 'Professional Certifications',
        'education:Other Education': 'Other Educations',
        'education':                 'Education Documents', // fallback
        'employment:Employment':     'Employment Entries',
        'employment:Membership':     'Memberships & Affiliations',
        'employment':                'Employment Documents',
        'beliefs:Belief':            'Beliefs',
        'beliefs:Hobby':             'Hobbies',
        'beliefs:Interest':          'Interests',
        'beliefs':                   'Beliefs & Interests'
    };

    /**
     * Resolve the section title for an entry.
     */
    window.entryGroupTitle = function(entry) {
        const cardKey = entry.cardKey || '';
        const sub = entry.subcategory || '';
        const exact = cardKey + ':' + sub;
        return window.ENTRY_GROUP_TITLES[exact]
            || window.ENTRY_GROUP_TITLES[cardKey]
            || 'Other';
    };

    // ─────────────────────────────────────────────────────────────
    // FULL RESOLVE — single call returns all visual properties
    // Convenience wrapper for renderers.
    // ─────────────────────────────────────────────────────────────
    window.entryVisuals = function(entry) {
        const status = window.entryStatusKey(entry);
        const color  = window.ENTRY_STATUS_COLORS[status];
        const icon   = window.entryIcon(entry);
        const group  = window.entryGroupTitle(entry);
        return {
            status: status,
            statusLabel: color.label,
            colorHex: color.hex,
            colorClass: color.cls,
            iconSrc: icon.default,
            iconSize: icon.size,
            groupTitle: group
        };
    };
})();

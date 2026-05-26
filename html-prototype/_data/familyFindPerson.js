// Find a person — shared header pill across the 3 family tabs
// (Family Tree, Family Members, Timeline). Default state is a 50×50
// magnifier circle. Click expands it to a 200 px input pill rightward.
// Type to filter peopleStore by name; click a result to open that
// person's record (or recenter the tree on Family Tree).
// Violetka 2026-05-18: shared init so all 3 tabs behave identically.
(function () {
    'use strict';

    function init() {
        var wrap = document.getElementById('ftreeFindPerson');
        var input = document.getElementById('ftreeFindInput');
        var dropdown = document.getElementById('ftreeFindDropdown');
        if (!wrap || !input || !dropdown) return;
        var row = wrap.closest('.pd-tabs-row');

        // Cancel button — injected once. Sits as the rightmost child of the
        // row, only visible when find-open AND input has text.
        var cancelBtn = row && row.querySelector('.ftree-findperson-cancel');
        if (row && !cancelBtn) {
            cancelBtn = document.createElement('button');
            cancelBtn.type = 'button';
            cancelBtn.className = 'ftree-findperson-cancel';
            cancelBtn.textContent = 'Cancel';
            row.appendChild(cancelBtn);
            cancelBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                input.value = '';
                dropdown.classList.remove('open');
                closeWrap();
            });
        }

        function initials(p) {
            var f = (p.firstName || (p.name || '').split(' ')[0] || '').charAt(0);
            var l = (p.familyName || (p.name || '').split(' ').slice(-1)[0] || '').charAt(0);
            return (f + l).toUpperCase();
        }
        function escHtml(s) {
            return String(s == null ? '' : s).replace(/[&<>"']/g, function(c) {
                return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
            });
        }

        function render(results) {
            if (!results.length) {
                dropdown.innerHTML = '<div class="ftree-findperson-empty">No matches</div>';
                dropdown.classList.add('open');
                return;
            }
            dropdown.innerHTML = results.slice(0, 8).map(function (p) {
                var photo = (p.id === 'sj' && window.planOwnerPhoto) ? window.planOwnerPhoto : (p.photo || '');
                var avatarHtml = photo
                    ? '<img src="' + escHtml(photo) + '" alt="">'
                    : escHtml(initials(p) || '?');
                var role = p.roleLayer2 || p.role || '';
                return '<div class="ftree-findperson-item" data-pid="' + escHtml(p.id) + '">'
                    + '<div class="ftree-findperson-item-avatar">' + avatarHtml + '</div>'
                    + '<div class="ftree-findperson-item-text">'
                    +   '<div class="ftree-findperson-item-name">' + escHtml(p.name || '') + '</div>'
                    + (role ? '<div class="ftree-findperson-item-role">' + escHtml(role) + '</div>' : '')
                    + '</div>'
                    + '</div>';
            }).join('');
            dropdown.classList.add('open');
        }

        // Click the wrap to enter SEARCH MODE — the whole row reflows:
        //   • tabs pad slides left, find-person expands rightward to cover ⋯
        //   • total width becomes 600 px (matches the pad below)
        //   • Cancel button appears once user starts typing
        // Driven by `.find-open` on the .pd-tabs-row (CSS does the heavy
        // lifting; transition timing matches the panel-slide easing).
        wrap.addEventListener('click', function (e) {
            if (wrap.classList.contains('open')) return;
            wrap.classList.add('open');
            if (row) row.classList.add('find-open');
            setTimeout(function () { input.focus(); }, 50);
            e.stopPropagation();
        });

        // Type → filter peopleStore + show Cancel
        input.addEventListener('input', function () {
            var q = input.value.trim().toLowerCase();
            if (row) row.classList.toggle('has-text', !!q);
            if (!q) { dropdown.classList.remove('open'); return; }
            if (!Array.isArray(window.peopleStore)) return;
            var results = window.peopleStore.filter(function (p) {
                if (!p) return false;
                var hay = ((p.name || '') + ' ' + (p.firstName || '') + ' ' + (p.familyName || '')).toLowerCase();
                return hay.indexOf(q) !== -1;
            });
            render(results);
        });

        // Click a result → open that person's record (or recenter on Family Tree)
        dropdown.addEventListener('click', function (e) {
            var item = e.target.closest('.ftree-findperson-item');
            if (!item) return;
            var pid = item.getAttribute('data-pid');
            if (!pid) return;
            input.value = '';
            dropdown.classList.remove('open');
            closeWrap();
            input.blur();
            if (window.paTreeFocusPerson && document.body.classList.contains('page-family-tree')) {
                window.paTreeFocusPerson(pid);
            } else if (window.openPersonRecord) {
                window.openPersonRecord(pid);
            } else if (pid === 'sj') {
                window.location.href = 'profile.html';
            } else {
                window.location.href = 'record.html#' + encodeURIComponent(pid);
            }
        });

        function closeWrap() {
            wrap.classList.remove('open');
            if (row) {
                row.classList.remove('find-open');
                row.classList.remove('has-text');
            }
        }

        // Close on outside click
        document.addEventListener('click', function (e) {
            if (e.target.closest('#ftreeFindPerson')) return;
            dropdown.classList.remove('open');
            if (!input.value) closeWrap();
        });

        // ESC closes
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                input.value = '';
                dropdown.classList.remove('open');
                closeWrap();
                input.blur();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ───── Smooth pill slide across family tab navigation ─────
    // Click a tab → remember which tab we came from, then on the next page
    // load, position the pill at the OLD tab's slot first (no transition)
    // and animate it to the new tab's slot (with transition). Result: the
    // active-pill background feels like it smoothly slides between tabs even
    // though we navigate to a different HTML page.
    // Violetka 2026-05-18: "искам пилса да се плъзга плавно при селекция".
    function initPillSlide() {
        var KEY = 'paFamilyPillFromTab';
        var tabs = Array.from(document.querySelectorAll('.profile-tabs a.profile-tab'));
        if (!tabs.length) return;
        var pill = document.getElementById('tabsPill');
        var activeTab = tabs.find(function (t) { return t.classList.contains('active'); });

        // Read where the user came from (set on previous page).
        var fromKey = null;
        try { fromKey = sessionStorage.getItem(KEY); } catch (e) {}
        if (fromKey && pill && activeTab) {
            var fromTab = tabs.find(function (t) { return t.getAttribute('data-tab') === fromKey; });
            if (fromTab && fromTab !== activeTab) {
                // Position pill at the OLD tab without transition.
                pill.style.transition = 'none';
                pill.style.left = fromTab.offsetLeft + 'px';
                pill.style.width = fromTab.offsetWidth + 'px';
                // Force reflow, then animate to the new tab's slot.
                pill.offsetWidth;
                pill.style.transition = 'left 0.35s cubic-bezier(0.16, 1, 0.3, 1), width 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
                requestAnimationFrame(function () {
                    pill.style.left = activeTab.offsetLeft + 'px';
                    pill.style.width = activeTab.offsetWidth + 'px';
                });
            }
            try { sessionStorage.removeItem(KEY); } catch (e) {}
        }

        // Capture click → remember the FROM tab before navigation happens.
        tabs.forEach(function (t) {
            t.addEventListener('click', function () {
                var current = tabs.find(function (x) { return x.classList.contains('active'); });
                if (current) {
                    try { sessionStorage.setItem(KEY, current.getAttribute('data-tab')); } catch (e) {}
                }
            });
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPillSlide);
    } else {
        initPillSlide();
    }
})();

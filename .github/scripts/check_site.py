#!/usr/bin/env python3
"""Dependency-free smoke checks for the static BZaudio site."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import sys

ROOT = Path(__file__).resolve().parents[2]
PAGES = (ROOT / "index.html", ROOT / "admin" / "index.html")
errors = []

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.links = []
        self.forms = []
        self._form = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        element_id = attrs.get("id")
        if element_id:
            if element_id in self.ids:
                errors.append(f"{self.page}: duplicate id #{element_id}")
            self.ids.add(element_id)
        for attr in ("href", "src"):
            value = attrs.get(attr)
            if value:
                self.links.append((tag, attr, value))
        if tag == "form":
            self._form = {"id": attrs.get("id"), "fields": set()}
            self.forms.append(self._form)
        if self._form and tag in ("input", "textarea", "select"):
            if attrs.get("name"):
                self._form["fields"].add(attrs["name"])

    def handle_endtag(self, tag):
        if tag == "form":
            self._form = None

for page in PAGES:
    if not page.is_file():
        errors.append(f"Missing page: {page.relative_to(ROOT)}")
        continue
    parser = PageParser()
    parser.page = page.relative_to(ROOT).as_posix()
    try:
        parser.feed(page.read_text(encoding="utf-8"))
        parser.close()
    except Exception as exc:
        errors.append(f"{parser.page}: HTML parsing failed: {exc}")
        continue

    for tag, attr, value in parser.links:
        parsed = urlsplit(value)
        if parsed.scheme or value.startswith("//"):
            continue
        if parsed.fragment and not parsed.path:
            if parsed.fragment not in parser.ids:
                errors.append(f"{parser.page}: missing fragment target #{parsed.fragment}")
            continue
        if not parsed.path:
            continue
        target = (page.parent / parsed.path).resolve()
        if target.is_dir():
            target = target / "index.html"
        if not target.is_file():
            errors.append(f"{parser.page}: missing local {attr} target {value}")

main_html = (ROOT / "index.html").read_text(encoding="utf-8")
app_js = (ROOT / "app.js").read_text(encoding="utf-8")
css = (ROOT / "styles.css").read_text(encoding="utf-8")
required = {
    "main landmark": 'id="main"' in main_html,
    "contact form": 'id="contact-form"' in main_html,
    "form status region": 'id="form-status"' in main_html,
    "mobile navigation button": 'class="menu-toggle"' in main_html,
    "mobile navigation script": "aria-expanded" in app_js and "classList.toggle('open')" in app_js,
    "email draft handling": "mailto:benrz101@gmail.com?subject=" in app_js,
    "configured inquiry recipient": "benrz101@gmail.com" in app_js,
    "required inquiry fields": all(f'name="{field}"' in main_html for field in ("name", "email", "interest", "message")),
    "inquiry status explanation": "does not send or store" in app_js,
    "tablet navigation breakpoint": "max-width:850px" in css and "min-width:621px" in css,
}
for label, passed in required.items():
    if not passed:
        errors.append(f"Missing required feature: {label}")

if errors:
    print("BZaudio smoke checks FAILED:")
    for error in errors:
        print(f" - {error}")
    sys.exit(1)

print(f"BZaudio smoke checks passed: {len(PAGES)} HTML pages, local links/assets, fragment targets, and required site features.")

"""Browser QA for the dependency-free Hopeful Hearts build.

Run after `npm run build` with Python Playwright installed. The script injects
the built CSS and JavaScript directly, so it does not require a local server.
"""

from __future__ import annotations

import base64
from pathlib import Path

from playwright.sync_api import Page, sync_playwright


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
SCREENSHOTS = ROOT / "outputs" / "screenshots"
ROUTES = {
    "home": DIST / "index.html",
    "about-us": DIST / "about-us" / "index.html",
    "services": DIST / "services" / "index.html",
    "agency-services": DIST / "agency-services" / "index.html",
    "contact": DIST / "contact" / "index.html",
}
VIEWPORTS = {
    "1440": {"width": 1440, "height": 900},
    "768": {"width": 768, "height": 1024},
    "390": {"width": 390, "height": 844},
}


def renderable_html(path: Path) -> str:
    html = path.read_text(encoding="utf-8")
    css = (DIST / "styles.css").read_text(encoding="utf-8")
    client = (DIST / "client.js").read_text(encoding="utf-8")
    logo = base64.b64encode((DIST / "assets" / "hopeful-hearts-mark.png").read_bytes()).decode()
    partner = base64.b64encode((DIST / "assets" / "tusla-logo.png").read_bytes()).decode()
    care_image = base64.b64encode((DIST / "assets" / "care-support-window.jpg").read_bytes()).decode()
    family_image = base64.b64encode((DIST / "assets" / "family-connection-dock.jpg").read_bytes()).decode()

    html = html.replace('<link rel="stylesheet" href="/styles.css">', f"<style>{css}</style>")
    html = html.replace('<script src="/client.js" defer></script>', "")
    html = html.replace(
        "/assets/hopeful-hearts-mark.png",
        f"data:image/png;base64,{logo}",
    )
    html = html.replace(
        "/assets/tusla-logo.png",
        f"data:image/png;base64,{partner}",
    )
    html = html.replace(
        "/assets/care-support-window.jpg",
        f"data:image/jpeg;base64,{care_image}",
    )
    html = html.replace(
        "/assets/family-connection-dock.jpg",
        f"data:image/jpeg;base64,{family_image}",
    )
    return html.replace("</body>", f"<script>{client}</script></body>")


def load(page: Page, path: Path) -> None:
    page.set_content(renderable_html(path), wait_until="networkidle")


def assert_no_overflow(page: Page, label: str) -> None:
    dimensions = page.evaluate(
        """() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth
        })"""
    )
    assert dimensions["scrollWidth"] <= dimensions["clientWidth"], (
        f"{label}: horizontal overflow "
        f"({dimensions['scrollWidth']} > {dimensions['clientWidth']})"
    )


def test_mobile_menu(page: Page) -> None:
    load(page, ROUTES["home"])
    toggle = page.locator("[data-menu-toggle]")
    toggle.click()
    assert toggle.get_attribute("aria-expanded") == "true"
    assert page.locator("main").evaluate("element => element.inert") is True
    page.keyboard.press("Escape")
    assert toggle.get_attribute("aria-expanded") == "false"
    assert page.locator("main").evaluate("element => element.inert") is False


def test_faq_and_form(page: Page) -> None:
    load(page, ROUTES["contact"])
    second_question = page.locator("[data-faq-button]").nth(1)
    second_question.click()
    assert second_question.get_attribute("aria-expanded") == "true"

    page.locator("button[type='submit']").click()
    assert page.locator("#first-name").get_attribute("aria-invalid") == "true"

    page.locator("#first-name").fill("Aoife")
    page.locator("#last-name").fill("Murphy")
    page.locator("#email").fill("aoife@example.com")
    page.locator("#message").fill("I would like to ask about family support services.")
    page.locator("button[type='submit']").click()
    page.wait_for_timeout(350)
    assert "cannot send" in page.locator("[data-form-status]").inner_text().lower()


def main() -> None:
    SCREENSHOTS.mkdir(parents=True, exist_ok=True)
    console_errors: list[str] = []

    with sync_playwright() as playwright:
        chrome = Path("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome")
        launch_options = {"headless": True}
        if chrome.exists():
            launch_options["executable_path"] = str(chrome)

        browser = playwright.chromium.launch(**launch_options)
        page = browser.new_page()
        page.on(
            "console",
            lambda message: console_errors.append(message.text)
            if message.type == "error"
            else None,
        )
        page.on("pageerror", lambda error: console_errors.append(str(error)))

        for viewport_name, viewport in VIEWPORTS.items():
            page.set_viewport_size(viewport)
            for route_name, route_path in ROUTES.items():
                load(page, route_path)
                assert_no_overflow(page, f"{route_name}-{viewport_name}")
                page.screenshot(
                    path=SCREENSHOTS / f"{route_name}-{viewport_name}.png",
                    full_page=True,
                )

        page.set_viewport_size(VIEWPORTS["390"])
        test_mobile_menu(page)
        test_faq_and_form(page)

        assert not console_errors, f"Browser console errors: {console_errors}"
        browser.close()

    print(f"Browser QA passed; screenshots saved to {SCREENSHOTS}")


if __name__ == "__main__":
    main()

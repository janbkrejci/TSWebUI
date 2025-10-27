from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Verify ts-form
    page.goto("http://localhost:3000/?path=/docs/tswebui-tsform--default", wait_until="networkidle")
    page.wait_for_selector("iframe")
    frame = page.frame_locator("iframe").first
    frame.locator("ts-form").wait_for(state="visible")
    page.screenshot(path="jules-scratch/verification/ts-form-docs-verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)

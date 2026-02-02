const { chromium, devices } = require('playwright');

async function testWebsite() {
    const browser = await chromium.launch();

    console.log('========================================');
    console.log('開始測試太空貓咖啡館網站');
    console.log('========================================\n');

    // Test 1: Desktop Version
    console.log('📱 測試 1: 桌面版測試');
    console.log('----------------------------------------');
    const desktopContext = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });
    const desktopPage = await desktopContext.newPage();

    try {
        await desktopPage.goto('http://localhost:8765/index.html', { waitUntil: 'networkidle' });
        console.log('✅ 首頁載入成功');

        // Check if images loaded
        const images = await desktopPage.$$('img');
        console.log(`✅ 找到 ${images.length} 個圖片元素`);

        // Check navigation
        const navLinks = await desktopPage.$$('.nav-links a');
        console.log(`✅ 找到 ${navLinks.length} 個導航連結`);

        // Test navigation to other pages
        await desktopPage.click('a[href="about.html"]');
        await desktopPage.waitForLoadState('networkidle');
        console.log('✅ 關於我們頁面載入成功');

        await desktopPage.click('a[href="menu.html"]');
        await desktopPage.waitForLoadState('networkidle');
        console.log('✅ 菜單頁面載入成功');

        await desktopPage.click('a[href="contact.html"]');
        await desktopPage.waitForLoadState('networkidle');
        console.log('✅ 聯絡資訊頁面載入成功');

        // Take desktop screenshot
        await desktopPage.goto('http://localhost:8765/index.html');
        await desktopPage.screenshot({ path: 'screenshot-desktop.png', fullPage: true });
        console.log('✅ 桌面版截圖已儲存: screenshot-desktop.png');

    } catch (error) {
        console.log('❌ 桌面版測試失敗:', error.message);
    }

    await desktopContext.close();
    console.log('\n桌面版測試完成！\n');

    // Test 2: Mobile Version (iPhone 13)
    console.log('📱 測試 2: 手機版測試 (iPhone 13)');
    console.log('----------------------------------------');
    const iPhone13 = devices['iPhone 13'];
    const mobileContext = await browser.newContext({
        ...iPhone13
    });
    const mobilePage = await mobileContext.newPage();

    try {
        await mobilePage.goto('http://localhost:8765/index.html', { waitUntil: 'networkidle' });
        console.log('✅ 首頁載入成功（手機版）');

        // Check mobile menu toggle
        const mobileMenuToggle = await mobilePage.$('.mobile-menu-toggle');
        if (mobileMenuToggle) {
            console.log('✅ 找到手機版選單按鈕');

            // Test mobile menu
            await mobilePage.click('.mobile-menu-toggle');
            await mobilePage.waitForTimeout(500); // Wait for animation
            const navLinksVisible = await mobilePage.$('.nav-links.active');
            if (navLinksVisible) {
                console.log('✅ 手機版選單可以正常開啟');
            } else {
                console.log('⚠️  手機版選單可能無法正常開啟');
            }
        }

        // Check if content is responsive
        const heroTitle = await mobilePage.$('.hero-title');
        if (heroTitle) {
            const fontSize = await heroTitle.evaluate(el => window.getComputedStyle(el).fontSize);
            console.log(`✅ 標題字體大小: ${fontSize}`);
        }

        // Test navigation on mobile
        await mobilePage.click('.mobile-menu-toggle');
        await mobilePage.waitForTimeout(300);
        await mobilePage.click('a[href="about.html"]');
        await mobilePage.waitForLoadState('networkidle');
        console.log('✅ 關於我們頁面載入成功（手機版）');

        await mobilePage.goto('http://localhost:8765/menu.html');
        await mobilePage.waitForLoadState('networkidle');
        console.log('✅ 菜單頁面載入成功（手機版）');

        await mobilePage.goto('http://localhost:8765/contact.html');
        await mobilePage.waitForLoadState('networkidle');
        console.log('✅ 聯絡資訊頁面載入成功（手機版）');

        // Test contact form on mobile
        const contactForm = await mobilePage.$('#contactForm');
        if (contactForm) {
            console.log('✅ 聯絡表單存在（手機版）');
        }

        // Take mobile screenshot
        await mobilePage.goto('http://localhost:8765/index.html');
        await mobilePage.screenshot({ path: 'screenshot-mobile.png', fullPage: true });
        console.log('✅ 手機版截圖已儲存: screenshot-mobile.png');

    } catch (error) {
        console.log('❌ 手機版測試失敗:', error.message);
    }

    await mobileContext.close();
    console.log('\n手機版測試完成！\n');

    // Test 3: Tablet Version (iPad)
    console.log('📱 測試 3: 平板版測試 (iPad)');
    console.log('----------------------------------------');
    const iPad = devices['iPad Pro'];
    const tabletContext = await browser.newContext({
        ...iPad
    });
    const tabletPage = await tabletContext.newPage();

    try {
        await tabletPage.goto('http://localhost:8765/index.html', { waitUntil: 'networkidle' });
        console.log('✅ 首頁載入成功（平板版）');

        // Take tablet screenshot
        await tabletPage.screenshot({ path: 'screenshot-tablet.png', fullPage: true });
        console.log('✅ 平板版截圖已儲存: screenshot-tablet.png');

    } catch (error) {
        console.log('❌ 平板版測試失敗:', error.message);
    }

    await tabletContext.close();
    console.log('\n平板版測試完成！\n');

    await browser.close();

    console.log('========================================');
    console.log('✅ 所有測試完成！');
    console.log('========================================');
    console.log('\n測試總結:');
    console.log('- 桌面版: 測試完成');
    console.log('- 手機版: 測試完成');
    console.log('- 平板版: 測試完成');
    console.log('\n截圖檔案:');
    console.log('- screenshot-desktop.png');
    console.log('- screenshot-mobile.png');
    console.log('- screenshot-tablet.png');
}

testWebsite().catch(error => {
    console.error('測試過程中發生錯誤:', error);
    process.exit(1);
});
